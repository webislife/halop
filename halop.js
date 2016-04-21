var TelegramBot = require('node-telegram-bot-api');
// var token = require('./token');
var request = require("request");
var Generator = require('./excusesgenerator');
var Psihoterapia = require('./psihoterapia');
var Like = require('./likes');


var bot = new TelegramBot("175288885:AAGfHoCdOXp6xx0cX8vpUA3sn-fb01G6Ajg", {polling: true});

//Читаем сообщения)
bot.on('message', function (msg) {
	console.log(msg)
	var _this = this;
    //Получаем шортики
    if( msg.text && msg.text.indexOf('!шутка') != -1) {
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
    if(msg.text && msg.text.indexOf('!отмазка') != -1) {
        var name = msg.text.replace('!отмазка ', '');
        bot.sendMessage(msg.chat.id, ''+ Generator.generate(name));
    }
    //+1
    if( msg.text && msg.text.indexOf('!+1') != -1) {
        var name = msg.text.replace('!+1 ', '');
        bot.sendMessage(msg.chat.id, name+', +1 :) Счет:'+Like(name));
    }
    //Психотерапия
    if(msg.text && msg.text.indexOf('!Психотерапия') != -1) {
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
	}
	else if(msg.text && msg.text.indexOf('!Погода') != -1){
		this.userId = msg.from.username;
		this.weather = true;
		bot.sendMessage(msg.chat.id,'Отправьте свою геолокацию или укажите город на английском');
	}

	//Получаем чат айди и приветствие
	if(msg.text && msg.text==='/start'){
		this.chat = msg.chat.id;
		var dayGreet = true,
			nightGreet = true;
		setInterval(function () {
			var now  = new Date(),
				text = undefined;
			if (now.getHours() === 9 && dayGreet){
				text = 'Доброе утро, ' + Psihoterapia('Соня') + ' и ' + Psihoterapia('Алсу') + '\n' +
					'А также Никита, Денис и Тор, у которых пока нет психотерапии :(';
				bot.sendMessage(_this.chat,text);
				nightGreet = true;
				dayGreet = false
			}
			if(now.getHours() === 23 && nightGreet ){
				text = 'Спокойной ночи ' +Psihoterapia('Соня') + ' и ' + Psihoterapia('Алсу') + '\n' +
					'А также Никита, Денис и Тор, у которых пока нет психотерапии :(';
				bot.sendMessage(_this.chat,text);
				dayGreet = true;
				nightGreet = false;
			}
		},1000*60*60);
	}

});
