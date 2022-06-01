import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as qs from 'qs';
import * as xmlService from 'xml-js';

const OrderStatusMap = new Map([
  [1, 'WaitingForPayment'],
  [2, 'UnderAnalysis'],
  [3, 'Paid'],
  [4, 'Available'],
  [5, 'InDispute'],
  [6, 'Returned'],
  [7, 'Canceled'],
  [8, 'Debited'],
  [9, 'TemporaryRetention'],
]);

@Injectable()
export class PagSeguroService {
  async generateCheckoutURL(order) {
    const code = await this.generateCheckoutCode(order);
    return `${process.env.PAGSEGURO_URL}/v2/checkout/payment.html?code=${code}`;
  }

  async fetchTransactionInfo(notificationCode: string) {
    const url = `${process.env.PAGSEGURO_WS_URL}/v3/transactions/notifications/${notificationCode}?email=${process.env.PAGSEGURO_EMAIL}&token=${process.env.PAGSEGURO_TOKEN}`;

    const response = await axios.get(url);

    const jsonData = JSON.parse(
      xmlService.xml2json(response.data, { compact: true }),
    );

    return {
      orderId: jsonData.transaction.reference._text,
      status: OrderStatusMap.get(jsonData.transaction.status._text),
    };
  }

  private async generateCheckoutCode(order) {
    const payload = {
      email: process.env.PAGSEGURO_EMAIL,
      token: process.env.PAGSEGURO_TOKEN,
      currency: 'BRL',
      reference: order.id,
      shippingCost: (order.shipping_price / 100).toFixed(2),
      notificationURL: process.env.PAGSEGURO_NOTIFICATION_URL,
    };

    let aux = 1;
    for (const product of order.products) {
      payload[`itemId${aux}`] = product.product_id;
      payload[`itemDescription${aux}`] = product.product.name;
      payload[`itemAmount${aux}`] = (product.product.price / 100).toFixed(2);
      payload[`itemQuantity${aux}`] = product.quantity;

      aux++;
    }

    const url = `${process.env.PAGSEGURO_WS_URL}/v2/checkout?=email={process.env.PAGSEGURO_EMAIL}&token=${process.env.PAGSEGURO_TOKEN}`;

    const response = await axios.post(url, qs.stringify(payload), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=ISO-8859-1',
        Accept: 'application/xml; charset=ISO-8859-1',
      },
    });

    const data = JSON.parse(
      xmlService.xml2json(response.data, { compact: true }),
    );

    return data.checkout.code._text;
  }
}
