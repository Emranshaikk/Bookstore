const express = require('express')
const app = express()
const port = process.env.PORT ||3000
const cors = require ("cors")


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Mongodb Configuration //



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://Bestbookcenter:MVX06IWE9lMct8p6@bestbookcentercluster.p0cwnsr.mongodb.net/?retryWrites=true&w=majority&appName=BestbookcenterCluster";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //creating a books collections

    const booksCollections = client.db("BookInventory").collection("books");

    //inserting a book in database

    app.post("/upload-book", async(req, res) => {
        const data = req.body;
        const result = await booksCollections.insertOne(data);
        res.send(result);
    });


    //Get all books from database

    app.get("/all-books", async(req,res)=>{
        const books = booksCollections.find();
        const result = await books.toArray();
        res.send(result)
    });

    // update a book data : patch or update method

    app.patch("/book/:id", async(req, res)=>{
        const id = req.params.id;
        const updateBookData = req.body;
        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
            $set : {
                updateBookData
            },
        }
        
        const options = {upsert: true};
        const result = await booksCollections.updateOne(filter, updateDoc, options);
        res.send(result);
        //console.log(id);
    })


        // delete a item from db 

    app.delete("/book/:id", async(req,res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const result = await booksCollections.deleteOne(filter)
        res.send(result)
        
    })

    // find book by catogery

    app.get("/all-books", async(req,res) => {
        let query = {};
        if(req.query?.category){
            query = {category: req.query.category}
        }
        const result = await booksCollections.find(query).toArray();
        res.send(result);
    });

    // to get single book data

    app.get("/book/:id", async(req, res) => {
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const result = await booksCollections.findOne(filter);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);


//Mongo Db Code Ends here//


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})