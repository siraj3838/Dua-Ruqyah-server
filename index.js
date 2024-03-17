const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;




app.use(cors({
    origin: [
        'http://localhost:5173'
    ],
    credentials: true
}));
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hq29e8f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        

        const suraCollection = client.db('categoryDB').collection('hadish');


        // borrow Collection
        app.post('/hadishs', async (req, res) => {
            const book = req.body;
            const result = await suraCollection.insertOne(book);
            res.send(result);
        })

        app.get('/hadishs', async (req, res) => {
            const result = await suraCollection.find().toArray();
            res.send(result);
        })


        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Sura Hadhis Server Is Running');
})
app.listen(port, () => {
    console.log(`My Sura Hadhis Running From ${port}`)
})