import {HttpException, HttpStatus} from '@nestjs/common';
import {XmlService} from './xml.service';

export class ConfirmationService {
  static getConfirmationFromBody(body): any {
    if (!body.transactions) {
      throw new HttpException({
        data: null,
        errors: 'EMPTY TRANSACTIONS'
      }, HttpStatus.BAD_REQUEST);
    }
    const fixedTransactions = ConfirmationService.fixTransactions(body.transactions)
    const xmlConfirmation = Buffer.from(fixedTransactions, 'base64').toString('utf8');
    const objConfirmation = XmlService.convertToObject(xmlConfirmation);

    if (!objConfirmation || !objConfirmation.transactionList || !objConfirmation.transactionList.transactions || !objConfirmation.transactionList.transactions.transaction) {
      throw new HttpException({
        data: null,
        errors: 'INVALID DATA'
      }, HttpStatus.BAD_REQUEST);
    }

    return objConfirmation;
  }

  static getValueFromConfirmation(key, confirmation, group?): string {
    let transaction = confirmation.transactionList.transactions.transaction;
    if (group) {
      if (transaction[group]) {
        transaction = transaction[group];
      } else {
        return null;
      }
    }
    return transaction[key] && transaction[key]._text ? transaction[key]._text : null;
  }

  // fix for removing + char by bodyParser
  private static fixTransactions(transactions): any {
    return transactions.replace(/\s/g, '+');
  }
}
