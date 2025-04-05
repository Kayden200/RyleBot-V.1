const fs = require("fs");
const path = require("path");

function loadCommands(commandsPath = path.join(__dirname, "../commands")) {
  const commands = {};

  fs.readdirSync(commandsPath).forEach(file => {
    if (file.endsWith(".js")) {
      const commandName = file.split(".")[0];
      const command = require(path.join(commandsPath, file));
      commands[commandName] = command;
    }
  });

  return commands;
}

module.exports = loadCommands;
