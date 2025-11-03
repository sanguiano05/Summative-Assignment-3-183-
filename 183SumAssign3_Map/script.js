
mapboxgl.accessToken = 'pk.eyJ1Ijoic2FuZ3VpYW5vMDUiLCJhIjoiY21oOWM0cWd5MGx5dzJqcHVleGw1eHR1NiJ9.g_IYdcIdJK3m0aVFm_8F8Q';
const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/sanguiano05/cmhjjkksv00ez01sidocb7tzc',
        center: [-117.390, 37.386], // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 5.41 // starting zoom
    });