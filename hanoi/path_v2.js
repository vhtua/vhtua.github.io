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
function createPaths(data) {
    data.forEach(path => {
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
}





// Initial marker render (all)
createPaths(path_data);

function applyDateFilterPaths() {
    const fromDateInput = document.getElementById('dateFrom').value;
    const toDateInput = document.getElementById('dateTo').value;

    if (!fromDateInput || !toDateInput) {
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
            const dateMatch = detail.date.match(/\d{2}\/\d{2}\/\d{4}/);
            if (!dateMatch) return false;
    
            const date = new Date(dateMatch[0].split('/').reverse().join('-')); // Convert to YYYY-MM-DD format
            return (!fromDate || date >= fromDate) && (!toDate || date <= toDate);
        });
    
        if (matchingDetails.length > 0) {
            const polyline = L.polyline(path.var, { color: 'red', weight: 5 })
                .addTo(pathsLayer)
                .bindPopup(path.name);
    
            polyline.on('click', () => {
                const infoBox = document.getElementById('info');
                const infoContent = document.getElementById('info-content');
                infoContent.innerHTML = `<h2 class="location-name">${path.name}</h2>`;
                matchingDetails.forEach(detail => {
                    infoContent.innerHTML += `
                        <hr>
                        <p>📅 ${detail.date}</p>
                        <p>${detail.desc}</p>
                        <img class="modal-img" src="${detail.img}" width="100%">`;
                });
                infoBox.style.display = 'block';
            });
        }
    });
    console.log("Updating later...");
    // createPaths(filteredPathData);
    document.getElementById('filtered-date-result').innerHTML = `<p style="color: green; font-size: 14px;">Successfully applied filter</p>`;
}

// Button click listener
// document.getElementById('applyFilter').addEventListener('click', applyDateFilter);
// Optional: update after filtering too
document.getElementById('applyFilter').addEventListener('click', () => {
    applyDateFilterPaths(); // filter
    setTimeout(countMarkersInView, 100); // small delay to allow marker rendering
});
