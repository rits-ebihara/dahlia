export interface Entity<T extends Record<string, unknown>> {
  validate(): boolean | Promise<boolean>;
  // cast: { [key in keyof T]: (value: T) => void };
}

export abstract class EntityBase<T extends Record<string, unknown>>
  implements Entity<T>
{
  public abstract validate(): boolean | Promise<boolean>;
}
