let isSleeping = false;

module.exports = {
  adminOnly: true,

  run: ({ api, event, args, config }) => {
    if (!args[0]) {
      return api.sendMessage("Usage: .sleep <minutes>", event.threadID);
    }

    const minutes = parseInt(args[0]);
    if (isNaN(minutes) || minutes <= 0) {
      return api.sendMessage("Please enter a valid number of minutes.", event.threadID);
    }

    if (isSleeping) {
      return api.sendMessage("Bot is already sleeping.", event.threadID);
    }

    isSleeping = true;
    api.sendMessage(`Sleeping for ${minutes} minute(s)... Zzz`, event.threadID);

    setTimeout(() => {
      isSleeping = false;
      api.sendMessage("I'm back online!", event.threadID);
    }, minutes * 60 * 1000);
  },

  checkSleep: () => isSleeping
};
