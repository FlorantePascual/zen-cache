import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException } from '@nestjs/common';
import { CacheService } from './cache.service';

@Controller('api')
export class CacheController {
  constructor(private readonly myService: CacheService) {}

  @Get()
  getError() {
    return new HttpException("Key was not specified", 500);
  }

  @Get(':key')
  async getRecord(
    @Param('key') key: string
    ) {
    return await this.myService.getDocument(key);
  }

  @Post()
  async createOrUpdate(
    @Body('key') key: string,
    @Body('payload') payload: any, 
    ) {
    if (key+'' !== '0' && !key) return new HttpException("Key was not specified", 500);
    return await this.myService.setDocument(key, payload);
  }

  @Delete(':key')
  async delete(
    @Param('key') key: string
    ) {
      if (!key) return new HttpException("Key Not Found", 500);
      return await this.myService.deleteDocument(key);
  }

}