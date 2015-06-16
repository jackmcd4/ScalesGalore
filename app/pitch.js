var T = require(['node_modules/timbre/timbre.dev.js'], function (T) {
    //foo is now loaded.
    func();
});

var func = function(){
var theory = require(['node_modules/MUSIC/index.js'], function (T) {
    //foo is now loaded.
});


$('.M').on('click', function(){
    var n = ($(this).context.innerHTML);
    if(n.length>1){
        n = n.slice(0, 2);
    }
    n = n.concat('4');
    createScale(n, 'major');
})

$('.Nm').on('click', function(){
    var n = ($(this).context.innerHTML);
    if(n.length>1){
        n = n.slice(0, 2);
    }
    n = n.concat('4');
    createScale(n, 'natural minor');
})

$('.Hm').on('click', function(){
    var n = ($(this).context.innerHTML);
    if(n.length>1){
        n = n.slice(0, 2);
    }
    n = n.concat('4');
    createScale(n, 'harmonic minor');
})

$('.mp').on('click', function(){
    var n = ($(this).context.innerHTML);
    if(n.length>1){
        n = n.slice(0, 2);
    }
    n = n.concat('4');
    createScale(n, 'minor pentatonic');
})

$('.Mp').on('click', function(){
    var n = ($(this).context.innerHTML);
    if(n.length>1){
        n = n.slice(0, 2);
    }
    n = n.concat('4');
    createScale(n, 'major pentatonic');
})
    

$('.play').on('click', function(){
    playScale([261.6, 277.2, 293.7, 311.1, 329.6, 349.2, 370.0, 392.0, 415.3, 440.0, 466.2, 493.9, 523.2])
})


var createScale = function(note, type){
    var n = Note.fromLatin(note);
    var sc = n.scale(type);
    for(var i = 0; i < sc.length; i++){
        sc[i] = sc[i].frequency();
    }
    playScale(sc);
    return;
}

var playScale = function(scale){
    var freqs = T(function(count){
        return scale[count%scale.length];
    });
    var time = scale.length/2 - .5;
    time = time.toString() + "sec";
    var osc = T("sin", {freq:freqs, mul:0.5});
    var env = T("perc", {a:50, r:500}, osc).bang();
    var interval = T("param", {value:500});
    T("interval", {interval:interval, timeout:time}, freqs, env).start();
        env.play();  
    }


}