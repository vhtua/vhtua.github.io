//==================== Global variables ===================// 
// map_data
// updates_log


//==================== Map functions ======================//
// Initialize the map
var map = L.map('map').setView([21.0285, 105.8544], 9);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; vhta'
}).addTo(map);

// L.tileLayer('https://tile.osm.ch/switzerland/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://osm.ch/">OSM Switzerland</a>',
//     maxZoom: 18
// }).addTo(map);

// var markers = L.markerClusterGroup();


// Marker data

// Create markers
map_data.forEach(location => {
    var marker = L.marker([location.lat, location.lng]).addTo(map).bindPopup(location.name);
    marker._icon.classList.add(type_color[location.type]);

    marker.on('mouseover',function(ev) {
        ev.target.openPopup();
    });

    marker.on('click',function(ev) {
        ev.target.openPopup();
    });

    marker.on('click', function() {
        var infoBox = document.getElementById('info');
        var infoContent = document.getElementById('info-content');
        infoContent.innerHTML = `<h2 class="location-name">${location.name}</h2>
                                <a href="${location.ggmaps}" target="_blank"><p>🌏Google Maps</p></a>`;
        location.detail.forEach(location_detail => {
            infoContent.innerHTML += `
                                <hr>
                                <p>📅 ${location_detail.date}<p>
                                <p>${location_detail.desc}</p>
                                <img class="modal-img" src="${location_detail.img}" width="100%">
                                `;
        });
        infoBox.style.display = 'block';
    });
    // markers.addLayer(marker); // Add marker to cluster
});

// map.addLayer(markers);

// Close info box function
function closeInfoBox() {
    document.getElementById('info').style.display = 'none';
}

// Count markers
function countMarkersInView() {
    var bounds = map.getBounds();
    var count = 0;

    map_data.forEach(location => {
        var latLng = L.latLng(location.lat, location.lng);
        if (bounds.contains(latLng)) {
            count++;
        }
    });

    document.getElementById('markerCountButton').innerText = `📍 Places in View: ${count}`;
}

// Update count on map move or zoom
map.on('moveend', countMarkersInView);
map.on('zoomend', countMarkersInView);





//==================== Log functions ======================//
// Function to open the log box and load the logs
document.getElementById('updatesLogButton').addEventListener('click', function() {
    // Sort logs by date in descending order
    updates_logs.sort((a, b) => {
        const dateA = a.date.split('/').reverse().join('-'); // Convert to YYYY-MM-DD
        const dateB = b.date.split('/').reverse().join('-');
        return new Date(dateB) - new Date(dateA);
    });

    // Get the content div and clear any existing content
    const logContent = document.getElementById('log-content');
    logContent.innerHTML = '';
    logContent.innerHTML += '<h3 class="updates-log-title">Updates Log</h3>';

    // Loop through the sorted updates and display them
    updates_logs.forEach(log => {
        const logDiv = document.createElement('div');
        logDiv.classList.add('log-entry');

        // Create the log's date and content
        const logDate = document.createElement('h4');
        logDate.textContent = log.date;
        logDiv.appendChild(logDate);

        const logInfo = document.createElement('div');
        logInfo.innerHTML = log.info;
        logDiv.appendChild(logInfo);

        // Append the log entry to the info-content div
        logContent.appendChild(logDiv);
    });

    // Show the info box
    document.getElementById('updates-log').style.display = 'block';
});

// Function to close the info box
function closeUpdatesLogBox() {
    document.getElementById('updates-log').style.display = 'none';
}
