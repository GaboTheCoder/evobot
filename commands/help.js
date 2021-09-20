const { MessageEmbed, Message } = require("discord.js");
const i18n = require("../util/i18n");

module.exports = {
  name: "help",
  aliases: ["h"],
  description: i18n.__("help.description"),
  /**
   * @param {Message} message 
   * @returns 
   */
  execute(message) {
    let commands = message.client.commands.values();
    let cmdArray = [];

    let helpEmbed = new MessageEmbed()
      .setTitle(i18n.__mf("help.embedTitle", { botname: message.client.user.username }))
      .setDescription(i18n.__("help.embedDescription"))
      .setColor("#F8AA2A");

    /**
     * Wanky workaround but it works okay lol.
     */
    for (const cmd of commands) {
      cmdArray.push(cmd);
    }

    cmdArray.forEach((cmd) => {
      helpEmbed.addField(
        `**${message.client.prefix}${cmd.name} ${cmd.aliases ? `(${cmd.aliases})` : ""}**`,
        `${cmd.description}`,
        true
      );
    });

    helpEmbed.setTimestamp();

    return message.channel.send({ embeds: [helpEmbed] }).catch(console.error);
  }
};
