import { Client } from 'pg'
import express from 'express';
const app = express();
import cors from 'cors';

const corsSettings = {
    origin: '*', 
    methods: ['GET', 'POST', 'PATCH', 'DELETE', "OPTIONS"], 
    allowedHeaders: ['Content-Type', 'Authorization'],
}

app.use(cors(corsSettings));

app.options('*', cors(corsSettings)) 

app.use(express.json());

// const connectToDatabase = (req: any) => {
//     const client = new Client({
//         user: 'postgres',
//         password: 'postgres',
//         database: 'products'
//     })
//     client.connect();
//     req.lient = client;
    
// }

// app.use(connectToDatabase);

app.get('/', async (req: any, res: any) => {
    const client = new Client({
        user: 'postgres',
        password: 'postgres',
        database: 'products'
    })
    await client.connect()

    const result = await client.query(
        'SELECT * FROM products ORDER BY id ASC'
    );
    console.log(result.rows)
    res.status(200).send(result.rows);

    console.log(req)
    res.send('Serwer działa')
});

app.get('/category/beans', async (req, res) => {
    const client = new Client({
        user: 'postgres',
        password: 'postgres',
        database: 'products'
    })
    await client.connect();

    const result = await client.query('SELECT * FROM products WHERE type = $1', ['beans']);

    res.status(200).send(result.rows);
});

app.get('/category/ground', async (req, res) => {
    const client = new Client({
        user: 'postgres',
        password: 'postgres',
        database: 'products'
    })
    await client.connect();

    const result = await client.query('SELECT * FROM products WHERE type = $1', ['ground']);

    res.status(200).send(result.rows);
});

app.get('/category/promotions', async (req, res) => {
    const client = new Client({
        user: 'postgres',
        password: 'postgres',
        database: 'products'
    })
    await client.connect();

    const result = await client.query('SELECT * FROM products WHERE type = $1', ['promotions']);

res.status(200).send(result.rows);
});

app.post('/cart', async (req: any, res: any) => {

    const client = new Client({
        user: 'postgres',
        password: 'postgres',
        database: 'products'
    })
    await client.connect()

    const result = await client.query('INSERT INTO cart_items (id, quantity) VALUES ($1, $2)',
    [req.body.id, req.body.quantity]);

    res.status(200).send([]);
})

app.get('/cart', async (req: any, res: any) => {

    const client = new Client({
        user: 'postgres',
        password: 'postgres',
        database: 'products'
    })
    await client.connect()

    const result = await client.query('SELECT id, quantity FROM cart_items');

    res.status(200).send(result.rows);
})

app.delete('/cart', async (req: any, res: any) => {
    const client = new Client({
        user: 'postgres',
        password: 'postgres',
        database: 'products'
    })
    await client.connect()

    const result = await client.query('DELETE FROM cart_items WHERE id=$1',
    [req.params.id]);

    res.status(200).send(result.rows);
})

app.listen(8888, () => {
})