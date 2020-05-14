/**
 * File contains functions (API) to interact with Fighters collection
 * 
 * @author Illia Shershun
 * @since 5/13/2020
 */
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
                .find({}, { projection: { _id: 0, url: 0 }})
                .toArray(function(err, fightersList) {
                    db.close();
                    resolve(fightersList); 
                });
            }
        }) 
    })
});

/**
 * Function that searches Fighters database for a fighter by their id
 * 
 * @returns {Promise} - Promise object contains JSON for the fighter
 */
exports.getFighterById = functions.https.onCall((data, context) => {
    return new Promise(async function(resolve, reject) {
        let fighterId = data.fighterId;
        MongoClient.connect(uri, { useUnifiedTopology: true }, function(err, db) {
            if(err) {
                console.log("Error connecting to DB");
                db.close();
                return reject('ERROR: ' + err);
            }
            else 
            {
                db.db('UFC').collection('Fighters')
                .findOne({"fid": fighterId}, { projection: { _id: 0, url: 0 }})
                .then(fighter => resolve(fighter));
            }
        }) 
    });
})

/**
 * Function that searches Fighters database for a fighter by their name
 * 
 * @returns {Promise} - Promise object contains JSON for the fighter
 */
exports.getFighterByName = functions.https.onCall((data, context) => {
    return new Promise(async function(resolve, reject) {
        let fighterName = data.fighterName;
        MongoClient.connect(uri, { useUnifiedTopology: true }, function(err, db) {
            if(err) {
                console.log("Error connecting to DB");
                db.close();
                return reject('ERROR: ' + err);
            }
            else 
            {
                db.db('UFC').collection('Fighters')
                .findOne({"name": fighterName}, { projection: { _id: 0, url: 0 }})
                .then(fighter => resolve(fighter));
            }
        }) 
    });
})

/**
 * Function that searches Fighters collection for fighters by particular country
 * 
 * @returns {Promise} - Promise object contains JSON list with all the fighters from particular country
 */
exports.getFightersByCountry = functions.https.onCall((data, context) => {
    return new Promise(async function(resolve, reject) {
        let country = data.country;
        MongoClient.connect(uri, { useUnifiedTopology: true }, function(err, db) {
            if(err) {
                console.log("Error connecting to DB");
                db.close();
                return reject('ERROR: ' + err);
            }
            else 
            {
                db.db('UFC').collection('Fighters')
                .find({ "country": country }, { projection: { _id: 0, url: 0 }})
                .toArray(function(err, fighterList) {
                    db.close();
                    resolve(fighterList); 
                });
            }
        }) 
    })
});

/**
 * Function that searches Fighters collection for fighters by particular weight class
 * 
 * @returns {Promise} - Promise object contains JSON list with all the fighters from particular weight class
 */
exports.getFightersByWeightClass = functions.https.onCall((data, context) => {
    return new Promise(async function(resolve, reject) {
        let weightClass = data.weightClass;
        MongoClient.connect(uri, { useUnifiedTopology: true }, function(err, db) {
            if(err) {
                console.log("Error connecting to DB");
                db.close();
                return reject('ERROR: ' + err);
            }
            else 
            {
                db.db('UFC').collection('Fighters')
                .find({ "class": weightClass }, { projection: { _id: 0, url: 0 }})
                .toArray(function(err, fighterList) {
                    db.close();
                    resolve(fighterList); 
                });
            }
        }) 
    })
});