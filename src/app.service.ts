import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getMessage(): string {
    return 'This is the root endpoint, nothing here. Use /api instead.';
  }
}
