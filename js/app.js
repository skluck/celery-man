var application = {
    video_dir: 'video',

    celery: {
        title: 'Celery Man',
        windows: [
            { id: 'celery1', position: { top: '15%', left: '5%' } },
            { id: 'celery2', position: { top: '20%', left: '45%' } },
            { id: 'celery3', position: { top: '40%', left: '25%' } },
            { id: 'celery4', position: { top: '10%', left: '65%' } }
        ],
        progress: 0,
        loaded: [],
        renderer: function(app) {
            app.audioStop();
            app.audioStart('celery');

            if (this.loaded.length === 0) {
                this.loaded = this.windows.map(source => app.createVideoWindow(source));
            }

            this.loaded.forEach(win => win.style.display = 'block');

            document
                .querySelector('#window-prompt .window-content')
                .innerHTML = '4d3d3d3 Engaged.';
        }
    },

    oyster: {
        title: 'OYSTER',
        windows: [
            { id: 'oyster1', position: { top: '10%', left: '25%' } },
            { id: 'oyster2', position: { top: '25%', left: '5%' } },
            { id: 'oyster3', position: { top: '40%', left: '45%' } }
        ],
        progress: 0,
        loaded: [],
        renderer: function(app) {
            app.audioStop();
            app.audioStart('celery');
            app.audioStart('oyster');

            if (this.loaded.length === 0) {
                this.loaded = this.windows.map(source => app.createVideoWindow(source));
            }

            this.loaded.forEach(win => win.style.display = 'block');

            document
                .querySelector('#window-prompt .window-content')
                .innerHTML = 'add sequence: OYSTER';
        }
    },

    tayne: {
        title: 'Tayne',
        windows: [
            { id: 'tayne1', position: { top: '20%', left: '35%' } },
            { id: 'tayne2', position: { top: '35%', left: '65%' } },
            { id: 'tayne3', position: { top: '10%', left: '5%' } },
            { id: 'tayne4', position: { top: '25%', left: '20%' } },
            { id: 'tayne5', position: { top: '5%', left: '50%' } }
        ],
        progress: 0,
        loaded: [],
        renderer: function(app) {
            app.audioStop();
            app.audioStart('tayne');

            if (this.loaded.length === 0) {
                this.loaded = this.windows.map(source => app.createVideoWindow(source));
            }

            this.loaded.forEach(win => win.style.display = 'block');

            document
                .querySelector('#window-prompt .window-content')
                .innerHTML = 'I have a BETA sequence I have been working on';
        }
    },

    mozza: {
        title: 'MOZZA-RELL',
        windows: [
            { id: 'mozza1', position: { top: '10%', left: '5%' } },
            { id: 'mozza2', position: { top: '30%', left: '35%' } }
        ],
        progress: 0,
        loaded: [],
        renderer: function(app) {
            app.audioStop();
            app.audioStart('celery');

            if (this.loaded.length === 0) {
                this.loaded = this.windows.map(source => app.createVideoWindow(source));
            }

            this.loaded.forEach(win => win.style.display = 'block');

            document
                .querySelector('#window-prompt .window-content')
                .innerHTML = 'Good morning Paul.';
        }
    },

    showSequence: function(sequence) {
        var windows = this[sequence].windows,
            renderer = this[sequence].renderer.bind(this[sequence]);

        var sequencer = function() {
            this.embedStop();
            this.hide('#window-original');
            this.hide('#window-welcome');

            if (this[sequence].isLoaded) {
                return renderer(this);
            }

            this.show('#window-loader');

            windows.forEach(source => this.buildVideo(sequence, source.id));
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
        var titlebar = `
            <div class="window-titlebar">
                <button type="button" class="btn-close" title="Close"><i class="fa fa-2x fa-minus"></i></button>

                <span class="title">${title}</span>

                <button type="button" class="btn-move" title="Move"><i class="fa fa-2x fa-caret-up"></i></button>
                <button type="button" class="btn-move" title="Move"><i class="fa fa-2x fa-caret-down"></i></button>
            </div>
        `;

        var win = document.createElement('div')
        win.id = id;
        win.className = 'window window-video';
        win.innerHTML = titlebar;
        win.insertAdjacentElement('beforeend', video);

        document
            .getElementById('desktop')
            .insertAdjacentElement('beforeend', win);
    },
    launchVideoWindow: function(sequence) {
        this[sequence].progress++;

        var total = this[sequence].windows.length,
            loaded = this[sequence].progress,
            percentage = (loaded < total) ? 100 * loaded / total : 100;

        document.querySelector('#window-loader progress').value = percentage;

        if (loaded >= total) {
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
        this.hide('#window-loader');
        document.querySelector('#window-loader progress').value = 10;
    },

    boot: function() {
        var windows = [
                'window-welcome',
                'window-loader',
                'window-prompt',
                'window-original'
            ];

        document.querySelector('.icon-cinco')
            .addEventListener('click', event => this.clickCinco(event));
        document
            .querySelector('.icon-original')
            .addEventListener('click', event => this.clickOriginal(event));

        windows.forEach(win => this.createWindow(win));

        this.hide('#window-welcome .options');
        this.show('#window-welcome');

        this.loadWelcome();
    },

    loadWelcome: function() {
        var a = 10,
            progress = document.
                getElementById('window-welcome')
                .querySelector('progress'),
            loading = function(app) {
                a += 10;
                progress.value = a;

                if (a === 100) {
                    clearInterval(loading);
                    app.initialize();
                }
            };

        setInterval(() => loading(this), 100);
    },

    initialize: function() {
        this.hide('#window-welcome .progress');
        this.show('#window-welcome .options');
        this.show('#window-prompt');

        var showSequence = this.showSequence.bind(this);

        ['celery', 'oyster', 'tayne', 'mozza']
            .forEach(source => this.addClicker(source));
    },
    addClicker: function(source) {
        document
            .getElementById('option-' + source)
            .addEventListener('click', this.showSequence(source));
    },

    clickCinco: function() {
        this.hide('.window');
        this.show('#window-welcome');
        this.show('#window-prompt');

        document
            .querySelector('#window-prompt .window-content')
            .innerHTML = 'Good morning Paul.';

        this.embedStop();
        this.audioStop();
    },
    clickOriginal: function() {
        this.clickCinco();
        this.show('#window-original');
        this.embedStart();
    },

    embedStart: function(e) {
        var youtubeArgs = { event: 'command', func: 'playVideo', args: '' },
            iframe = document.querySelector('#window-original')
                .getElementsByTagName('iframe')[0]
                .contentWindow;

        iframe.postMessage(JSON.stringify(youtubeArgs), '*');
    },
    embedStop: function(e) {
        var youtubeArgs = { event: 'command', func: 'pauseVideo', args: '' },
            iframe = document.querySelector('#window-original')
                .getElementsByTagName('iframe')[0]
                .contentWindow;

        iframe.postMessage(JSON.stringify(youtubeArgs), '*');
    },
    audioStop: function() {
        document
            .querySelectorAll('#cinco-audio audio')
            .forEach(elem => elem.pause());
    },
    audioStart: function(sequence) {
        document
            .getElementById('audio-' + sequence)
            .play();
    },

    createVideoWindow: function(source) {
        var win = this.createWindow(source.id);
        for (var coord in source.position) {
            win.style[coord] = source.position[coord];
        }

        return win;
    },
    createWindow: function(id) {
        var elem = document.getElementById(id),
            closeHandler = this.closeDialog.bind(this),
            options = {
                handle: '.window-titlebar'
            };

        new Draggabilly(elem, options);

        elem
            .querySelector('.btn-close')
            .addEventListener('click', closeHandler);

        return elem;
    },
    closeDialog: function(event) {
        var elem = event.target,
            win = elem.parentElement.parentElement.parentElement;

        win.style.display = 'none';
        if (win.matches('#window-original')) {
            this.embedStop();
        }
    },

    hide: function(selector) {
        document
        .querySelectorAll(selector)
        .forEach(elem => elem.style.display = 'none');
    },
    show: function(selector) {
        document
        .querySelectorAll(selector)
        .forEach(elem => elem.style.display = 'block');
    }
};
