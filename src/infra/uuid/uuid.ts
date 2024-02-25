import { IUUID } from "@/shared/domain/protocols/uuid";
import { v4 } from "uuid";

export class UUIDV4 implements IUUID {
  constructor() {}

  generate() {
    return v4();
  }
}
