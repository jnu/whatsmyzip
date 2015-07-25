export function getJSON(url, opts, callback) {
    // opts is optional
    if (!callback && typeof opts === 'function') {
        callback = opts;
        opts = null;
    }

    // Create query string and append to url
    if (opts) {
        url += '?';
        url += Object.keys(opts)
            .map(key => [key, opts[key]].map(encodeURIComponent).join('='))
            .join('&');
    }

    var req = new XMLHttpRequest();
    req.overrideMimeType('application/json; charset=utf-8');

    req.onreadystatechange = function() {
        if (req.readyState === 4) {
            if (req.status === 200) {
                callback(null, this.response);
            } else {
                callback(new Error('Error loading page'));
            }
        }
    };

    req.open('GET', url, true);
    req.responseType = 'json';
    req.send(null);
}
