import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
import { DataService } from '../core/data.service';

@Injectable()
export class CacheService {

  constructor(private ds: DataService) {
    ds.initializeDocumentCache();
    this.scheduleCleanCache();
  }

  async getDocument(key: string): Promise<any> {
    try {
      const result = await this.ds.getDocument(key);
      if (result===undefined) {
        throw new NotFoundException("HTTP Exception during get document (Not Found)"); 
      }
      return result;  
    } catch (error) {
      throw new NotFoundException("HTTP Exception during get document (Not Found)"); 
    }
    
  }

  async setDocument(key: string, payload: any): Promise<any> {
    try {
      const result = await this.ds.createOrUpdateDocument(key, payload);
      return result;
    } catch (error) {
      throw new HttpException("HTTP Exception during set document", 500); 
    }
  }

  async deleteDocument(key: string): Promise<any> {
    try {
      const result = await this.ds.deleteDocument(key);
      return result;
    } catch (error) {
      throw new HttpException("HTTP Exception during delete document", 500); 
    }
  }

  scheduleCleanCache() {
    const cleanInterval = 3600*1000;
    setInterval(()=>{
      this.ds.cleanCache();
      console.log("Cache cleaned!")
    }, cleanInterval)
  }

}
