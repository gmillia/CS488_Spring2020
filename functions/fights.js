/**
 * File contains functions (API) to interact with Fights Collection
 * 
 * @author Illia Shershun
 * @since 05/13/2020
 */

const functions = require('firebase-functions');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:March1678%3F@cluster0-unmnl.gcp.mongodb.net/test?retryWrites=true&w=majority";

/*#########################################################################################*/
/*GET ALL FUNCTION#########################################################GET ALL FUNCTION*/
/*#########################################################################################*/

/**
 * Function connects to db and fetches full Fighters collection
 * 
 * @returns {Promise} - returns a list of all fighters from Fighters collection
 */
exports.getAllFights = functions.https.onCall((data, context) => {
    return new Promise(async function(resolve, reject) {
        MongoClient.connect(uri, { useUnifiedTopology: true }, function(err, db) {
            if(err) {
                console.log("Error connecting to DB");
                db.close();
                return reject('ERROR: ' + err);
            }
            else 
            {
                db.db('UFC').collection('Fights')
                .find({}, { projection: { _id: 0, pageurl: 0, f1pageurl: 0, f2pageurl: 0}})
                .toArray(function(err, fightList) {
                    db.close();
                    resolve(fightList);  //Send back array of conferences (data)
                });
            }
        }) 
    })
});

/*#########################################################################################*/
/*SPECIFIC FUNCTIONS#####################################################SPECIFIC FUNCTIONS*/
/*#########################################################################################*/

/**
 * Function that searches Fighters database for a fighter by their id
 * 
 * @returns {Promise} - Promise object contains JSON for the fighter
 */
exports.getFightsByFighterName = functions.https.onCall((data, context) => {
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
                db.db('UFC').collection('Fights')
                .find({"f1name": fighterName, "f2name": fighterName}, { projection: { _id: 0, pageurl: 0, f1pageurl: 0, f2pageurl: 0 }})
                .then(fighter => resolve(fighter));
            }
        }) 
    });
})

/**
 * Function connects to db and fetches full Fighters collection
 * 
 * @returns {Promise} - returns a list of all fighters from Fighters collection
 */
exports.getAllMethodCounts = functions.https.onCall((data, context) => {
    return new Promise(async function(resolve, reject) {
        MongoClient.connect(uri, { useUnifiedTopology: true }, function(err, db) {
            if(err) {
                console.log("Error connecting to DB");
                db.close();
                return reject('ERROR: ' + err);
            }
            else 
            {
                db.db('UFC').collection('Fights')
                .find({}, { projection: { _id: 0, pageurl: 0, f1pageurl: 0, f2pageurl: 0}})
                .toArray(function(err, fightList) {
                    byMethod = count(fightList, function(item) {
                        return item.method;
                    });
                    db.close();
                    resolve(byMethod);  
                });
            }
        }) 
    })
});

/**
 * Function connects to db and fetches full Fighters collection
 * 
 * @returns {Promise} - returns a list of all fighters from Fighters collection
 */
exports.getAllMethodDefinitionCounts = functions.https.onCall((data, context) => {
    return new Promise(async function(resolve, reject) {
        MongoClient.connect(uri, { useUnifiedTopology: true }, function(err, db) {
            if(err) {
                console.log("Error connecting to DB");
                db.close();
                return reject('ERROR: ' + err);
            }
            else 
            {
                db.db('UFC').collection('Fights')
                .find({}, { projection: { _id: 0, pageurl: 0, f1pageurl: 0, f2pageurl: 0}})
                .toArray(function(err, fightList) {
                    byMethod = count(fightList, function(item) {
                        return item.method_d;
                    });
                    db.close();
                    resolve(byMethod);  
                });
            }
        }) 
    })
});

count = function (ary, classifier) {
    classifier = classifier || String;
    return ary.reduce(function (counter, item) {
        var p = classifier(item);
        counter[p] = counter.hasOwnProperty(p) ? counter[p] + 1 : 1;
        return counter;
    }, {})
};

