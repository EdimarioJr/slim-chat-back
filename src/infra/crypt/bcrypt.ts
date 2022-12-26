import { CryptException } from "@/shared/domain/exceptions";
import { ICrypt } from "@/shared/domain/protocols/crypt";
import bcrypt from "bcrypt";

export class BCrypt implements ICrypt {
  constructor() {}

  encrypt(text: string): string {
    try {
      const encryptedText = bcrypt.hashSync(text, 10);
      return encryptedText;
    } catch (err) {
      throw new CryptException("Error encrypting data");
    }
  }

  compare(text: string, hash: string): boolean {
    try {
      return bcrypt.compareSync(text, hash);
    } catch (err) {
      throw new CryptException("Error comparing crypted data");
    }
  }
}
