'use strict';

var TelegramBot = require('node-telegram-bot-api');
var token = require('./token');
var bot = new TelegramBot(token, {polling: true});

class Halop {
	checkCommands (msg) {
		if (!msg) return;

		for (let i = 0, l = this.commands.length; i < l; i++) {
			let command = this.commands[i];
			if (msg.text.toLowerCase().indexOf(command) != -1) {
				this.moduleCommands[command](msg, bot);
			}
		}
	}
	constructor (params) {
		//init params
		this.params = params;
		this.moduleCommands = {};
		this.commands = Object.keys(params);

		//Load modules
		for (var i = 0, l = this.commands.length; i < l; i++) {
			let command = this.commands[i]
			this.moduleCommands[command] = require('./commands/' + this.params[command]);
		};

		//Read messages
		bot.on('message', (msg) => this.checkCommands(msg));

		console.log('halop init \n', this);
	}
}

//create bot
new Halop({
	'!сиськи' : 'tits',
	'!котики': 'cats',
	'!+1': 'like',
	'!психотерапия': 'psiho',
	'!отмазка': 'otmazka',
	'!погода': 'weather'
});
