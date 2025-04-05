module.exports = ({ api, event, config }) => {
  const info = `
🤖 ${config.botName}
📌 Prefix: ${config.prefix}
👑 Admin UID: ${config.admins.join(", ")}
  `.trim();

  api.sendMessage(info, event.threadID);
};
