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

const inputs = [
    { title: 'Post null', body: { productId: null, quantity: null } },
    { title: 'Post undefined', body: { productId: undefined, quantity: undefined } },
    { title: 'Post empty array', body: { productId: [], quantity: [] } },
    { title: 'Post dot', body: { productId: '.', quantity: '.' } },
    { title: 'Post string', body: { productId: 'test', quantity: 'test' } },
    { title: 'Post zero', body: { productId: 0, quantity: 0 } },
    { title: 'Post negative numbers', body: { productId: -1, quantity: -2 } },
    { title: 'Post float numbers', body: { productId: 1.2, quantity: 1.3 } },
    { title: 'Post empty object', body: { productId: {}, quantity: {} } },
    { title: 'Post array with strings', body: { productId: ['test'], quantity: ['test'] } },
    { title: 'Post boolean', body: { productId: true, quantity: true } },
    { title: 'Post empty body', body: {} },
    { title: 'Post correct productId and dot in quantity', body: { productId: 1, quantity: '.' } },
    { title: 'Post empty object in productId and correct quantity', body: { productId: [], quantity: 1 } },
    { title: 'Post string numbers', body: { productId: '2', quantity: '3' } },
    { title: 'Post special characters', body: { productId: '%^&', quantity: '(&^&*' } },
    { title: 'Post whitespace string', body: { productId: ' ', quantity: ' ' } }
]


inputs.forEach(input => {
    test(`Test: ${(input.title)}`, async ({ request }) => {
        const createCartItemRes = await request.post(`${baseUrl}/cart`, {
            data: input.body
        });

        expect(createCartItemRes.status()).toBe(400);

    })
})