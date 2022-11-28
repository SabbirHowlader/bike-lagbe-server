const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000; 

const app = express();

// middleware 
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ptacj7j.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const simpleBikeCollection = client.db('bikeLagbe').collection('simpleBike');

        app.get('/simpleBike', async(req, res) =>{
            const query = {};
            const options = await simpleBikeCollection.find(query).toArray();
            res.send(options);
        })
    }
    finally{

    }
}
run().catch(console.log);


app.get('/', async(req, res) =>{
    res.send('bike lagbe server is running')
});

app. listen(port, () => console.log(`bike lagbe running on ${port}`))