import { UserEntity } from 'src/users/domain/entities/user.entity';
import { UserMapper } from 'src/users/infrastructure/services/user.mapper';
import { UserDocumentMother } from 'test/mocks/user.document.mother';

describe(UserMapper.name, () => {
  const mapper = new UserMapper();

  it('should return user entity', () => {
    const document = UserDocumentMother.random();

    const result = mapper.map(document);

    expect(result).toBeInstanceOf(UserEntity);

    expect(result).toEqual(
      expect.objectContaining({
        id: document._id.toString(),
        name: document.name,
        email: document.email,
        phone: document.phone,
      }),
    );
  });

  it('should return users entities', () => {
    const documents = [
      UserDocumentMother.random(),
      UserDocumentMother.random(),
    ];

    const result = mapper.map(documents);

    expect(Array.isArray(result)).toBe(true);

    result.forEach((entity) => {
      expect(entity).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          email: expect.any(String),
        }),
      );
    });
  });
});
