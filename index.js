const cooldown = require("./core/spamProtector");

api.listenMqtt((err, event) => {
  if (err || event.type !== "message" || !event.body) return;

  const body = event.body;
  if (!body.startsWith(prefix)) return;

  const args = body.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const senderID = event.senderID;
  const isAdmin = config.admins.includes(senderID);

  if (commands[commandName]) {
    const wait = cooldown(senderID, commandName);
    if (wait > 0) {
      return api.sendMessage(`⏳ Please wait ${wait.toFixed(1)}s`, event.threadID);
    }

    const cmd = commands[commandName];
    if (cmd.adminOnly && !isAdmin) {
      return api.sendMessage("❌ This command is admin-only.", event.threadID);
    }

    try {
      cmd({ api, event, args, config, isAdmin });
    } catch (e) {
      api.sendMessage(`⚠️ Error: ${e.message}`, event.threadID);
    }
  }
});
