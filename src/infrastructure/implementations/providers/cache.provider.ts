import { Injectable } from '@nestjs/common/decorators';
import { ICacheProvider } from 'domain/interfaces/providers/cache-provider.interface';

Injectable();
export class CacheProvider implements ICacheProvider {
  private readonly _cache: Map<string, any>;

  constructor() {
    this._cache = new Map<string, any>();
  }

  async set(key: string, value: any): Promise<void> {
    this._cache.set(key, value);
    return Promise.resolve();
  }

  async get<T>(key: string): Promise<T | undefined> {
    const value = this._cache.get(key) as T | undefined;
    return Promise.resolve(value);
  }

  async delete(key: string): Promise<any> {
    return Promise.resolve(this._cache.delete(key));
  }
}
