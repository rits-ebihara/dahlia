import deepEqual from "fast-deep-equal";
import { z, ZodType } from "zod";

export interface ValueObject<T> {
  equals(value: ValueObject<T>): boolean;
  newValue(value: T): ValueObject<T>;
  get value(): T
}

export class ValueObjectImpl<T> implements ValueObject<T> {
  protected _value: T;

  constructor(protected schema: ZodType<T>, value: T) {
    const v = schema.parse(value);
    this._value = v;
  }

  public equals(vo: ValueObject<T>): boolean {
    if (typeof this._value === "object") {
      return deepEqual(this.value, vo.value);
    } else {
      return this.value === vo.value;
    }
  }

  public newValue(value: T): ValueObject<T> {
    return new ValueObjectImpl(this.schema, value);
  }

  public get value() {
    if (typeof this._value === "object") {
      return { ...this._value };
    } else {
      return this._value;
    }
  }
}
