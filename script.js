// Initialize the map and set its view to the Philippines
var map = L.map('map').setView([12.8797, 121.7740], 6); // Coordinates of the Philippines

// Load and display tile layers on the map (OSM layer)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Add a draggable marker to the map
var marker = L.marker([12.8797, 121.7740], {
    draggable: true
}).addTo(map);

// Function to update the input boxes with the marker's coordinates
function updateCoordinates(lat, lng) {
    document.getElementById('latitude').value = lat.toFixed(6);
    document.getElementById('longitude').value = lng.toFixed(6);
}

// Function to reverse geocode using Nominatim
function reverseGeocode(lat, lng) {
    var url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            var address = data.display_name;
            document.getElementById('address').value = address || "Address not found";
        })
        .catch(error => {
            console.error('Error with reverse geocoding:', error);
            document.getElementById('address').value = "Error retrieving address";
        });
}

// Update the coordinates and perform reverse geocoding on marker drag
marker.on('dragend', function (e) {
    var latlng = marker.getLatLng();
    updateCoordinates(latlng.lat, latlng.lng);
    reverseGeocode(latlng.lat, latlng.lng);
});

// Initialize with the default marker position and reverse geocode
var initialLatLng = marker.getLatLng();
updateCoordinates(initialLatLng.lat, initialLatLng.lng);
reverseGeocode(initialLatLng.lat, initialLatLng.lng);
