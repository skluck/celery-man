var application = {
    sources: {
        celery: ["5.gif",   "6.gif",  "7.gif",  "8.gif"],
        oyster: ["9.gif",  "10.gif", "11.gif", "12.png"],
        tayne:  ["13.gif", "14.gif", "15.gif", "16.gif", "17.gif", "18.png"],
        mozza:  ["19.gif", "20.gif", "21.png"]
    },
    image_prefix: '/images/',
    titles: {
        celery: 'Celery Man',
        oyster: 'OYSER',
        tayne: 'Tayne',
        mozza: 'MOZZA-RELL'
    },
    loaded: {
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

    show_sequence: function(sequence) {
        var sources = this.sources[sequence],
            renderer = this.render[sequence].bind(this);

        var func = function() {
            if (this.module_is_loaded[sequence]) {
                $("#window--welcome").dialog('close');
                return renderer();
            }

            $("#window--welcome").dialog('close');
            $("#window--loader").dialog('open');

            for (index = 0; index < sources.length; index++) {
                var identifier = sequence + sources[index].slice(0, -4);

                var img = new Image();
                img.src = this.image_prefix + sequence + sources[index];
                img.onload = this.picture_loader(sequence, identifier, img);
            }
        };

        return func.bind(this);
    },

    load_sequence: function(sequence) {
        var renderer = this.render[sequence].bind(this);

        var showIdentity = function() {
            $("#window--loader").dialog('close');
            $("#window--loader progress").val(10);
            renderer();
        };

        setTimeout(showIdentity, 1000);
    },

    picture_loader: function(sequence, identifier, img) {
        var total = this.sources[sequence].length,
            title = this.titles[sequence];

        var func = function() {
            this.loaded[sequence]++;
            var loaded = this.loaded[sequence];

            console.log('Loaded: ' + identifier);

            $('<div></div>')
                .attr('id', identifier)
                .attr('title', title)
                .addClass('window window--picture')
                .append(img)
                .appendTo('.windows');

            if (loaded < total) {
                $("#window--loader progress").val(100 * loaded / total);

            } else {
                $("#window--loader progress").val(100);
                this.load_sequence(sequence);
            }
        };

        return func.bind(this);
    },

    render: {
        celery: function() {
            var $window1 = $('#celery5'),
                $window2 = $('#celery6'),
                $window3 = $('#celery7'),
                $window4 = $('#celery8'),
                $windows = $($window1)
                    .add($window2)
                    .add($window3)
                    .add($window4);

            audio.stop();
            audio.toggleLoop("celery");

            if (!this.module_is_loaded['celery']) {
                this.module_is_loaded['celery'] = true;
                this.dialogize($windows, {my: "left top"}); 

                $window1.dialog('option', 'position.at', "left+350 top+340");    
                $window2.dialog('option', 'position.at', "left+40 top+200");    
                $window3.dialog('option', 'position.at', "left+650 top+220");    
                $window4.dialog('option', 'position.at', "left+290 top+50");    
            }
            
            $windows.dialog('open');

        },
        oyster: function() {
            var $window1 = $('#oyster9'),
                $window2 = $('#oyster10'),
                $window3 = $('#oyster11'),
                $window4 = $('#oyster12'),
                $windows = $($window1)
                    .add($window2)
                    .add($window3)
                    .add($window4);

            audio.stop();
            audio.toggleLoop("celery");
            audio.toggleLoop("oyster");

            if (!this.module_is_loaded['oyster']) {
                this.module_is_loaded['oyster'] = true;
                this.dialogize($windows, {my: "left top"}); 

                $window1.dialog('option', 'position.at', "left+550 top+410");     
                $window2.dialog('option', 'position.at', "left+40 top+100");     
                $window3.dialog('option', 'position.at', "left+110 top+420");     
                $window4.dialog('option', 'position.at', "left+380 top+50");     
            }

            $windows.dialog('open');
        },
        tayne: function() {
            var $window1 = $('#tayne13'),
                $window2 = $('#tayne14'),
                $window3 = $('#tayne15'),
                $window4 = $('#tayne16'),
                $window5 = $('#tayne17'),
                $window6 = $('#tayne18'),
                $windows = $($window1)
                    .add($window2)
                    .add($window3)
                    .add($window4)
                    .add($window5)
                    .add($window6);

            audio.stop();
            audio.toggleLoop("tayne");

            if (!this.module_is_loaded['tayne']) {
                this.module_is_loaded['tayne'] = true;
                this.dialogize($windows, {my: "left top"});

                $window1.dialog('option', 'position.at', "left+630 top+410");  
                $window2.dialog('option', 'position.at', "left+40 top+330");  
                $window3.dialog('option', 'position.at', "left+150 top+40");  
                $window4.dialog('option', 'position.at', "left+380 top+100");  
                $window5.dialog('option', 'position.at', "left+710 top+50");  
                $window6.dialog('option', 'position.at', "left+250 top+420");  
            }

            $windows.dialog('open');
        },
        mozza: function() {
            var $window1 = $('#mozza19'),
                $window2 = $('#mozza20'),
                $window3 = $('#mozza21'),
                $windows = $($window1)
                    .add($window2)
                    .add($window3);

            audio.stop();
            audio.toggleLoop("celery");

            if (!this.module_is_loaded['mozza']) {
                this.module_is_loaded['mozza'] = true;
                this.dialogize($windows, {my: "left top"});

                $window1.dialog('option', 'position.at', "left+260 top+450");      
                $window2.dialog('option', 'position.at', "left+40 top+100");      
                $window3.dialog('option', 'position.at', "left+600 top+150");      
            }

            $windows.dialog('open');
        }
    },

    boot: function() {
        var $standard = $("#window--welcome, #window--loader"),
            $prompt = $('#window--prompt');
            $original = $('#window--original');

        this.dialogize($standard);
        this.dialogize($original);
        this.dialogize($prompt, {my: "left bottom", at: "left+5% bottom-5%"});

        $original.dialog('option', 'close', function() {
            var iframe = document.getElementById("window--original").getElementsByTagName("iframe")[0].contentWindow;
            iframe.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        });

        $("#window--welcome").dialog('open');
    },

    initialize: function() {
        $("#window--welcome .progress").hide();
        $("#window--welcome .options").show();
        $("#window--prompt").dialog('open');

        $("#option--celery").click(this.show_sequence('celery'));
        $("#option--oyster").click(this.show_sequence('oyster'));
        $("#option--tayne").click(this.show_sequence('tayne'));
        $("#option--mozza").click(this.show_sequence('mozza'));

        $("#desktop--cinco").click(function() {
            audio.stop();
            $(".window").dialog('close');
            $("#window--welcome, #window--prompt").dialog('open');
        });

        $("#desktop--original").click(function() {
            $("#window--original").dialog('open').dialog('moveToTop');
        });
    },

    dialogize: function($elem, position) {
        var defaults = {
            width: "auto",
            height: "auto",
            resizable: false,
            autoOpen: false
        };

        if (position) {
            defaults.position = position;

        }

        $elem.dialog(defaults);
    }
};

audio.run();

$(window).load(function() {

    application.boot();
    var initializer = application.initialize.bind(application);

    var a = 10;
    var b = setInterval(function() {
        a += 10;
        $("#window--welcome progress").val(a);

        if (a < 100) {
            return;
        }

        clearInterval(b);
        initializer();
        
    }, 100);
});
