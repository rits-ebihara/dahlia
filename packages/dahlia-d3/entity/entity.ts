export type EntityGenerics = Record<string, unknown>;
export interface Entity {
  validate(): boolean | Promise<boolean>;
  // cast: { [key in keyof T]: (value: T) => void };
}

export abstract class EntityBase<T extends EntityGenerics> implements Entity {
  public abstract validate(): boolean | Promise<boolean>;
}
