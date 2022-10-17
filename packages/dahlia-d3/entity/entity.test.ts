import { z } from "zod";
import { ValueObjectImpl } from "../valueObject/valueObject";
import { EntityBase } from "./entity";

test("create entity", () => {
  const userSchema = z.object({
    familyName: z
      .string()
      .min(1)
      .max(10)
      .regex(/^[A-Z]+$/),
    givenName: z
      .string()
      .min(1)
      .max(10)
      .regex(/^[a-z]+$/),
  });
  type UserName = z.infer<typeof userSchema>;

  class UserNameVO extends ValueObjectImpl<UserName> {
    constructor(value: z.infer<typeof userSchema>) {
      super(userSchema, value);
    }
  }

  type User = {
    userName: UserName;
  };

  class UserEntity extends EntityBase<User> {
    public userName: UserNameVO;
    constructor(value: User) {
      super();
      this.userName = new UserNameVO(value.userName);
    }
    public validate(): boolean {
      return true;
    }
  }

  const sourceUser: User = {
    userName: { familyName: "EBIHARA", givenName: "kenji" },
  };

  const userEntity = new UserEntity(sourceUser);

  expect(userEntity.userName).toEqual(new UserNameVO(sourceUser.userName));
});
