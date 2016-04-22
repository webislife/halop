module.exports = function (msg, bot) {
	if(msg.from.username === this.userId && this.weather){
		if((msg.text || msg.location)) {
			requestUrl = undefined;
			if(msg.location){
				requestUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + msg.location.latitude +
					"&lon=" + msg.location.longitude +
					"&units=metric&APPID=12f31155bc369a43ba9fd8589a6fbb41";
			}
			else {
				var city = msg.text.replace('!погода ', ''),
					requestUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&APPID=12f31155bc369a43ba9fd8589a6fbb41"
			}
			request({
				url:requestUrl,
				json: true
			}, (error,response,body) => {
				if (!error && response.statusCode === 200) {
					bot.sendMessage(msg.chat.id,'Текущая температура ' + body.main.temp + ' °С,' +
						'\nМинимальная температура сегодня ' + body.main.temp_min + ' °С' +
						'\nМаксимальная температура сегодня ' + body.main.temp_max + ' °С');
					this.weather = false;
				}
			})
		}
	} else if(msg.text && msg.text.indexOf('!погода') != -1){
		this.userId = msg.from.username;
		this.weather = true;
		bot.sendMessage(msg.chat.id,'Отправьте свою геолокацию или укажите город на английском');
	}
} 