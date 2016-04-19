var Likes = {};
module.exports = function (name) {
    if(Likes[name]) {
        Likes[name]++;
    } else {
        Likes[name] = 1;
    }
    return Likes[name];
}