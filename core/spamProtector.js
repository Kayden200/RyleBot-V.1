const cooldowns = new Map();

module.exports = function (senderID, command, time = 3) {
  const key = `${senderID}_${command}`;

  if (cooldowns.has(key)) {
    const now = Date.now();
    const diff = (now - cooldowns.get(key)) / 1000;

    if (diff < time) return time - diff;
  }

  cooldowns.set(key, Date.now());
  return 0;
};
