import {getJSON} from './ajax';
import defer from './defer';

export default class PositionClient {

    constructor(user='', root_='http://api.geonames.org/findNearbyPostalCodesJSON') {
        this.root = root_;
        this.user = user;
        this._cache = {};
    }

    static formatPlaceName(position) {
        return [
            position.placeName,
            position.adminName2,
            position.adminName1,
            position.countryCode
        ].filter(x => !!x).join(', ');
    }

    getNearestPositions(lat, long, callback) {
        var cache = this._cache;
        const id = '' + lat + ',' + long;

        if (cache.hasOwnProperty(id)) {
            defer(callback, null, cache[id]);
        } else {
            let apiParams = {
                lat: lat,
                lng: long,
                username: this.user
            };
            getJSON(this.root, apiParams, function(err, data) {
                if (err) {
                    callback(err);
                } else {
                    let positions = data.postalCodes;
                    let status = data.status && data.status.message;
                    if (positions) {
                        cache[id] = positions;
                    }
                    callback(status, positions);
                }
            });
        }
    }

    getNearestPosition(lat, long, callback) {
        this.getNearestPositions(lat, long, function(err, positions) {
            var nearest = null;

            if (positions) {
                let sorted = positions.sort(function(a, b) {
                    return a.distance < b.distance ? -1 : 1;
                });

                nearest = sorted[0];
            }

            callback(err, nearest);
        });
    }

}
