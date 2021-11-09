const commands = [
{
	command: "/commands",
	description: "display all commands"
},
{
	command: "/clear",
	description: "clear the console log"
},
{
	command: "/man",
	description: "display user manual of the command",
	syntax: "/man [command name]",
	example: "/man /clear"
},
{
	command: "/dice",
	description: "display number of dice player has",
	syntax: "/dice",
},
{
	command: "move",
	description: "Move character to the given direction",
	syntax: "move [direction]",
	direction: "[up, right, left]",
	example: "move up"
},
{
	command: "roll",
	description: "roll dice to get moving cost. if number of dice is not given, roll 1 die by default",
	syntax: "roll [number of dice]",
	example: "roll 3"
},

{
	command: "attack",
	description: "attack target",
	syntax: "roll [monster_name] [number of dice to use]",
	example: "attack goblin 3"
},
]

const getCommands = () => {
	return commands;
}

const getCommandMan = (manCommand) => {
	let commandToReturn = {command: "Not Found"};
	commands.forEach(command =>{
		if(command.command == manCommand)
			commandToReturn = command
	})
	return commandToReturn;
}

module.exports = {
	getCommands,
	getCommandMan
}