//==================== Global variables ===================// 
// map_data
// updates_log
let filteredData = map_data;


//==================== Map functions ======================//
var map = L.map('map', {
    zoomControl: false
}).setView([21.0285, 105.8544], 9);

// Change position for zoom control
L.control.zoom({
    position: 'bottomright'
}).addTo(map);


// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; vhta'
}).addTo(map);

const markersLayer = L.layerGroup().addTo(map); // For managing marker updates


function createMarkers(data) {
    markersLayer.clearLayers(); // Remove previous markers

    data.forEach(location => {
        const marker = L.marker([location.lat, location.lng]).addTo(map).bindPopup(location.name);
        // marker._icon?.classList.add(type_color[location.type] || 'default-type');
        // console.log(location.type);
        marker._icon.classList.add(type_color[location.type]);

        marker.on('mouseover', ev => ev.target.openPopup());
        marker.on('click', ev => ev.target.openPopup());

        marker.on('click', function () {
            const infoBox = document.getElementById('info');
            const infoContent = document.getElementById('info-content');
            infoContent.innerHTML = `<h2 class="location-name">${location.name}</h2>
                                    <a href="${location.ggmaps}" target="_blank"><p>🌏Google Maps</p></a>`;
            location.detail.forEach(location_detail => {
                infoContent.innerHTML += `
                    <hr>
                    <p>📅 ${location_detail.date}<p>
                    <p>${location_detail.desc}</p>
                    <img class="modal-img" src="${location_detail.img}" width="100%">`;
                if (location_detail.video) {
                    infoContent.innerHTML += `
                        <video class="modal-video" width="100%" controls>
                            <source src="${location_detail.video}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>`;
                }
            });
            infoBox.style.display = 'block';
        });

        marker.addTo(markersLayer);
    });
}

// Initial marker render (all)
// Reading param first --> If not exist just show all places
if (getUrlParam("dateFrom") != null && getUrlParam("dateTo") != null) {
    const calendarFrom = document.getElementById('dateFrom');
    const calendarTo = document.getElementById('dateTo');
    calendarFrom.value = getUrlParam("dateFrom");
    calendarTo.value = getUrlParam("dateTo");
    applyDateFilter();
} else {
    createMarkers(map_data);
}

// Search matching location name or location desc
function searchMarker(text) {
    const filteredDescData = [];

    filteredData.forEach(location => {
        const location_name = location.name;
        const matchingDetails = location.detail.filter(detail => {
            const desc = detail.desc;
            return desc.toLowerCase().includes(text.toLowerCase()) || location_name.toLowerCase().includes(text.toLowerCase());
        });

        if (matchingDetails.length > 0) {
            filteredDescData.push({
                ...location,
                detail: matchingDetails
            });
        }
    });

    

    createMarkers(filteredDescData);
}

// searchMarker("police");


function applyDateFilter() {
    const fromDateInput = document.getElementById('dateFrom').value;
    const toDateInput = document.getElementById('dateTo').value;
    // console.log(fromDateInput);
    // console.log(toDateInput);

    if (!fromDateInput || !toDateInput) {
        // alert("Please select both From and To dates.");
        document.getElementById('filtered-date-result').innerHTML = `<p style="color: red; font-size: 14px;">Invalid input date</p>`;
        return;
    }

    // Update URL with dateFrom and dateTo
    const url = new URL(window.location);
    url.searchParams.set('dateFrom', fromDateInput);
    url.searchParams.set('dateTo', toDateInput);
    history.replaceState(null, '', url);

    const fromDate = new Date(fromDateInput);
    const toDate = new Date(toDateInput);
    fromDate.setHours(0, 0, 0, 0); // Start of the day
    toDate.setHours(23, 59, 59, 999); // Include the full day

    filteredData = [];

    map_data.forEach(location => {
        const matchingDetails = location.detail.filter(detail => {
            const d = parseDate(detail.date);

            // --> debug part to realize that the starting date start from 7AM
            // console.log("Parsed Date marker ===>");
            // console.log(detail.date);
            // console.log(d);
            // console.log(fromDate + " ===== " + toDate);
            // console.log(d && d >= fromDate && d <= toDate);

            return d && d >= fromDate && d <= toDate;
        });
        // console.log("====== marker"); ===> Debug
        // console.log(matchingDetails);

        if (matchingDetails.length > 0) {
            filteredData.push({
                ...location,
                detail: matchingDetails
            });
        }
    });

    createMarkers(filteredData);

    // Reset search box query
    document.getElementById('search-box').value = '';

    document.getElementById('filtered-date-result').innerHTML = `<p style="color: green; font-size: 14px;">Successfully applied filter</p>`;
}

// Button click listener
// document.getElementById('applyFilter').addEventListener('click', applyDateFilter);
// Optional: update after filtering too
document.getElementById('applyFilter').addEventListener('click', () => {
    applyDateFilter(); // filter
    setTimeout(countMarkersInView, 100); // small delay to allow marker rendering
});




// Close info box function
function closeInfoBox() {
    document.getElementById('info').style.display = 'none';
}

// Count markers
function countMarkersInView() {
    var bounds = map.getBounds();
    var count = 0;

    markersLayer.eachLayer(marker => {
        if (bounds.contains(marker.getLatLng())) {
            count++;
        }
    });

    document.getElementById('markerCountButton').innerText = `📍${count} Places`;
}

// Hook into map events
map.on('moveend', countMarkersInView);
map.on('zoomend', countMarkersInView);

