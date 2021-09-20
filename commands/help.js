const { MessageEmbed } = require("discord.js");
const i18n = require("../util/i18n");

module.exports = {
  name: "help",
  aliases: ["h"],
  description: i18n.__("help.description"),
  execute(message) {
    let commands = message.client.commands.values();

    /**
     * The Best Debugger In History
     */
    console.log(commands);

    let helpEmbed = new MessageEmbed()
      .setTitle(i18n.__mf("help.embedTitle", { botname: message.client.user.username }))
      .setDescription(i18n.__("help.embedDescription"))
      .setColor("#F8AA2A");

    for (const cmd of commands) {
      /**
     * The Best Debugger In History (The Comeback)
     */
      console.log(cmd);
      /*helpEmbed.addField(
        `**${message.client.prefix}${cmd.name} ${cmd.aliases ? `(${cmd.aliases})` : ""}**`,
        `${cmd.description}`,
        true
      );*/
    }
    /*
  commands.forEach((cmd) => {
    helpEmbed.addField(
      `**${message.client.prefix}${cmd.name} ${cmd.aliases ? `(${cmd.aliases})` : ""}**`,
      `${cmd.description}`,
      true
    );
  });

  helpEmbed.setTimestamp();
*/
    return message.channel.send(helpEmbed).catch(console.error);
  }
};
