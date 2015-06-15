var parse = require('music-parser');

var T = require('timbre');

T("sin", {freq:880, mul:0.5}).play();   

var BD;

T("audio").load("./drumkit.wav", function() {
    drum = T("lowshelf", {freq:110, gain:8, mul:0.6}, BD).play()
    BD = this.slice(0,  500).set({bang:false})
})
