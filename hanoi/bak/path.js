// ====== Add paths to the map
// var polyline = L.polyline(sample_path, {color: 'red', stroke: true, weight: 5}).addTo(map).bindPopup("This is a path");
// polyline.on('mouseover',function(ev) {
//     ev.target.openPopup();
// });

// // ====== Add paths to the map
// var polyline = L.polyline(hometown_path, {color: 'red', stroke: true, weight: 5}).addTo(map).bindPopup("This is a path to our hometown");
// polyline.on('mouseover',function(ev) {
//     ev.target.openPopup();
// });


// Create paths
path_data.forEach(path => {
    var polyline = L.polyline(path.var, {color: 'red', stroke: true, weight: 5}).addTo(map).bindPopup(path.name);

    // polyline.on('mouseover',function(ev) {
    //     ev.target.openPopup();
    // });

    // polyline.on('click',function(ev) {
    //     ev.target.openPopup();
    // });

    polyline.on('click', function() {
        var infoBox = document.getElementById('info');
        var infoContent = document.getElementById('info-content');
        infoContent.innerHTML = `<h2 class="location-name">${path.name}</h2>`;
        path.detail.forEach(path_detail => {
            infoContent.innerHTML += `
                                <hr>
                                <p>📅 ${path_detail.date}<p>
                                <p>${path_detail.desc}</p>
                                <img class="modal-img" src="${path_detail.img}" width="100%">
                                `;
        });
        infoBox.style.display = 'block';
    });
});
