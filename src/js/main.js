import {start} from './geowatcher';

function displayPositionInfo(opts) {
    ['zip', 'lat', 'long', 'place', 'error', 'info'].forEach(function(key) {
        document.getElementById(key).innerText = opts[key] || '';
    });

    document.getElementById('coords').classList.toggle('hide', !(opts.lat && opts.long));
}

displayPositionInfo({
    info: 'Finding your location ...'
});

start(displayPositionInfo);
