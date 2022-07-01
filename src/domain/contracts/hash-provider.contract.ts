export interface IHashProvider {
  generateHash(payload: string): Promise<string>;
  generateHashSync(payload: string): string;
  compareHash(payload: string, hashed: string): Promise<boolean>;
  compareHashSync(payload: string, hashed: string): boolean;
}
