import { Controller, Get, Post, Res, HttpCode, Body, HttpStatus, HttpException, Query } from '@nestjs/common';
import { createHash } from 'crypto';
import { Response } from 'express';
import { XmlService } from './services/xml.service';
import { ConfirmationService } from './services/confirmation.service';
import { TransactionService } from './services/transaction.service';
import { TransactionInterface } from "./interfaces/transaction.interface";

// adres testowej bramki płatniczej
const testPaywallUrl = 'https://pay-accept.bm.pl/payment';

// identyfikator klienta nadany przez Blue Media S.A.
const serviceID = '000000';

// klucz współdzielony nadany przez Blue Media S.A.
const secretKey = 'partner_secret_key';

// separator nadany przez Blue Media S.A.
const separator = 'separator';

@Controller('api')
export class AppController {
  constructor(
      private transactionService: TransactionService
  ) { }

  private static calculateHash(...args: any[]): string {
    const paymentData = [serviceID, ...args, secretKey].join(separator);
    return createHash('sha256').update(paymentData).digest('hex');
  }

  @Post('buy')
  @HttpCode(200)
  buy(@Body() body): any {
    AppController.checkFields(body);
    const transaction = this.getTransaction(body);
    const hash = AppController.calculateHash(transaction.orderId, transaction.amount, transaction.email);
    const redirectUrl = testPaywallUrl + '?ServiceID=' + serviceID + '&OrderID=' + transaction.orderId + '&Amount=' + transaction.amount + '&CustomerEmail=' + transaction.email + '&Hash=' + hash;
    this.transactionService.updateTransactionToPending(transaction.orderId);
    return {
      data: { redirectUrl: redirectUrl },
      errors: null
    }
  }

  @Post('status')
  @HttpCode(200)
  status(@Body() body): any {
    const transaction = this.transactionService.getTransaction(body.orderId || '');
    return {
      data: { transaction: transaction },
      errors: null
    }
  }

  @Post('itn')
  @HttpCode(200)
  getItnStatus(@Body() body: any, @Res() res: Response) {
    const confirmation = ConfirmationService.getConfirmationFromBody(body);
    const orderId = ConfirmationService.getValueFromConfirmation('orderID', confirmation);
    const paymentStatus = ConfirmationService.getValueFromConfirmation('paymentStatus', confirmation);
    const hashValid = AppController.checkConfirmationHash(confirmation);
    if (hashValid) {
      if (paymentStatus === 'SUCCESS') {
        this.transactionService.updateTransactionToSuccess(orderId);
      }
      if (paymentStatus === 'FAILURE') {
        this.transactionService.updateTransactionToFailure(orderId);
      }
    }
    const confirmedStatus = hashValid ? 'CONFIRMED' : 'NOTCONFIRMED';
    const resObject = {
      _declaration: {
        _attributes: {
          version: '1.0',
          encoding: 'UTF-8'
        }
      },
      confirmationList: {
        serviceID: serviceID,
        transactionsConfirmations: {
          transactionConfirmed: {
            orderID: orderId,
            confirmation: confirmedStatus
          }
        },
        hash: AppController.calculateHash(orderId, confirmedStatus)
      }
    };
    res.set('Content-Type', 'text/xml').send(XmlService.convertToXml(resObject));
  }

  private createTransaction(body) {
    const amount = body.amount.toFixed(2);
    const email = body.email;
    const transaction = this.transactionService.startTransaction(amount, email);
    return transaction;
  }

  public getTransaction(body): TransactionInterface {
    const transaction = body.orderId ? this.transactionService.getTransaction(body.orderId) : this.createTransaction(body);
    if (!transaction) {
      throw new HttpException({
        data: null,
        message: 'NO TRANSACTION FOUND',
        errors: null
      }, HttpStatus.BAD_REQUEST);
    }
    return transaction;
  }

  private static checkFields(fields) {
    const errors: any = {};
    if (!fields.hasOwnProperty('email')) {
      errors.email = ['Pole wymagane'];
    } else {
      if (!/@/.test(fields.email)) {
        errors.email = ['Pole nieprawidłowe'];
      }
    }
    if (!fields.hasOwnProperty('amount')) {
      errors.amount = ['Pole wymagane'];
    } else {
      if (typeof fields.amount !== 'number' || fields.amount < 0.01) {
        errors.amount = ['Pole nieprawidłowe'];
      }
    }
    if (Object.keys(errors).length) {
      throw new HttpException({
        data: null,
        errors: errors
      }, HttpStatus.BAD_REQUEST);
    }
  }

  static checkConfirmationHash(confirmation): boolean {
    const params = [];
    const orderId = ConfirmationService.getValueFromConfirmation('orderID', confirmation);
    params.push(orderId);
    const remoteID = ConfirmationService.getValueFromConfirmation('remoteID', confirmation);
    params.push(remoteID);
    const amount = ConfirmationService.getValueFromConfirmation('amount', confirmation);
    params.push(amount);
    const currency = ConfirmationService.getValueFromConfirmation('currency', confirmation);
    params.push(currency);
    const gatewayID = ConfirmationService.getValueFromConfirmation('gatewayID', confirmation);
    if (gatewayID) { params.push(gatewayID) }
    const paymentDate = ConfirmationService.getValueFromConfirmation('paymentDate', confirmation);
    params.push(paymentDate);
    const paymentStatus = ConfirmationService.getValueFromConfirmation('paymentStatus', confirmation);
    params.push(paymentStatus);
    const paymentStatusDetails = ConfirmationService.getValueFromConfirmation('paymentStatusDetails', confirmation);
    if (paymentStatusDetails) { params.push(paymentStatusDetails) }
    const fName = ConfirmationService.getValueFromConfirmation('fName', confirmation, 'customerData');
    if (fName) { params.push(fName) }
    const lName = ConfirmationService.getValueFromConfirmation('lName', confirmation, 'customerData');
    if (lName) { params.push(lName) }
    const streetName = ConfirmationService.getValueFromConfirmation('streetName', confirmation, 'customerData');
    if (streetName) { params.push(streetName) }
    const streetHouseNo = ConfirmationService.getValueFromConfirmation('streetHouseNo', confirmation, 'customerData');
    if (streetHouseNo) { params.push(streetHouseNo) }
    const streetStaircaseNo = ConfirmationService.getValueFromConfirmation('streetStaircaseNo', confirmation, 'customerData');
    if (streetStaircaseNo) { params.push(streetStaircaseNo) }
    const streetPremiseNo = ConfirmationService.getValueFromConfirmation('streetPremiseNo', confirmation, 'customerData');
    if (streetPremiseNo) { params.push(streetPremiseNo) }
    const postalCode = ConfirmationService.getValueFromConfirmation('postalCode', confirmation, 'customerData');
    if (postalCode) { params.push(postalCode) }
    const city = ConfirmationService.getValueFromConfirmation('city', confirmation, 'customerData');
    if (city) { params.push(city) }
    const nrb = ConfirmationService.getValueFromConfirmation('nrb', confirmation, 'customerData');
    if (nrb) { params.push(nrb) }
    const hashToCheck = AppController.calculateHash(...params);
    return hashToCheck === confirmation.transactionList.hash._text;
  }
}
