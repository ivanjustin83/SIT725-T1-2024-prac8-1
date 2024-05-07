const FormDataModel = require('../models/cat')
const { connectToDB, client } = require('../dbconnection');

class formController {
    static async submitNewCat(req, res) {
        const { title, colour, link, description } = req.body

        const formData = new FormDataModel(title, colour, link, description);

        if (await formData.saveToDatabase()) {
            res.status(500).send('Form was not submitted successfully.')
        } else {
            res.status(200).send('Form was submitted successfully');
        }
    }

    static async getCat(req, res) {
        let results = [];

        try {
            await connectToDB();
            const db = client.db("test");
            const coll = db.collection("Cat");
            const cursor = coll.find();
            results = await cursor.toArray();
            console.log(results);
            res.json({result: results, statusCode: 200 }).status(200);
        } finally {
            await client.close();
        }
    }

    static async deleteCat(req, res) {
        const { title } = req.body
        const doc = {title: title}

        try {
            await connectToDB();
            const db = client.db("test");
            const coll = db.collection("Cat");
            const deleteResult = await coll.deleteOne(doc);
            console.log("Record Deleted!");
            res.send(deleteResult);
        } finally {
            await client.close();
        }
    }

    // static async getCat() {
    //     const cards = await getAllCards();
    //     res.send(JSON.stringify(cards))
    // }
}

module.exports = formController;