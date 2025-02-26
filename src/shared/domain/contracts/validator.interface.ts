/* eslint-disable @typescript-eslint/no-explicit-any */
export type TErrors =
  | string
  | string[]
  | { [key: string]: string | string[] | TErrors };

export type TValidationEither = {
  success: boolean;
  errors: TErrors;
};

export interface IValidation<Entity = unknown, Context = Record<string, any>> {
  key(): string;

  validate(entity: Entity, context?: Context): TValidationEither;
}

export interface IValidationService<
  Entity = unknown,
  Context = Record<string, any>,
> {
  validate(entity: Entity, context?: Context): Promise<void>;
}
