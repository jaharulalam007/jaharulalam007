const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const uri = "mongodb+srv://jaharulalam1234:YOUR_PASSWORD_HERE@cluster1.xxxxx.mongodb.net/Userdatabase";

const client = new MongoClient(uri);

app.post('/register', async (req, res) => {
    try {
        await client.connect();
        const db = client.db("Userdatabase");
        const users = db.collection("user");

        const result = await users.insertOne({
            phone: req.body.phone,
            createdAt: new Date()
        });

        res.json({ success: true, message: "Number registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

app.listen(process.env.PORT || 5000, () => {
    console.log("Server is running");
});