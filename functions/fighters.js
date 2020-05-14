const functions = require('firebase-functions');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:March1678%3F@cluster0-unmnl.gcp.mongodb.net/test?retryWrites=true&w=majority";

/**
 * Function connects to db and fetches full Fighters collection
 * 
 * @returns {Promise} - returns a list of all fighters from Fighters collection
 */
exports.getAllFighters = functions.https.onCall((data, context) => {
    return new Promise(async function(resolve, reject) {
        MongoClient.connect(uri, { useUnifiedTopology: true }, function(err, db) {
            if(err) {
                console.log("Error connecting to DB");
                db.close();
                return reject('ERROR: ' + err);
            }
            else 
            {
                db.db('UFC').collection('Fighters')
                .find({})
                .toArray(function(err, docs) {
                    db.close();
                    resolve(docs);  //Send back array of conferences (data)
                });
            }
        }) 
    })
});