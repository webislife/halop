var Likes = {};
function SetLike (name) {
    if(Likes[name]) {
        Likes[name]++;
    } else {
        Likes[name] = 1;
    }
    return Likes[name];
}
module.exports = function (msg, bot) {
	var name = msg.text.replace('!+1 ', '');
	bot.sendMessage(msg.chat.id, name+', +1 :) Счет:'+SetLike(name));
}