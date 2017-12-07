// @flow

const stations = require('../dump/stations.js');

// Find station position on certain track
// Returns undefined if no such track exists on the station
function getTrackOfStation (station: Object, trackId: String): Object {
    return station.muutRatakmsijainnit.find(track => {
        return track.ratanumero === trackId;
    });
}

// Find common trackId from two different stations
function getCommonTrackOfStations (stationA: Object, stationB: Object): Object {
    return stationA.muutRatakmsijainnit.find(locationA => {
        return stationB.muutRatakmsijainnit.some(locationB => {
            return locationB.ratanumero === locationA.ratanumero;
        });
    }).ratanumero;
}

// Calculate route distance from the station array given
function calculateDistance(routePlan: Array<Object>) {
    if(routePlan.length < 2) return 0;

    let distance = 0;

    for(planIndex = 0; planIndex < routePlan.length - 1; planIndex++) {
        const currentStation    = routePlan[planIndex];
        const nextStation       = routePlan[planIndex + 1];

        const commonTrack       = getCommonTrackOfStations(currentStation, nextStation);

        const trackPosA         = getTrackOfStation(currentStation, commonTrack).ratakm;
        const trackPosB         = getTrackOfStation(nextStation, commonTrack).ratakm;

        const diff              = Math.abs(trackPosA - trackPosB);

        distance                += diff;
    }
    
    console.log(routePlan.map(station => station.lyhenne), distance);
    return distance;
}





// TESTING

calculateDistance([stations.Hki, stations.Tl, stations.Tku])
calculateDistance([stations.Hl, stations.Tl, stations.Tku])
calculateDistance([stations.Hki, stations.Tl, stations.Tpe])
