var application = {
    video_dir: 'video',

    celery: {
        title: 'Celery Man',
        sources: ['celery1', 'celery2', 'celery3', 'celery4'],
        progress: 0,
        isLoaded: false,
        renderer: function(app) {
            app.audioStop();
            app.audioStart('celery');

            if (!this.isLoaded) {
                this.isLoaded = true;

                this.sources.forEach(function(id) {
                    app.createDialog('#' + id);
                });
               
                // $window1.dialog('option', 'position.at', 'left+350 top+340');
                // $window2.dialog('option', 'position.at', 'left+40 top+200');
                // $window3.dialog('option', 'position.at', 'left+650 top+220');
                // $window4.dialog('option', 'position.at', 'left+290 top+50');
            }

            this.sources.forEach(function(id) {
                $('#' + id).show();
            });
        }
    },

    oyster: {
        title: 'OYSTER',
        sources: ['oyster1', 'oyster2', 'oyster3'],
        progress: 0,
        isLoaded: false,
        renderer: function(app) {
            app.audioStop();
            app.audioStart('celery');
            app.audioStart('oyster');

            if (!this.isLoaded) {
                this.isLoaded = true;

                this.sources.forEach(function(id) {
                    app.createDialog('#' + id);
                });
               
                // $window1.dialog('option', 'position.at', 'left+550 top+410');
                // $window2.dialog('option', 'position.at', 'left+40 top+100');
                // $window3.dialog('option', 'position.at', 'left+110 top+420');
                // $window4.dialog('option', 'position.at', 'left+380 top+50');
            }

            this.sources.forEach(function(id) {
                $('#' + id).show();
            });
        }
    },

    tayne: {
        title: 'Tayne',
        sources: ['tayne1', 'tayne2', 'tayne3', 'tayne4', 'tayne5'],
        progress: 0,
        isLoaded: false,
        renderer: function(app) {
            app.audioStop();
            app.audioStart('tayne');

            if (!this.isLoaded) {
                this.isLoaded = true;

                this.sources.forEach(function(id) {
                    app.createDialog('#' + id);
                });
               
                // $window1.dialog('option', 'position.at', 'left+630 top+410');
                // $window2.dialog('option', 'position.at', 'left+40 top+330');
                // $window3.dialog('option', 'position.at', 'left+150 top+40');
                // $window4.dialog('option', 'position.at', 'left+380 top+100');
                // $window5.dialog('option', 'position.at', 'left+710 top+50');
                // $window6.dialog('option', 'position.at', 'left+250 top+420');
            }

            this.sources.forEach(function(id) {
                $('#' + id).show();
            });
        }
    },

    mozza: {
        title: 'MOZZA-RELL',
        sources: ['mozza1', 'mozza2'],
        progress: 0,
        isLoaded: false,
        renderer: function(app) {
            app.audioStop();
            app.audioStart('celery');

            if (!this.isLoaded) {
                this.isLoaded = true;

                this.sources.forEach(function(id) {
                    app.createDialog('#' + id);
                });

                // $window1.dialog('option', 'position.at', 'left+260 top+450');
                // $window2.dialog('option', 'position.at', 'left+40 top+100');
                // $window3.dialog('option', 'position.at', 'left+600 top+150');
            }

            this.sources.forEach(function(id) {
                $('#' + id).show();
            });
        }
    },

    showSequence: function(sequence) {
        var that = this,
            sources = this[sequence].sources,
            renderer = this[sequence].renderer.bind(this[sequence]);

        var sequencer = function() {
            $("#window-welcome").hide();

            if (this[sequence].isLoaded) {
                return renderer(this);
            }

            $("#window-loader").show();

            sources.forEach(function(source) {
                that.buildVideo(sequence, source);
            });
        };

        return sequencer.bind(this);
    },

    buildVideo: function(sequence, source) {
        var filename = this.video_dir + '/' + source + '.mp4',
            title = this[sequence].title,
            video = document.createElement('video');

        video.src = filename;
        video.autoplay = true;
        video.loop = true;
        video.preload = 'auto';

        var launcher = function(e) {
            this.launchVideoWindow(sequence);
            video.removeEventListener('canplaythrough', launcher);
        }.bind(this);

        video.addEventListener('canplaythrough', launcher);

        this.buildVideoWindow(source, title, video);
    },
    buildVideoWindow: function(id, title, video) {
        var html = `
        <div class="window window-picture" id="${id}">
            <div class="window-titlebar">
                <button type="button" class="btn-close" title="Close"><i class="fa fa-2x fa-minus"></i></button>

                <span class="title">${title}</span>

                <button type="button" class="btn-move" title="Move"><i class="fa fa-2x fa-caret-up"></i></button>
                <button type="button" class="btn-move" title="Move"><i class="fa fa-2x fa-caret-down"></i></button>
            </div>
            <div class="window-content"></div>
        </div>
        `;

        var $window = $(html);

        $window
            .find('.window-content')
            .append(video);

        $window.appendTo('.desktop');
    },
    launchVideoWindow: function(sequence) {
        this[sequence].progress++;

        var total = this[sequence].sources.length,
            loaded = this[sequence].progress;

        if (loaded < total) {
            $("#window-loader progress").val(100 * loaded / total);

        } else {
            $("#window-loader progress").val(100);
            this.finishSequence(sequence);
        }
    },

    finishSequence: function(sequence) {
        var showIdentity = function() {
            this.resetLoader();
            this[sequence].renderer(this);
        };

        setTimeout(showIdentity.bind(this), 1000);
    },
    resetLoader: function() {
        var $loader = $("#window-loader");
        $loader.hide();
        $loader
            .find("progress")
            .val(10);
    },

    boot: function() {
        var $window = $('#window-welcome'),
            cinco = this.clickCinco.bind(this);
            original = this.clickOriginal,
            createDialog = this.createDialog.bind(this),
            dialogs = [
                '#window-welcome',
                '#window-loader',
                '#window-prompt',
                '#window-original'
            ];

        $('.icon-cinco').on('click', cinco);
        $('.icon-original').on('click', original);

        dialogs.forEach(createDialog);

        $window
            .find(".options")
            .hide();
        $window.show();

        this.loadWelcome($window);
    },

    loadWelcome: function($window) {
        var a = 10,
            $progress = $window.find("progress"),
            loading = function() {
                a += 10;
                $progress.val(a);

                if (a === 100) {
                    clearInterval(loading);
                    this.initialize();
                }
            };

        setInterval(loading.bind(this), 100);
    },

    initialize: function() {
        var $welcome = $('#window-welcome');

        $welcome.find('.progress').hide();
        $welcome.find('.options').show();
        $("#window-prompt").show();

        $("#option-celery").on('click', this.showSequence('celery'));
        $("#option-oyster").on('click', this.showSequence('oyster'));
        $("#option-tayne").on('click', this.showSequence('tayne'));
        $("#option-mozza").on('click', this.showSequence('mozza'));
    },

    audioStop: function() {
        $('#cinco-audio audio').trigger('pause');
    },
    audioStart: function(sequence) {
        $('#audio-' + sequence).trigger('play');
    },

    clickCinco: function() {
        $(".window").hide();
        $('#window-welcome').show();
        $('#window-prompt').show();
        this.stopEmbed();
        this.audioStop();
    },
    clickOriginal: function() {
        $('#window-original').show();
    },

    stopEmbed: function(e) {
        var iframe = document.querySelector('#window-original')
                .getElementsByTagName("iframe")[0]
                .contentWindow,
            youtubeArgs = {
                event: "command",
                func: "pauseVideo",
                args: ""
            };

        iframe.postMessage(JSON.stringify(youtubeArgs), '*');
    },

    createDialog: function(elem) {
        var $elem = $(elem),
            closeHandler = this.closeDialog.bind(this),
            options = {
                handle: '.window-titlebar'
            };

        $elem
            .draggabilly(options)
            .find('.btn-close')
            .on('click', closeHandler);

        return $elem;
    },
    closeDialog: function(event) {
        var $window = $(event.target).closest('.window');

        $window.hide();
        if ($window.attr('id') === 'window-original') {
            this.stopEmbed();
        }
    }
};
