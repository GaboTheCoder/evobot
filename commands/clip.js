const i18n = require("../util/i18n");
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const { Message } = require("discord.js");

module.exports = {
  name: "clip",
  description: i18n.__("clip.description"),
  /**
   * @param {Message} message 
   * @param {Array.<string>} args 
   * @returns 
   */
  async execute(message, args) {
    const { channel } = message.member.voice;
    const queue = message.client.queue.get(message.guild.id);

    if (!args.length) return message.reply(i18n.__("clip.usagesReply")).catch(console.error);
    if (queue) return message.reply(i18n.__("clip.errorQueue"));
    if (!channel) return message.reply(i18n.__("clip.errorNotChannel")).catch(console.error);

    const queueConstruct = {
      textChannel: message.channel,
      channel,
      connection: null,
      songs: [],
      loop: false,
      volume: 100,
      muted: false,
      playing: true
    };

    message.client.queue.set(message.guild.id, queueConstruct);

    try {
      queueConstruct.connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
      });

      const player = createAudioPlayer();

      const resource = createAudioResource(`./sounds/${args[0]}.mp3`);

      player.play(resource);

      queueConstruct.connection.subscribe(player);

      player.on(AudioPlayerStatus.Idle, () => {
        message.client.queue.delete(message.guild.id);
        /**
         * Testing ^^
         */
        console.log("Finished (Clip)");
      }).on("error", (err) => {
        message.client.queue.delete(message.guild.id);
        queueConstruct.connection.destroy();
        console.error(err);
      });
    } catch (error) {
      console.error(error);
    }
  }
};
