import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DbService } from './services/db.service';
import { TransactionService } from './services/transaction.service';

@Module({
  imports: [],
  controllers: [
    AppController
  ],
  providers: [
      DbService,
      TransactionService
  ],
})
export class AppModule {}
