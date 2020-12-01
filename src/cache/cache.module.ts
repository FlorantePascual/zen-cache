import { Module } from '@nestjs/common';

import { DataService } from 'src/core/data.service';
import { CacheController } from './cache.controller';
import { CacheService } from './cache.service';

@Module({
  controllers: [
    CacheController
  ],
  providers: [
    CacheService,
    DataService,
  ]
})

export class CacheModule {};