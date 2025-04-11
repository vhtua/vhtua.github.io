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

const pathsLayer = L.layerGroup().addTo(map);

// Create paths
function createPaths(data) {
    pathsLayer.clearLayers();
    data.forEach(path => {
        const polyline = L.polyline(path.var, {color: 'red', stroke: true, weight: 5}).addTo(map).bindPopup(path.name);
    
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
        polyline.addTo(pathsLayer);
    });
}





// Initial marker render (all)
createPaths(path_data);

function applyDateFilterPaths() {
    // console.log("Update Paths");
    const fromDateInput = document.getElementById('dateFrom').value;
    const toDateInput = document.getElementById('dateTo').value;
    
    if (!fromDateInput && !toDateInput) {
        document.getElementById('filtered-date-result').innerHTML = `<p style="color: orange; font-size: 14px;">Filter reset</p>`;
        return;
    } else if (!fromDateInput || !toDateInput) {
        // alert("Please select both From and To dates.");
        document.getElementById('filtered-date-result').innerHTML = `<p style="color: red; font-size: 14px;">Invalid input date</p>`;
        return;
    }

    const fromDate = new Date(fromDateInput);
    const toDate = new Date(toDateInput);
    toDate.setHours(23, 59, 59, 999); // Include the full day

    const filteredPathData = [];

    path_data.forEach(path => {
        const matchingDetails = path.detail.filter(detail => {
            const date = parseDate(detail.date);
            return (!fromDate || date >= fromDate) && (!toDate || date <= toDate);
        });
        // console.log(matchingDetails);
        
        if (matchingDetails.length > 0) {
            filteredPathData.push({
                ...path,
                detail: matchingDetails
            })
        } 
    });
    createPaths(filteredPathData);

    document.getElementById('filtered-date-result').innerHTML = `<p style="color: green; font-size: 14px;">Successfully applied filter</p>`;
}

// Button click listener
// document.getElementById('applyFilter').addEventListener('click', applyDateFilter);
// Optional: update after filtering too
document.getElementById('applyFilter').addEventListener('click', () => {
    applyDateFilterPaths(); // filter
    setTimeout(countMarkersInView, 100); // small delay to allow marker rendering
});
