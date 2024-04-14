import { Client } from 'pg'

const migration = async () => {
    const client = new Client({
        user: 'postgres',
        password: 'postgres',
        database: 'products'
    })
    await client.connect()

    await client.query("DROP TABLE products, cart_items")

    const result = await client.query(
        `CREATE TABLE products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            weight DECIMAL(5, 2) NOT NULL,
            image VARCHAR(100) NOT NULL,
            price DECIMAL(8, 2) NOT NULL,
            type VARCHAR(50) NOT NULL
        );
        CREATE TABLE cart_items (
            id SERIAL PRIMARY KEY,
            product_id INT NOT NULL,
            quantity INT NOT NULL,
            FOREIGN KEY (product_id) REFERENCES products(id)
        );
        INSERT INTO products (name, weight, image, price, type) VALUES
        ('Coffee Costa Rica', 0.5, 'product1.jpg', 15.99, 'beans'),
        ('Coffee Chile', 0.7, 'product1.jpg', 22.99, 'beans'),
        ('Coffee Ethiopia', 0.8, 'product1.jpg', 30.99, 'beans'),
        ('Coffee Columbia', 0.5, 'product1.jpg', 10.99, 'beans'),
        ('Coffee Costa Rica', 0.6, 'product1.jpg', 35.99, 'ground'),
        ('Coffee Mexico', 0.9, 'product1.jpg', 17.99, 'ground'),
        ('Coffee Panama', 0.5, 'product1.jpg', 22.99, 'ground'),
        ('Coffee Gwatemala', 0.6, 'product1.jpg', 20.99, 'ground'),
        ('Coffee Brasil', 0.9, 'product1.jpg', 20.99, 'promotions'),
        ('Coffee Indian', 0.2, 'product1.jpg', 20.99, 'promotions'),
        ('Coffee Costa Rica', 0.8, 'product1.jpg', 20.99, 'promotions'),
        ('Coffee Gwatemala', 0.6, 'product1.jpg', 20.99, 'promotions');
        `
    );
    console.log("Succesful migration")
}

migration().then();