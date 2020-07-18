require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const botCommands = require('./commands');
const admin = require('firebase-admin');
const serviceAccount = require('./firebase-config.json')
// Object.keys(botCommands).map(key => {
//   bot.commands.set(botCommands[key].name, botCommands[key]);
// });

// const TOKEN = process.env.TOKEN;

// bot.login(TOKEN);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore()

var doc = db.collection("nike").doc("launch");

const observer = db.collection('nike')
  .onSnapshot(querySnapshot => {
    querySnapshot.docChanges().forEach(change => {
      if (change.type === 'added') {
        console.log('New city: ', change.doc.data());
      }
      if (change.type === 'modified') {
        console.log('Modified city: ', change.doc.data());
      }
      if (change.type === 'removed') {
        console.log('Removed city: ', change.doc.data());
      }
    });
  });


//  docRef.get().then(function(doc) {
//     if (doc.exists) {
//       let items = doc.data()
//       JSON.stringify(items)
      
//         bot.on('ready', () => {
//           console.info(`Logged in as ${bot.user.tag}!`);
//           items.stuff.map(el => {
//           bot.channels.cache.get('733127372307693591').send(el)
//         });
//       })
      
//     } else {
//         // doc.data() will be undefined in this case
//         console.log("No such document!");
//     }
// }).catch(function(error) {
//     console.log("Error getting document:", error);
// });


