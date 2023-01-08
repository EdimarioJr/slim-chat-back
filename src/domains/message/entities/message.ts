import { Chat } from "@/domains/chat";
import { User } from "@/domains/user";
import { BaseEntity } from "@/shared/domain/entities";

export class Message extends BaseEntity {
  message: string;
  chatId: string;
  createdBy?: User;

  constructor(props: Message) {
    super({ ...props });
    Object.assign(this, props);
    Object.freeze(this);
  }
}
