var request = require("request");

module.exports = function (msg, bot) {
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