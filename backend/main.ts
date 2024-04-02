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

app.get('/', (req: any, res: any) => {
    console.log(req)
    res.send('Serwer działa')
});

app.get('/category/beans', async (req: any, res: any) => {
    // const client = new Client({
    //     user: 'postgres',
    //     password: 'postgres',
    //     database: 'postgres'
    // })
    // await client.connect()
    res.send([{
        id: 1,
        name: 'Coffee Costa Rica',
        weight: 0.5,
        image: "product1.jpg",
        price: 15.99,
        type: 'beans',
    },
    {
        id: 2,
        name: 'Coffee Chile',
        weight: 0.7,
        image: "product1.jpg",
        price: 22.99,
        type: 'beans',
    },
    {
        id: 3,
        name: 'Coffee Ethiopia',
        weight: 0.8,
        image: "product1.jpg",
        price: 30.99,
        type: 'beans',
    },])
});

// app.post('/todos', async (req: any, res: any) => {
//     console.log(req.body);

//     const client = new Client({
//         user: 'postgres',
//         password: 'postgres',
//         database: 'postgres'
//     })
//     await client.connect()
// })

app.listen(8888, () => {
})