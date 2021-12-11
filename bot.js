const { Client, Intents } = require('discord.js');

const robot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const comms = require("./comms.js"); // command file
const fs = require("fs"); // connection node.js

let config = require("./config.json"); // connection file with setting and information
let token = config.token; // token discord
let prefix = config.prefix; // prefix with discord

robot.on("ready", function() {
    // message on successful launch
    console.log(robot.user.username + " да он запустился!");
    console.log("https://discord.com/login?redirect_to=%2Foauth2%2Fauthorize%3Fclient_id%3D915999801223561276%26permissions%3D8%26scope%3Dbot")
});

robot.on('message', (msg) => { // Реагирование на сообщения
    if (msg.author.username != robot.user.username && msg.author.discriminator != robot.user.discriminator) {
      var comm = msg.content.trim() + " ";
      var comm_name = comm.slice(0, comm.indexOf(" "));
      var messArr = comm.split(" ");
      for (comm_count in comms.comms) {
        var comm2 = prefix + comms.comms[comm_count].name;
        if (comm2 == comm_name) {
          comms.comms[comm_count].out(robot, msg, messArr);
        }
      }
    }
  });

robot.login(token);