// //==================== Global variables ===================// 
// // map_data
// // updates_log


// //==================== Map functions ======================//
// // Initialize the map
// var map = L.map('map').setView([21.0285, 105.8544], 9);

// // Add OpenStreetMap tiles
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; vhta'
// }).addTo(map);

// // L.tileLayer('https://tile.osm.ch/switzerland/{z}/{x}/{y}.png', {
// //     attribution: '&copy; <a href="https://osm.ch/">OSM Switzerland</a>',
// //     maxZoom: 18
// // }).addTo(map);

// // var markers = L.markerClusterGroup();
// // ====== Add paths to the map
// var polyline = L.polyline(sample_path, {color: 'red', stroke: true, weight: 5}).addTo(map).bindPopup("This is a path");
// polyline.on('mouseover',function(ev) {
//     ev.target.openPopup();
// });

// // Marker data

// // Create markers
// map_data.forEach(location => {
//     var marker = L.marker([location.lat, location.lng]).addTo(map).bindPopup(location.name);
//     marker._icon.classList.add(type_color[location.type]);

//     marker.on('mouseover',function(ev) {
//         ev.target.openPopup();
//     });

//     marker.on('click',function(ev) {
//         ev.target.openPopup();
//     });

//     marker.on('click', function() {
//         var infoBox = document.getElementById('info');
//         var infoContent = document.getElementById('info-content');
//         infoContent.innerHTML = `<h2 class="location-name">${location.name}</h2>
//                                 <a href="${location.ggmaps}" target="_blank"><p>🌏Google Maps</p></a>`;
//         location.detail.forEach(location_detail => {
//             infoContent.innerHTML += `
//                                 <hr>
//                                 <p>📅 ${location_detail.date}<p>
//                                 <p>${location_detail.desc}</p>
//                                 <img class="modal-img" src="${location_detail.img}" width="100%">
//                                 <video class="modal-video" width="100%" controls>
//                                     <source src="${location_detail.video}" type="video/mp4">
//                                     Your browser does not support the video tag.
//                                 </video>
//                                 `;
//         });
//         infoBox.style.display = 'block';
//     });
//     // markers.addLayer(marker); // Add marker to cluster
// });

// // map.addLayer(markers);

// // Close info box function
// function closeInfoBox() {
//     document.getElementById('info').style.display = 'none';
// }

// // Count markers
// function countMarkersInView() {
//     var bounds = map.getBounds();
//     var count = 0;

//     map_data.forEach(location => {
//         var latLng = L.latLng(location.lat, location.lng);
//         if (bounds.contains(latLng)) {
//             count++;
//         }
//     });

//     document.getElementById('markerCountButton').innerText = `📍 Places in View: ${count}`;
// }

// // Update count on map move or zoom
// map.on('moveend', countMarkersInView);
// map.on('zoomend', countMarkersInView);





