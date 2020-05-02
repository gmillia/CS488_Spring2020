const functions = require('firebase-functions');

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
