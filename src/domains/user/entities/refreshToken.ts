import { BaseEntity } from "@/shared/domain";
import { User } from "..";

export class RefreshToken extends BaseEntity {
  hashedToken: string;
  user: User;
  revoked: boolean;

  constructor(props: RefreshToken) {
    super({ ...props });
    Object.assign(this, props);
    this.revoked = props.revoked ?? false;
    Object.freeze(this);
  }
}
