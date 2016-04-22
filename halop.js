var TelegramBot = require('node-telegram-bot-api');
// var token = require('./token');
var request = require("request");
var Generator = require('./excusesgenerator');
var Psihoterapia = require('./psihoterapia');
var Like = require('./likes');
var bot = new TelegramBot(token, {polling: true});

//Читаем сообщения)
bot.on('message', function (msg) {

	if(msg) {
		console.log(msg.text, msg.from.id);
    //Сиськи
    if(msg.text.indexOf('!сиськи') != -1) {
        request({
        url: "https://tits-guru.com/randomTits",
        type: 'GET'
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var src = body.match(/img src="(.*)"/gmi);
            var newsrc = src[14].split(' ')[1];
                newsrc = newsrc.replace('"', '');
                newsrc = newsrc.replace('"', '');
                newsrc = newsrc.replace('src=', '');
            bot.sendMessage(msg.chat.id, ''+ newsrc);
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
    if(msg.text.toLowerCase().indexOf('!психотерапия') != -1) {
		var name = msg.text.replace('!Психотерапия ', '');
	  	bot.sendMessage(msg.chat.id, Psihoterapia(name));
    }

	//Прогноз
	if(msg.from.username === this.userId && this.weather){
		if((msg.text || msg.location)){
			requestUrl = undefined;
			if(msg.location){
				requestUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + msg.location.latitude +
					"&lon=" + msg.location.longitude +
					"&units=metric&APPID=12f31155bc369a43ba9fd8589a6fbb41";
			}
			else {
				var city = msg.text.replace('!Погода ', ''),
					requestUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&APPID=12f31155bc369a43ba9fd8589a6fbb41"
			}
			request({
				url:requestUrl,
				json: true
			}, function (error,response,body) {
				if (!error && response.statusCode === 200) {
					bot.sendMessage(msg.chat.id,'Текущая температура ' + body.main.temp + ' °С,' +
						'\nМинимальная температура сегодня ' + body.main.temp_min + ' °С' +
						'\nМаксимальная температура сегодня ' + body.main.temp_max + ' °С');
					_this.weather = false;
				}
			})
		}
	} else if(msg.text && msg.text.indexOf('!Погода') != -1){
		this.userId = msg.from.username;
		this.weather = true;
		bot.sendMessage(msg.chat.id,'Отправьте свою геолокацию или укажите город на английском');
	}
 
	}

});
