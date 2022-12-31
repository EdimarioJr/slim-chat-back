import { Message } from "@/domains/message";
import { User } from "@/domains/user";
import { BaseEntity } from "@/shared/domain/entities";

export class Chat extends BaseEntity {
  name: string;
  description?: string;
  image?: string;
  members: User[];
  messages?: Message[];
  createdBy?: User;

  constructor(props: Chat) {
    super({ ...props });
    Object.assign(this, props);
    this.members = props.members ?? [];
    this.messages = props.messages ?? [];
    Object.freeze(this);
  }
}
