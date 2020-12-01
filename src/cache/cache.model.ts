export interface ICacheConfig {
  capacity: number;
  cacheLength: number;
  ttl: number;
}

export interface ICacheDocument {
  value: any;
  expiry: number;
  lastAccessed: number;
  setNewTimestamp(): void;
  getValue(): any;
  setValue(value: any): void;
  isExpired(): boolean;
  resetExpiry(newExpiry: number): void;
}

export class CacheDocument implements ICacheDocument {

  lastAccessed: number;

  constructor(public value: any, public expiry: number) {
    this.value = value;
    this.expiry = expiry;
    this.setNewTimestamp();
  }
  setNewTimestamp() {
    this.lastAccessed = new Date().getTime();
  }
  getValue() {
    return this.value;
  }
  setValue(value) {
    this.value = value;
  }
  isExpired() {
    return this.expiry < new Date().getTime();
  }
  resetExpiry(newExpiry: number) {
    this.expiry = newExpiry;
  }
}