var TelegramBot = require('node-telegram-bot-api');
var token = require('./token');
var request = require("request");
var Generator = require('./excusesgenerator');
var Psihoterapia = require('./psihoterapia');
var Like = require('./likes');

var bot = new TelegramBot(token, {polling: true});

//Читаем сообщения)
bot.on('message', function (msg) {
    //Получаем шортики
	if(msg.text.indexOf('!шутка') != -1) {
		request({
		url: "http://shortiki.com/export/api.php?format=json&type=random&amount=1",
		json: true
	}, function (error, response, body) {

	if (!error && response.statusCode === 200) {
	  	bot.sendMessage(msg.chat.id, ''+ body[0].content);
		}
	});
	}
    //Отмазки
    if(msg.text.indexOf('!отмазка') != -1) {
        var name = msg.text.replace('!отмазка ', '');
        bot.sendMessage(msg.chat.id, ''+ Generator.generate(name)); 
    }  
    //+1
    if(msg.text.indexOf('!+1') != -1) {
        var name = msg.text.replace('!+1 ', '');
        bot.sendMessage(msg.chat.id, name+', +1 :) Счет:'+Like(name));  
    }   
	//Психотерапия
	if(msg.text.indexOf('!Психотерапия') != -1) {
		var name = msg.text.replace('!Психотерапия ', '');
	  	bot.sendMessage(msg.chat.id, Psihoterapia(name));	
	}  

});