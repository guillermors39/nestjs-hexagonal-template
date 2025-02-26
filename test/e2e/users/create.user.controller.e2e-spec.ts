import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe, HttpStatus } from '@nestjs/common';
import { IDatabaseConnection } from '@shared/infrastructure/interfaces/services.interface';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { CreateUserController } from 'src/users/infrastructure/controllers';
import { App } from 'supertest/types';
import { connection } from 'test/jest.setup';
import { CreateUserDtoBuilder } from 'test/mocks/dtos/create.user.builder';
import { EUserStatus } from 'src/users/domain/contracts/user.enum';
import { DbCollection } from '@shared/infrastructure/configs/database';
import { bootstrapFilterAndPipeline } from '@shared/infrastructure/services/bootstrap.service';

describe(CreateUserController.name, () => {
  let app: INestApplication<App>;

  afterAll(async () => {
    await app.close();
  });

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(IDatabaseConnection)
      .useValue(connection)
      .compile();

    app = moduleFixture.createNestApplication();

    bootstrapFilterAndPipeline(app);

    await app.init();
  });

  describe('Success', () => {
    it('Created', async () => {
      const dto = CreateUserDtoBuilder.random();

      const response = await request(app.getHttpServer())
        .post(`/users`)
        .send(dto)
        .expect(HttpStatus.OK);

      const data = response.body?.data;

      expect(data).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          name: dto.name,
          phone: dto.phone,
          email: dto.email,
          status: EUserStatus.ACTIVE,
        }),
      );
    });

    it('Created - Without phone', async () => {
      const dto = CreateUserDtoBuilder.withoutPhone();

      const response = await request(app.getHttpServer())
        .post(`/users`)
        .send(dto)
        .expect(HttpStatus.OK);

      const data = response.body?.data;

      expect(data.phone).toBe(undefined);

      expect(data).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          name: dto.name,
          email: dto.email,
          status: EUserStatus.ACTIVE,
        }),
      );
    });
  });

  describe('Bad request', () => {
    it('should throw validation error', async () => {
      const dto = CreateUserDtoBuilder.withoutPhone();

      await request(app.getHttpServer())
        .post(`/users`)
        .send({
          ...dto,
          email: undefined,
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should throw email already exists', async () => {
      const dto = CreateUserDtoBuilder.withoutPhone();

      await connection
        .backmuchosol()
        .collection(DbCollection.users)
        .insertOne(dto);

      const newDto = CreateUserDtoBuilder.random({ email: dto.email });

      await request(app.getHttpServer())
        .post(`/users`)
        .send(newDto)
        .expect(HttpStatus.UNPROCESSABLE_ENTITY);
    });
  });
});
