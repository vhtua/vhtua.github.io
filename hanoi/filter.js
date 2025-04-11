// Reset filter

document.getElementById('resetFilter').addEventListener('click', () => {
    // Clear input values
    document.getElementById('dateFrom').value = '';
    document.getElementById('dateTo').value = '';

    // Remove the filtered heading text
    const heading = document.getElementById('filtered-date-heading');
    if (heading) heading.innerText = '';

    // Re-render all markers
    createMarkers(map_data);
    // Re-render all paths
    createPaths(path_data);
    
    setTimeout(countMarkersInView, 100); // small delay to allow marker rendering
});


document.getElementById('resetFilterHead').addEventListener('click', () => {
    // Clear input values
    document.getElementById('dateFrom').value = '';
    document.getElementById('dateTo').value = '';

    // Remove the filtered heading text
    const heading = document.getElementById('filtered-date-heading');
    if (heading) heading.innerText = '';

    // Re-render all markers
    createMarkers(map_data);
    // Re-render all paths
    createPaths(path_data);
    
    setTimeout(countMarkersInView, 100); // small delay to allow marker rendering
});
