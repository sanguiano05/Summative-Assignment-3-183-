
mapboxgl.accessToken = 'pk.eyJ1Ijoic2FuZ3VpYW5vMDUiLCJhIjoiY21oOWM0cWd5MGx5dzJqcHVleGw1eHR1NiJ9.g_IYdcIdJK3m0aVFm_8F8Q';
const map = new mapboxgl.Map({
        container: 'map', 
        style: 'mapbox://styles/sanguiano05/cmhjjkksv00ez01sidocb7tzc',
        center: [-121.377, 37.307], 
        zoom: 5.41 
    });

map.on('load', function() {
   
    map.addSource('points-data', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/sanguiano05/Summative-Assignment-3-183-/main/data/SummativeAssignment3.geojson'
    });

  
    map.loadImage(
        'https://raw.githubusercontent.com/sanguiano05/Summative-Assignment-3-183-/main/data/prison_PNG35.png',
        (error, image) => {
            if (error) throw error;
            map.addImage('custom-icon', image);

          
            map.addLayer({
                id: 'points-layer',
                type: 'symbol',
                source: 'points-data',
                layout: {
                    'icon-image': 'custom-icon',
                    'icon-size': 0.03 
                }
            });

        
            map.on('click', 'points-layer', (e) => {
                const coordinates = e.features[0].geometry.coordinates.slice();
                const properties = e.features[0].properties;

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

            
            map.on('mouseenter', 'points-layer', () => {
                map.getCanvas().style.cursor = 'pointer';
            });
            map.on('mouseleave', 'points-layer', () => {
                map.getCanvas().style.cursor = '';
            });
        }
    );
});
