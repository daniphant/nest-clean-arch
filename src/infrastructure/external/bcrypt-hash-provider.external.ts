import { Injectable } from '@nestjs/common';
import { IHashProvider } from 'domain/contracts/hash-provider.contract';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptHashProvider implements IHashProvider {
  private hashTool: typeof bcrypt;

  constructor() {
    this.hashTool = bcrypt;
  }

  generateHash(payload: string): Promise<string> {
    return this.hashTool.hash(payload, 10);
  }
  generateHashSync(payload: string): string {
    return this.hashTool.hashSync(payload, 10);
  }
  compareHash(payload: string, hashed: string): Promise<boolean> {
    return this.hashTool.compare(payload, hashed);
  }
  compareHashSync(payload: string, hashed: string): boolean {
    return payload === hashed;
  }
}
