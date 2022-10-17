import { z } from "zod";
import { ValueObjectImpl } from "./valueObject";

test("create string value object", () => {
  const vo = new ValueObjectImpl(z.string(), "test");
  expect(vo.value).toBe("test");
  const vo1 = new ValueObjectImpl(z.string(), "test");
  expect(vo.equals(vo1)).toBe(true);
  const vo2 = new ValueObjectImpl(z.string(), "test1");
  expect(vo.equals(vo2)).toBe(false);
});

test("create object value object", () => {
  const value = { name: "test", age: 10 };
  const vo = new ValueObjectImpl(
    z.object({ name: z.string(), age: z.number() }),
    value
  );
  expect(vo.value).toEqual(value);
  expect(vo.value).not.toBe(value);

  const vo2 = vo.newValue(value);
  expect(vo2).not.toBe(vo);
  expect(vo2.equals(vo)).toBe(true);
});

// test("custom vo", () => {
//   const Vo = createVOClass(z.string().min(1).max(10));
//   const vo = new Vo("test");
//   expect(vo.value).toBe("test");
//   expect(() => new Vo("")).toThrow();

//   expect(Vo.validate("test").success).toBe(true);
//   expect(Vo.validate("").success).toBe(false);
// });
