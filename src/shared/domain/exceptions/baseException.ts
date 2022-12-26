type Exception = {
  name: string;
  message: string;
};

export class BaseException extends Error {
  name: string;
  message: string;
  constructor({ name, message }: Exception) {
    super(message);
    this.name = name;
    this.message = message;
  }
}
