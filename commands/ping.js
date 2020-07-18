

module.exports = {
  name: 'ping',
  description: 'Ping!',
  execute(msg, args) {
    msg.reply(doc.data());
    msg.channel.send(doc.data());
  },
};  