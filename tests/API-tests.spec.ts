import { test, expect, Page } from '@playwright/test';
import { Client } from 'pg';

async function clearDatabase() {
    const client = new Client({
        user: 'postgres',
        password: 'postgres',
        database: 'products'
    })
    await client.connect();

    const res = await client.query('DELETE FROM cart_items');
    await client.end();
};

test.beforeEach(async ({ page },) => {
    await clearDatabase();
});

test.afterEach(async ({ page },) => {
    await clearDatabase();
});

const baseUrl = 'http://localhost:8888';

test('Get should return empty list of products in the basket', async ({ request }) => {
    const response = await request.get(`${baseUrl}/cart`);
    expect(response.status()).toBe(200);
    expect(await response.json()).toStrictEqual([]);
});

test('Get should return one cart item after post request', async ({ request }) => {
    const requestBody = { productId: 1, quantity: 1 };
    const createCartItemRes = await request.post(`${baseUrl}/cart`, {
        data: requestBody
    });
    expect(createCartItemRes.status()).toBe(200);

    const getCartItemRes = await request.get(`${baseUrl}/cart`);
    expect(getCartItemRes.status()).toBe(200);
    const responseBody = await getCartItemRes.json();
    expect(responseBody[0].product_id).toEqual(requestBody.productId);
    expect(responseBody[0].quantity).toEqual(requestBody.quantity);
});

test('Get should return empty list after delete request', async ({ request }) => {
    const requestBody = { productId: 1, quantity: 1 };
    const createCartItemRes = await request.post(`${baseUrl}/cart`, {
        data: requestBody
    });
    expect(createCartItemRes.status()).toBe(200);

    const getCartItemRes = await request.get(`${baseUrl}/cart`);
    const responseBody = await getCartItemRes.json();
    const responseBodyCartItemId = responseBody[0].cart_item_id;
    const deleteCartItemRes = await request.delete(`${baseUrl}/cart/${responseBodyCartItemId}`);
    expect(deleteCartItemRes.status()).toBe(200);

    const getCartItemsResAfterDelete = await request.get(`${baseUrl}/cart`);
    expect(getCartItemsResAfterDelete.status()).toBe(200);
    expect(await getCartItemsResAfterDelete.json()).toStrictEqual([]);
});

test('Delete non existent cart item should return 404', async ({ request }) => {
    const deleteCartItemRes = await request.delete(`${baseUrl}/cart/100`);
    expect(deleteCartItemRes.status()).toBe(404);
    const responseBody = await deleteCartItemRes.text();
    const response = JSON.parse(responseBody)
    expect(response).toEqual('Product not found in the cart');
});