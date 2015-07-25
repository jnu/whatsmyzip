import PositionClient from './PositionClient';

// Create a client for a geo name service API
var posClient = new PositionClient('joen');
var watchId;


/**
 * Start watching geo location. Report results as they are available.
 * @param  {Function} callback Function that accepts a place descriptor
 */
export function start(callback) {
    var geoOpts = {
        enableHighAccuracy: true,
        maximumAge: 5000,
        timeout: 60000
    };

    /**
     * Success callback for geo API
     * @param  {Position} position HTML5 position data object
     */
    function geoSuccess(position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;

        posClient.getNearestPosition(lat, long, function(error, data = {}) {
            callback({
                lat: lat.toFixed(5),
                long: long.toFixed(5),
                error: error,
                zip: data.postalCode || 'Unknown',
                place: PositionClient.formatPlaceName(data),
                distance: data.distance
            });
        });
    }

    /**
     * Error callback for geo API
     * @param  {PositionError} e
     */
    function geoError(e = {}) {
        callback({
            error: e.message || "Couldn't find your location."
        });
    }

    // start geo watcher
    watchId = navigator.geolocation.watchPosition(geoSuccess, geoError, geoOpts);
}

/**
 * Quit watching for location changes
 */
export function stop() {
    navigator.geolocation.clearWatch(watchId);
}
