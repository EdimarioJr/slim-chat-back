import { Chat } from "@/domains/chat/entities";
import { BaseEntity } from "@/shared/domain/entities";
import { User } from "@prisma/client";

export class Message extends BaseEntity {
  message: string;
  chat: Chat;
  createdBy?: User;

  constructor(props: Message) {
    super({ ...props });
    Object.assign(this, props);
    Object.freeze(this);
  }
}
