import { CacheDocument, ICacheDocument } from './../cache/cache.model';
import { Injectable } from '@nestjs/common';
import { ICacheConfig } from 'src/cache/cache.model';

let zenCache:{[key: string]: ICacheDocument}

let cacheConfig: ICacheConfig;

@Injectable()
export class DataService {

  initializeDocumentCache(capacity:number = 5, ttl: number = 3600*1000) {
    zenCache = {};
    cacheConfig = {
      cacheLength: 0,
      capacity,
      ttl,
    };
  }

  async createOrUpdateDocument(key: string, value: any): Promise<any> {
    if (!zenCache.hasOwnProperty(key)) {
      cacheConfig.cacheLength++;
    }
    this.evictLeastCachedItem();
    zenCache[key] = new CacheDocument(value, this.serverTimeStamp() + cacheConfig.ttl);
    zenCache[key].setNewTimestamp();
    console.log({zenCache});
    return await this.dbCreateOrUpdate(key, value);
  }

  evictLeastCachedItem(): void {
    if (cacheConfig.capacity < cacheConfig.cacheLength) {
      let leastItem: ICacheDocument;
      let leastItemKey: string;
      Object.keys(zenCache).map(key=>{
        if (!leastItem || leastItem.lastAccessed > zenCache[key].lastAccessed) {
          leastItem = zenCache[key];
          leastItemKey = key;
        }
      })
      console.log({evicted: leastItemKey});
      delete zenCache[leastItemKey];
    }
  }

  async deleteDocument(key: string): Promise<any> {
    if (zenCache.hasOwnProperty(key)) {
      delete zenCache[key];
      cacheConfig.cacheLength--;
    }
    console.log({afterDelete: zenCache});
    return await this.dbDelete(key);
  }

  async getDocument(key: string): Promise<any> {
    if (zenCache.hasOwnProperty(key)) {
      if (zenCache[key].isExpired()) {
        zenCache[key].resetExpiry(this.serverTimeStamp() + cacheConfig.ttl);
        zenCache[key].setNewTimestamp();
        return await this.dbGet(key);
      } else {
        zenCache[key].setNewTimestamp();
        return await zenCache[key].getValue();
      }

    } else {
      // fetch from database
      return await this.dbGet(key);
    }

  }

  cleanCache(): number {
    const keys = [... Object.keys(zenCache) ];
    for (let key of keys) {
      if (zenCache[key].isExpired()) {
        delete zenCache[key];
        cacheConfig.cacheLength--;
      }
    }
    return cacheConfig.cacheLength;
  }
 
  serverTimeStamp(): number {
      return (new Date()).getTime();
  }

  // provision for persistent database service
  private async dbGet(key: string): Promise<any> {
    // db logic goes here
    return await zenCache[key] || undefined;
  }

  private async dbCreateOrUpdate(key: string, value: any): Promise<any> {
    // db logic goes here
    return await true;
  }

  private async dbDelete(key: string): Promise<any> {
    // db logic goes here
    return await true;
  }

}