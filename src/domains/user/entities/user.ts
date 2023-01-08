import { Chat } from "@/domains/chat";
import { Message } from "@/domains/message";
import { BaseEntity } from "@/shared/domain/entities";

export class User extends BaseEntity {
  name: string;
  email: string;
  password: string;
  profilePhoto?: string;
  messages?: Message[];
  chats?: Chat[];

  constructor(props: User) {
    super({ ...props });
    Object.assign(this, props);
    this.messages = props.messages ?? [];
    this.chats = props.chats ?? [];
    Object.freeze(this);
  }
}
