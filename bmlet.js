javascript: (function() {
    if (location.href.indexOf('https://www.google.com/maps/') != -1) {
        if (!($ = window.jQuery)) {
            script = document.createElement('script');
            script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
            script.onload = releasetheKraken;
            document.body.appendChild(script);
        } else {
            releasetheKraken();
        }

        function releasetheKraken() {
            document.body.appendChild(document.createElement('script')).src = 'https://dl.dropboxusercontent.com/u/11819416/frog/annualreport.js';
            document.body.appendChild(document.createElement('script')).src = 'https://dl.dropboxusercontent.com/u/11819416/citibike/route.js';
        }
    }
})();