const i18n = require("../util/i18n");
const { Message } = require("discord.js");

module.exports = {
  name: "invite",
  description: i18n.__("invite.description"),
  /**
   * @param {Message} message 
   * @returns 
   */
  execute(message) {
    return message.member
      .send(
        `https://discord.com/oauth2/authorize?client_id=${message.client.user.id}&permissions=70282305&scope=bot
    `
      )
      .catch(console.error);
  }
};
