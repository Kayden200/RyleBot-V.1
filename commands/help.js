module.exports = ({ api, event, config }) => {
  const prefix = config.prefix || ".";
  const helpText = `
🛠 Available Commands:

${prefix}help – Show this message
${prefix}ping – Check if bot is online
${prefix}uid – Get your Facebook UID
${prefix}echo <text> – Repeat what you say
${prefix}botinfo – Info about the bot
${prefix}time – Show current time
  `.trim();

  api.sendMessage(helpText, event.threadID);
};
