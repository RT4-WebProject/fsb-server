import { Axios } from 'axios';

const secret =
  'sk_test_51IvokBGytmbFpPCHsLpTNTAWcmSCQAQXjetcpQpFpu27jSnsOUgApPyZfvmLRiQmdo528GrlmknLyGIKob7VHmVb009ZnocWRq';

const client = new Axios({
  baseURL: 'https://api.stripe.com/v1',
  headers: {
    Authorization: `Bearer ${secret}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

async function createProduct(id: number, name: string, description: string) {
  const product = await client
    .post(
      '/products',
      new URLSearchParams({
        'metadata[tx_id]': id.toString(),
        name,
        description,
      }).toString(),
    )
    .then((r) => JSON.parse(r.data));

  console.log('product', product.id); // .data, product.data.name);

  return product.id;
}

async function createPrice(product: string) {
  const price = await client
    .post(
      '/prices',
      new URLSearchParams({
        currency: 'usd',
        'custom_unit_amount[enabled]': 'true',
        product,
      }).toString(),
    )
    .then((r) => JSON.parse(r.data));

  console.log('price', price.id);

  return price.id;
}

async function createLink(price) {
  const link = await client
    .post(
      '/payment_links',
      new URLSearchParams({
        'line_items[0][price]': price,
        'line_items[0][quantity]': '1',
      }).toString(),
    )
    .then((r) => JSON.parse(r.data));

  console.log('link', link, link.id, link.url);

  return { id: link.id, url: link.url };
}

export function processTransaction(
  id: number,
  title: string,
  description: string,
) {
  return createProduct(id, title, description)
    .then(createPrice)
    .then(createLink);
}
