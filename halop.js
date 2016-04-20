var TelegramBot = require('node-telegram-bot-api');
var token = require('./token');
var request = require("request");
var Generator = require('./excusesgenerator');
var Psihoterapia = require('./psihoterapia');
var Like = require('./likes');
var bot = new TelegramBot(token, {polling: true});


//Читаем сообщения)
bot.on('message', function (msg) {
	if(msg) {
		console.log(msg.text, msg.from.id);
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

    //Котаны
	if(msg.text.indexOf('!котики') != -1) {
		request({
		url: "http://thecatapi.com/api/images/get?format=html&results_per_page=1",
		json: true
	}, function (error, response, body) {
    	if (!error && response.statusCode === 200) {
            var src = body.match(/src="(.*)"/mi);
    	  	bot.sendMessage(msg.chat.id, ''+ src[1]);
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
	}

});