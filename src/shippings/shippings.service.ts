import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { FindShippingDTO } from 'src/shippings/dto/find-shipping.dto';
//import * as frete from 'frete';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const frete = require('frete');

type ShippingParams = {
  totalWeight: number;
  width: number;
  height: number;
  length: number;
  totalPrice: number;
};

@Injectable()
export class ShippingsService {
  constructor(private readonly productsService: ProductsService) {}

  async findAll(query: FindShippingDTO) {
    const zipCode = query.zipcode;
    const products = JSON.parse(query.products);
    const shippingParams: ShippingParams = {
      totalWeight: 0,
      width: 0,
      height: 0,
      length: 0,
      totalPrice: 0,
    };

    for (const product of products.items) {
      const productFound = await this.productsService.findOne(
        product.id,
        false,
        false,
      );
      shippingParams.totalWeight +=
        (productFound.weight * product.quantity) / 100;
      shippingParams.width += (productFound.width * product.quantity) / 100;
      shippingParams.height += (productFound.height * product.quantity) / 100;
      shippingParams.length += (productFound.length * product.quantity) / 100;
      shippingParams.totalPrice = (productFound.price * product.quantity) / 100;
    }

    const shipping = await frete()
      .cepOrigem(process.env.FROM_ZIPCODE)
      .servico(frete.servicos.sedex)
      .peso(shippingParams.totalWeight)
      .comprimento(shippingParams.length)
      .diametro(0)
      .valorDeclarado(shippingParams.totalPrice)
      .altura(shippingParams.height)
      .largura(shippingParams.width)
      .formato(frete.formatos.caixaPacote)
      .precoPrazo(zipCode);

    return shipping;
  }
}
