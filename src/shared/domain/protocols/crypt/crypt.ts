export interface ICrypt {
  encrypt: (text: string) => string;
  compare: (text: string, hash: string) => boolean;
}
