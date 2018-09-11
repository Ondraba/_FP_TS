import * as React from 'react';
import {Theme, withStyles} from '@material-ui/core';
import {GoogleMap as GoogleMapOriginal, Marker, withGoogleMap, withScriptjs} from 'react-google-maps';

interface Props {
    position: {
        lat: number;
        lng: number;
    };
    zoom: number;
}

const styles = [
    {
        elementType: 'geometry',
        stylers: [
            {
                color: '#f5f5f5',
            },
        ],
    },
    {
        elementType: 'labels.icon',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#616161',
            },
        ],
    },
    {
        elementType: 'labels.text.stroke',
        stylers: [
            {
                color: '#f5f5f5',
            },
        ],
    },
    {
        featureType: 'administrative.land_parcel',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#bdbdbd',
            },
        ],
    },
    {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [
            {
                color: '#eeeeee',
            },
        ],
    },
    {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#757575',
            },
        ],
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [
            {
                color: '#e5e5e5',
            },
        ],
    },
    {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#9e9e9e',
            },
        ],
    },
    {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [
            {
                color: '#ffffff',
            },
        ],
    },
    {
        featureType: 'road.arterial',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#757575',
            },
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [
            {
                color: '#dadada',
            },
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#616161',
            },
        ],
    },
    {
        featureType: 'road.local',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#9e9e9e',
            },
        ],
    },
    {
        featureType: 'transit.line',
        elementType: 'geometry',
        stylers: [
            {
                color: '#e5e5e5',
            },
        ],
    },
    {
        featureType: 'transit.station',
        elementType: 'geometry',
        stylers: [
            {
                color: '#eeeeee',
            },
        ],
    },
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
            {
                color: '#c9c9c9',
            },
        ],
    },
    {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#9e9e9e',
            },
        ],
    },
];

const GoogleMapComponent = withScriptjs(
    withGoogleMap<Props>(({position, zoom}) => (
        <GoogleMapOriginal defaultCenter={position} defaultZoom={zoom} options={{styles}} mapTypeId={'terrain'}>
            <Marker position={position} />
        </GoogleMapOriginal>
    )),
);

const decorate = withStyles((_: Theme) => ({
    loadingElement: {
        height: `100%`,
    },
    containerElement: {
        height: `400px`,
    },
    mapElement: {
        height: `100%`,
    },
}));

type GoogleMapProps = Props & {apiKey: string};

export const GoogleMap = decorate<GoogleMapProps>(({classes, position, zoom, apiKey}) => {
    return (
        <GoogleMapComponent
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`}
            loadingElement={<div className={classes.loadingElement} />}
            containerElement={<div className={classes.containerElement} />}
            mapElement={<div className={classes.mapElement} />}
            position={position}
            zoom={zoom}
        />
    );
});
