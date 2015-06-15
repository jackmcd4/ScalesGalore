var T = require(['node_modules/timbre/timbre.dev.js'], function (T) {
    //foo is now loaded.
    func();
});

var func = function(){

var freqs = T(function(count) {
  return [261.6, 277.2, 293.7, 311.1, 329.6, 349.2, 370.0, 392.0, 415.3, 440.0, 466.2, 493.9][count % 12];
});
var osc = T("sin", {freq:freqs, mul:0.5});
var env = T("perc", {a:50, r:500}, osc).bang();
$('.play').on('click', function(){
var interval = T("param", {value:500});
T("interval", {interval:interval, timeout:"5.5sec"}, freqs, env).start();
    env.play();  
})

}


var theory = require(['node_modules/MUSIC/index.js'], function (T) {
    //foo is now loaded.
    func2();
});

var func2 = function(){
    console.log(Note.fromLatin('A4').frequency())
}

