
mapboxgl.accessToken = 'pk.eyJ1Ijoic2FuZ3VpYW5vMDUiLCJhIjoiY21oOWM0cWd5MGx5dzJqcHVleGw1eHR1NiJ9.g_IYdcIdJK3m0aVFm_8F8Q';
const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/sanguiano05/cmhjjkksv00ez01sidocb7tzc',
        center: [-121.377, 37.307], // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 5.41 // starting zoom
    });

map.on('load', function() {
    map.addSource('points-data', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/sanguiano05/Summative-Assignment-3-183-/refs/heads/main/data/SummativeAssignment3.geojson'
    });

    map.addLayer({
        id: 'points-layer',
        type: 'circle',
        source: 'points-data',
        paint: {
            'circle-color': '#4264FB',
            'circle-radius': 6,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff'
        }
    });
    
    // Add click event for popups
    map.on('click', 'points-layer', (e) => {
        // Copy coordinates array
        const coordinates = e.features[0].geometry.coordinates.slice();
            const properties = e.features[0].properties;

    // Create popup content using the actual data properties
const popupContent = `
  <div>
    <h3>${properties.Institution}</h3>
    <p><strong>Year Built:</strong> ${properties["Year Built"]}</p>
    <p><strong>Region:</strong> ${properties.Region}</p>
    <p><strong>Capacity Percentage:</strong> ${properties["Percent Capacity"]}%</p>
  </div>
`;

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(popupContent)
            .addTo(map);
    });

    // Change cursor to pointer when hovering over points
    map.on('mouseenter', 'points-layer', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change cursor back when leaving points
    map.on('mouseleave', 'points-layer', () => {
        map.getCanvas().style.cursor = '';
    });

});
