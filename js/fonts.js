var html = document.documentElement;

var fontsfile = document.createElement('link');
fontsfile.href = pathTemplate + 'css/fonts.css';
fontsfile.rel = 'stylesheet';
document.head.appendChild(fontsfile);

if (sessionStorage.fontsLoaded) {
    html.classList.add('fonts-loaded');
} else {
    var script = document.createElement('script');
    script.src = pathTemplate + 'js/fontfaceobserver.js';
    script.async = true;

    script.onload = function () {
        var Lato300 = new FontFaceObserver('Lato', {
            weight: '300'
        });
        var Lato300i = new FontFaceObserver('Lato', {
            weight: '300',
            style: 'italic'
        });
        var Lato400 = new FontFaceObserver('Lato', {
            weight: 'normal'
        });
        var Lato500 = new FontFaceObserver('Lato', {
            weight: '500'
        });
        var Lato600 = new FontFaceObserver('Lato', {
            weight: '600'
        });
        var Lato700 = new FontFaceObserver('Lato', {
            weight: 'bold'
        });
        var Lato900 = new FontFaceObserver('Lato', {
            weight: '900'
        });

        Promise.all([
            Lato300.load(),
            Lato300i.load(),
            Lato400.load(),
            Lato500.load(),
            Lato600.load(),
            Lato700.load(),
            Lato900.load()
        ]).then(function () {
            html.classList.add('fonts-loaded');
            sessionStorage.fontsLoaded = true;
        });
    };
    document.head.appendChild(script);
}