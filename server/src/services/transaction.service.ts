import { Injectable } from '@nestjs/common';
import { TransactionInterface } from '../interfaces/transaction.interface';
import { DbService } from './db.service';

const transactionStatuses = {
  new: 'NEW',
  pending: 'PENDING',
  success: 'SUCCESS',
  failure: 'FAILURE'
};

@Injectable()
export class TransactionService {
  constructor(
      private dbService: DbService
  ) {
    this.dbService.setRepository('transactions');
  }

  static createTransaction(): TransactionInterface {
    return {
      status: transactionStatuses.new,
      orderId: +new Date(),
      amount: null,
      email: null,
      createdAt: new Date().toLocaleString('pl-PL'),
      updatedAt: null
    };
  }

  startTransaction(amount: number, email: string): any {
    const transaction: TransactionInterface = TransactionService.createTransaction();
    transaction.amount = amount;
    transaction.email = email;
    this.dbService.save(transaction);
    return transaction;
  }

  getTransaction(orderId): any {
    return this.dbService.findOne({ orderId: orderId });
  }

  updateTransactionToPending(orderId): void {
    const transaction: any = this.getTransaction(orderId);
    this.updateTransaction(transaction, transactionStatuses.pending);
  }

  updateTransactionToSuccess(orderId): void {
    const transaction: any = this.getTransaction(orderId);
    this.updateTransaction(transaction, transactionStatuses.success);
  }

  updateTransactionToFailure(orderId): void {
    const transaction: any = this.getTransaction(orderId);
    this.updateTransaction(transaction, transactionStatuses.failure);
  }

  private updateTransaction(transaction: TransactionInterface, status): any {
    if (transaction) {
      transaction.status = status;
      transaction.updatedAt = new Date().toLocaleString('pl-PL');
      this.dbService.save(transaction);
    }
  }
}
