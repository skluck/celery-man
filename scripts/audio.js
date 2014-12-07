var audio = {
    buffer: {},
    compatibility: {},
    files: [
        "sound/celery.wav",
        "sound/oyster.wav",
        "sound/tayne.wav"
    ],
    mapping: {
        celery: 0,
        oyster: 1,
        tayne: 2
    },
    proceed: !0,
    source_loop: {},
    source_once: {}
};

audio.findSync = function(a) {
    var b = 0,
        c = 0,
        d = 0;
    for (var e in audio.source_loop) {
        c = audio.source_loop[e]._startTime,
        c > 0 && (b > c || 0 === b) && (b = c);
    }

    return audio.context.currentTime > b && (d = (audio.context.currentTime - b) % audio.buffer[a].duration), d
},

audio.play = function(a) {
    if (audio.source_loop[a] && audio.source_loop[a]._playing) {
        audio.stop(a);
    } else {
        audio.source_loop[a] = audio.context.createBufferSource(),
        audio.source_loop[a].buffer = audio.buffer[a],
        audio.source_loop[a].loop = !0,
        audio.source_loop[a].connect(audio.context.destination);

        var b = audio.findSync(a);

        audio.source_loop[a]._startTime = audio.context.currentTime,
        "noteOn" === audio.compatibility.start ? (
            audio.source_once[a] = audio.context.createBufferSource(),
            audio.source_once[a].buffer = audio.buffer[a],
            audio.source_once[a].connect(audio.context.destination),
            audio.source_once[a].noteGrainOn(0, b, audio.buffer[a].duration - b),
            audio.source_loop[a][audio.compatibility.start](
                audio.context.currentTime + (audio.buffer[a].duration - b)
            )
        ) : (
            audio.source_loop[a][audio.compatibility.start](0, b)
        ),
        audio.source_loop[a]._playing = !0
    }
},

audio.toggleLoop = function(a) {
    var b = parseInt(this.mapping[a] + 1);
    audio.play(b)
},

audio.stop = function() {
    for (var a = 0; a < audio.files.length + 1; a++) {
        try {
            audio.source_loop[a] &&
            audio.source_loop[a]._playing &&
            (
                audio.source_loop[a][audio.compatibility.stop](0),
                audio.source_loop[a]._playing = !1,
                audio.source_loop[a]._startTime = 0,
                "noteOn" === audio.compatibility.start && audio.source_once[a][audio.compatibility.stop](0)
            )
        } catch (b) {}
    }
},

audio.run = function() {
    try {
        window.AudioContext = window.AudioContext || window.webkitAudioContext,
        audio.context = new window.AudioContext
    } catch (a) {
        audio.proceed = !1, alert("Web Audio API not supported in this browser.")
    }

    if (audio.proceed) {
        ! function() {
            var a = "start",
                b = "stop",
                c = audio.context.createBufferSource();
            "function" != typeof c.start && (a = "noteOn"),
            audio.compatibility.start = a,
            "function" != typeof c.stop && (b = "noteOff"),
            audio.compatibility.stop = b
        }();

        for (var b in audio.files)! function() {
            var a = parseInt(b) + 1,
                c = new XMLHttpRequest;

            c.open("GET", audio.files[a - 1], !0),
            c.responseType = "arraybuffer",
            c.onload = function() {
                audio.context.decodeAudioData(
                    c.response,
                    function(b) {
                        audio.buffer[a] = b, audio.source_loop[a] = {}
                    },
                    function() {
                        console.log('Error decoding audio "' + audio.files[a - 1] + '".')
                    }
                )
            }, c.send()
        }()
    }
};
