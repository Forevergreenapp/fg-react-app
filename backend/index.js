const { initializeApp } = require('firebase-admin/app');
import { initializeApp } from 'firebase-admin/app';

var admin = require("firebase-admin");

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fg-react-app-default-rtdb.firebaseio.com"
});
