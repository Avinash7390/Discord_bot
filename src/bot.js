require("dotenv").config();

//process is global object and process.env for .env files


const { Client, GatewayIntentBits, Partials } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});

client.on("ready", () => {
  console.log(`${client.user.tag} has logged in`);
});

const PREFIX = "$";

client.on("messageCreate", (message) => {

  console.log(`[${message.author.tag}] : ${message.content}`);
  // if bot has send some messages the bot is not going to reply to itself;


  if (message.author.bot) return;

  if (message.content === "hello" || message.content === "Hello") {
    message.reply(` Hello @${message.author} I'm awake`)
  }
  else if (message.mentions.has(client.user)) {
    message.reply(`@${message.author.tag},hello there!`);
  }

  if (message.content.startsWith(PREFIX)) {
    const [CMD_NAME, ...args] = message.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);

    if (CMD_NAME === "kick") {

      if (args.length === 0) return message.reply("Please provide the ID");

      const member = message.guild.members.cache.get(args[0]);
      if (member) {

        // if(!message.member.hasPermission("KICK_MEMBERS"))
        // return message.channel.send("You do not have permission");

        member.kick("kicked the user")
          .then((member) => message.channel.send(`${member} was kicked`))
          .catch((err) => message.channel.send("I do not have permissions:("));

      } else {
        message.channel.send("That member was not found");
      }
    } else if (CMD_NAME === "ban") {

      // if(!message.member.hasPermission("BAN_MEMBERS"))
      // return message.channel.send("You do not have permission");
      const member = message.guild.members.cache.get(args[0]);
      if (args.length === 0) return message.reply("Please provide the ID");
      if (member) {
        message.guild.members.ban(args[0])
          .then((member) => message.channel.send(`${member} was banned`))
          .catch((err) => message.channel.send("I do not have permissions:("));;
      } else {
        message.channel.send("User not found");
      }
    }
  }
});

client.login(process.env.Discord_bot_Tocken);

