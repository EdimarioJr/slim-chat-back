import { BaseEntity } from "@/shared/domain/entities";

export class User extends BaseEntity {
  id?: number;
  name: string;
  email: string;
  password: string;
  profilePhoto?: string;

  constructor(props: User) {
    super({});
    Object.assign(this, props);
    Object.freeze(this);
  }
}
