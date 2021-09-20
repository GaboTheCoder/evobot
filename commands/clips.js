const i18n = require("../util/i18n");
const fs = require("fs");
const { Message } = require("discord.js");

module.exports = {
  name: "clips",
  description: i18n.__("clips.description"),
  /**
   * @param {Message} message  
   */
  execute(message) {
    fs.readdir("./sounds", function (err, files) {
      if (err) return console.log("Unable to read directory: " + err);

      let clips = [];

      files.forEach(function (file) {
        clips.push(file.substring(0, file.length - 4));
      });

      message.reply(`${clips.join(" ")}`).catch(console.error);
    });
  }
};
