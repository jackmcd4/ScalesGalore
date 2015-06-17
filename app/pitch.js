var T = require(['node_modules/timbre/timbre.dev.js'], function (T) {
    //Y is now loaded.
    func();
});

var func = function(){
var theory = require(['node_modules/MUSIC/index.js'], function (theory) {
    //theory is now loaded.
});

// var vex = require(['node_modules/vextab/releases/vextab-div.js'], function (vex) {
//     //theory is now loaded.
// });

var Staff = function(){
$('.vex-tabdiv').text("options space=20\ntabstave\nnotation=true tablature=false\nnotes C-D-E-F-G-A-B/4 C/5");
}();

var changeStaff = function(n){
    var vex = require(['node_modules/vextab/releases/vextab-div.js'], function (vex) {
    //theory is now loaded.
});
    $('.vex-tabdiv').empty().text("options space=20\ntabstave\nnotation=true tablature=false\nnotes "+n)
}


// var vex = require(["node_modules/vexflow/releases/vexflow-min.js"], function(){

// });

//   var canvas = $("div.one div.one canvas")[0];
//   var renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);
//   var ctx = renderer.getContext();
//   var stave = new Vex.Flow.Stave(10, 0, 500);
//   stave.addClef("treble").setContext(ctx).draw();





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

$('.Mm').on('click', function(){
    var n = ($(this).context.innerHTML);
    if(n.length>1){
        n = n.slice(0, 2);
    }
    n = n.concat('4');
    createScale(n, 'melodic minor');
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
    
$('.Marp').on('click', function(){
    var n = ($(this).context.innerHTML);
    if(n.length>1){
        n = n.slice(0, 2);
    }
    n = n.concat('4');
    createScale(n, 'major arpeggio');
})

$('.marp').on('click', function(){
    var n = ($(this).context.innerHTML);
    if(n.length>1){
        n = n.slice(0, 2);
    }
    n = n.concat('4');
    createScale(n, 'minor arpeggio');
})

$('.Darp').on('click', function(){
    var n = ($(this).context.innerHTML);
    if(n.length>1){
        n = n.slice(0, 2);
    }
    n = n.concat('4');
    createScale(n, 'diminished arpeggio');
})

$('.W').on('click', function(){
    var n = ($(this).context.innerHTML);
    if(n.length>1){
        n = n.slice(0, 2);
    }
    n = n.concat('4');
    createScale(n, 'whole tone');
})

$('.play').on('click', function(){
    playScale([261.6, 277.2, 293.7, 311.1, 329.6, 349.2, 370.0, 392.0, 415.3, 440.0, 466.2, 493.9, 523.2])
})

    var createScale = function(note, type){
        if(type==='major'){
            findKey(note, type);
        }
        var n = Note.fromLatin(note);
        var wholeStep = Interval.fromSemitones(2);
        if(type.split(' ')[1] === 'tone'){
            var sc = [n]
            for(var i = 1; i < 7; i++){
                sc[i] = sc[i-1].add(wholeStep)
            }
        }else{
            var sc = n.scale(type);
        }
        for(var i = 0; i < sc.length; i++){
            sc[i] = sc[i].frequency();
        }
        if(type.split(' ')[1] === 'arpeggio'){
            sc.splice(sc.length-1, 1);
        }
        else{
           var rev = sc.slice()
            sc = sc.concat(rev.reverse());
        }
        playScale(sc);
        return;
    }

    var findKey = function(note, type){

       var note = note.split('');
       if(note[1]==="#"){
        note = note.join('').slice(0, 2);
       }else{
        note = note.join('').slice(0, 1);
       }
       console.log(note)

       var Maj = {"A#":"B@/4 C-D-E@-F-G-A-B@/5",
       "A":"A-B/4 C#-D-E-F#-G#-A/5",
       "B":"B/3 C#-D#-E-F#-G#-A#-B/4",
       "C":"C-D-E-F-G-A-B/4 C/5",
       "C#":"C#-D#-E#-F#-G#-A#-B/4 C#/5",
       "D":"D-E-F#-G-A-B/4 C#-D/5",
       "D#":"Eb-F-G-A@-B@/4 C-D-Eb/5",
       "E":"E-F#-G#-A-B/4 C#-D#-E/5",
       "F":"F-G-A-Bb/4 C-D-E-F/5",
       "F#":"F#-G#-A#-B#/4 C#-D#-E#-F#/5",
       "G":"G-A-B/4 C-D-E-F#-G/5"
   }
       var Mmin = {}
       var Hmin = {}
       var Nmin = {}
       console.log(Maj[note])
       changeStaff(Maj[note])
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