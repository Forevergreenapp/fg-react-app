/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
const { logger } = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");

// The Firebase Admin SDK to access Firestore.
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp();

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/index

// Take the text parameter passed to this HTTP endpoint and insert it into
// Firestore under the path /messages/:documentId/original
exports.addmessage = onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into Firestore using the Firebase Admin SDK.
  const writeResult = await getFirestore()
    .collection("messages")
    .add({ original: original });
  // Send back a message that we've successfully written the message
  res.json({ result: `Message with ID: ${writeResult.id} added.` });
});

// Listens for new messages added to /messages/:documentId/original
// and saves an uppercased version of the message
// to /messages/:documentId/uppercase
exports.makeuppercase = onDocumentCreated("/messages/{documentId}", (event) => {
  // Grab the current value of what was written to Firestore.
  const original = event.data.data().original;

  // Access the parameter `{documentId}` with `event.params`
  logger.log("Uppercasing", event.params.documentId, original);

  const uppercase = original.toUpperCase();

  // You must return a Promise when performing
  // asynchronous tasks inside a function
  // such as writing to Firestore.
  // Setting an 'uppercase' field in Firestore document returns a Promise.
  return event.data.ref.set({ uppercase }, { merge: true });
});

// Trigger a function on user creation
// https://firebase.google.com/docs/functions/auth-events
// Create a new user in Cloud Firestore when a new Firebase
// Authentication account is created

// Functions that need to be written
// USER PROFILE FUNCTIONS
// 1. Create a new user in Cloud Firestore when a new Firebase
//    Authentication account is created
// 2. Update the user's profile in Cloud Firestore when their
//    profile is updated in Firebase Auth
// 3. Delete the user's profile from Cloud Firestore when their
//    account is deleted in Firebase Auth
// CARBON CALCULATOR FUNCTIONS
// 1. When the transportation section is completed, add the data
//    To the logged in user's data in the db
// 2. When the diet section is completed, add that data
//    To the logged in user's data in the db
// 3. When the energy section is completed, add that data
//    to the logged in user's data in the db
// 4. Write a function to access the currently logged in user's
//    Carbon Calculator data in the db and return it to the client
// CARBON CREDIT FUNCTIONS
// 1. Create an HTTPS endpoint and possible web page to allow for
//    us to create new carbon credits
// 2. Create a cloud function that triggers when a user purchases a
//    carbon credit. This function needs to update user schema (add cert),
//    carbon credit schema (quantity)

