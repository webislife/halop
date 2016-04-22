var request = require("request");

module.exports = function (msg, bot) {
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