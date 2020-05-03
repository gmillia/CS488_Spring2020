const functions = require('firebase-functions');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:<password>@cluster0-unmnl.gcp.mongodb.net/test?retryWrites=true&w=majority";

/*
Simple test function to demonstrate how our functions will be called. 
For our case we only need to be concerned with data, as it will be the JSON object from which
we can extract info.
For example, if fighter info will be passed, we can use data.fighterName to extract name of the fighter.
Data will be passed-in in JSON format from user side (taht is you'll need to call it with test({fighterName: someRandomName})
*/
exports.test = functions.https.onCall((data, context) => {
    let userMessage = data.message;
    return 'This is a message from the server side. If you see this, it means function was triggered by some event on the user side. You passed: ' + userMessage;
});

/**
 * I made this function to display how to fetch data from the MongoDb
 * In Cluster 1 I made a database called TEST (go to collections) with collection called CS488, containing single doc
 */
exports.databaseTest = functions.https.onCall((data, context) => {
    return new Promise(async function(resolve, reject) {
        const client = new MongoClient(uri, { useNewUrlParser: true });
        client.connect(err => {
            //if(err) return reject('Error connecting to MongoDb');
            const collection = client.db("TEST").collection("CS488");
            //This way we fetch full collection
            collection.find({}).toArray(function(err, docs) {
                //if(err) return reject('Error connecting to CS488 collection.');
                client.close();
                //This returns JSON list basically
                return resolve(docs);
            });
        });
    });
});
