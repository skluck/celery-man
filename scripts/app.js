
var page = {
    image_sources: {
        celery: [
            "5.gif",
            "6.gif",
            "7.gif",
            "8.gif"
        ],
        oyster: [
            "9.gif",
            "10.gif",
            "11.gif",
            "12.png"
        ],
        tayne: [
            "13.gif",
            "14.gif",
            "15.gif",
            "16.gif",
            "17.gif",
            "18.png"
        ],
        mozza: [
            "19.gif",
            "20.gif",
            "21.png"
        ]
    },
    image_prefix: '/images/',
    loaded_images: {
        celery: 0,
        oyster: 0,
        tayne: 0,
        mozza: 0
    },
    module_is_loaded: {
        celery: false,
        oyster: false,
        tayne: false,
        mozza: false
    },
    load_module: function(sequence) {
        var renderer = this.render[sequence].bind(this);

        if (this.module_is_loaded[sequence]) return renderer();

        var sources = this.image_sources[sequence],
            loaded = this.loaded_images[sequence];

        $("#window--loader").dialog({
            width: "auto",
            height: "auto",
        });

        $("#window--loader").parent().show();
        var windows = $(".windows");

        for (g = 0; g < sources.length; g++) {
            var h = document.createElement("img");
            h.src = this.image_prefix + sequence + sources[g],

            h.style.display = "hidden";
            h.onload = function(g) {
                return function() {
                    loaded++;
                    var identifier = sequence + sources[g].slice(0, -4);
                    console.log(identifier);
                    $('<div class="window--picture" id="' + identifier + '"><img src="' + this.src + '"></div>').appendTo(windows);

                    if (loaded == sources.length) {
                        $("#window--loader progress").val(100);
                        setTimeout(function() {
                            $("#window--loader").parent().hide();
                            $("#window--loader progress").val(10);
                            renderer();
                        }, 1e3);
                    } else {
                        $("#window--loader progress").val(100 * loaded / sources.length);
                    }
                }
            }(g);
        }
    },
    render: {
        celery: function() {
            var windows = $("#celery5, #celery6, #celery7, #celery8");
            if (this.module_is_loaded['celery']) {
                audio.stop();
                audio.toggleLoop("celery");

                windows.parent().show();
            } else {
                windows.dialog({
                    height: "auto",
                    width: "auto",
                    title: 'Celery Man',
                    resizable: false
                });

                $("#celery5").parent().css({
                    top: "340px",
                    left: "350px"
                });
                $("#celery6").parent().css({
                    top: "200px",
                    left: "40px"
                });
                $("#celery7").parent().css({
                    top: "220px",
                    left: "650px"
                });
                $("#celery8").parent().css({
                    top: "50px",
                    left: "290px"
                });

                audio.stop();
                audio.toggleLoop("celery");

                this.module_is_loaded['celery'] = true;
            }
        },
        oyster: function() {
            var windows = $("#oyster9, #oyster10, #oyster11, #oyster12");

            if (this.module_is_loaded['oyster']) {
                audio.stop();
                audio.toggleLoop("celery");
                audio.toggleLoop("oyster");

                windows.parent().show();
            } else {
                windows.dialog({
                    height: "auto",
                    width: "auto",
                    title: 'OYSTER',
                    resizable: false
                });

                $("#oyster9").parent().css({
                    top: "410px",
                    left: "550px"
                });
                $("#oyster10").parent().css({
                    top: "100px",
                    left: "40px"
                });
                $("#oyster11").parent().css({
                    top: "420px",
                    left: "110px"
                });
                $("#oyster12").parent().css({
                    top: "50px",
                    left: "380px"
                });

                audio.stop();
                audio.toggleLoop("celery");
                audio.toggleLoop("oyster");

                this.module_is_loaded['oyster'] = true;
            }
        },
        tayne: function() {
            var windows = $("#tayne13, #tayne14, #tayne15, #tayne16, #tayne17, #tayne18");

            if (this.module_is_loaded['tayne']) {
                audio.stop();
                audio.toggleLoop("tayne");

                windows.parent().show();
            } else {
                windows.dialog({
                    height: "auto",
                    width: "auto",
                    title: 'Tayne',
                    resizable: false
                });

                $("#tayne13").parent().css({
                    top: "410px",
                    left: "630px"
                });
                $("#tayne14").parent().css({
                    top: "330px",
                    left: "40px"
                });
                $("#tayne15").parent().css({
                    top: "40px",
                    left: "150px"
                });
                $("#tayne16").parent().css({
                    top: "100px",
                    left: "380px"
                });
                $("#tayne17").parent().css({
                    top: "50px",
                    left: "710px"
                });
                $("#tayne18").parent().css({
                    top: "420px",
                    left: "250px"
                });

                audio.stop();
                audio.toggleLoop("tayne");

                this.module_is_loaded['tayne'] = true;
            }
        },
        mozza: function() {
            var windows = $("#mozza19, #mozza20, #mozza21");

            if (this.module_is_loaded['mozza']) {
                audio.stop();
                audio.toggleLoop("celery");

                windows.parent().show();
            } else {
                windows.dialog({
                    height: "auto",
                    width: "auto",
                    title: 'MOZZA-RELL',
                    resizable: false
                });

                $("#mozza19").parent().css({
                    top: "450px",
                    left: "260px"
                });
                $("#mozza20").parent().css({
                    top: "100px",
                    left: "40px"
                });
                $("#mozza21").parent().css({
                    top: "150px",
                    left: "600px"
                });

                audio.stop();
                audio.toggleLoop("celery");

                this.module_is_loaded['mozza'] = true;
            }
        }
    }
};

audio.run();

$(window).load(function() {
    $("#window--welcome").dialog({
        width: "auto",
        height: "auto",
        resizable: false
    });

    var a = 10;
    var b = setInterval(function() {
        a += 10;
        $("#window--welcome progress").val(a);

        if (a < 100) {
            return;
        }

        clearInterval(b);

        $("#window--welcome .progress").hide();
        $("#window--welcome .options").show();

        $("#window--prompt").dialog({
            width: "auto",
            height: "auto",
            position: {my: "left bottom", at: "left+5% bottom-5%"},
            resizable: false
        });

        $("#option--celery").click(function() {
            page.load_module("celery"),
            $("#window--welcome").parent().hide();
        });
        $("#option--oyster").click(function() {
            page.load_module("oyster"),
            $("#window--welcome").parent().hide();
        });
        $("#option--tayne").click(function() {
            page.load_module("tayne"),
            $("#window--welcome").parent().hide();
        });
        $("#option--mozza").click(function() {
            page.load_module("mozza"),
            $("#window--welcome").parent().hide();
        });

        $("#desktop--cinco").click(function() {
            audio.stop();
            $(".ui-dialog").hide();
            $("#window--welcome, #window--prompt").parent().show();
        });

        $("#desktop--original").click(function() {
            $("#window--original").dialog({
                width: "auto",
                height: "auto",
                close: function() {
                    var iframe = document.getElementById("window--original").getElementsByTagName("iframe")[0].contentWindow;
                    iframe.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
                },
                resizable: false
            })
        });
    }, 100);
});
