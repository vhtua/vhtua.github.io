// Reset filter

document.getElementById('resetFilter').addEventListener('click', () => {
    // Clear input values
    document.getElementById('dateFrom').value = '';
    document.getElementById('dateTo').value = '';

    // Remove the filtered heading text
    const heading = document.getElementById('filtered-date-heading');
    if (heading) heading.innerText = '';

    // Update URL: remove dateFrom and dateTo from the query string
    const url = new URL(window.location);
    url.searchParams.delete('dateFrom');
    url.searchParams.delete('dateTo');
    history.replaceState(null, '', url); // Update URL without reloading

    // Re-render all markers
    createMarkers(map_data);
    // Re-render all paths
    createPaths(path_data);

    // Reset search box query
    document.getElementById('search-box').value = '';
    
    setTimeout(countMarkersInView, 100); // small delay to allow marker rendering
});


document.getElementById('resetFilterHead').addEventListener('click', () => {
    // Clear input values
    document.getElementById('dateFrom').value = '';
    document.getElementById('dateTo').value = '';

    // Remove the filtered heading text
    const heading = document.getElementById('filtered-date-heading');
    if (heading) heading.innerText = '';

    // Update URL: remove dateFrom and dateTo from the query string
    const url = new URL(window.location);
    url.searchParams.delete('dateFrom');
    url.searchParams.delete('dateTo');
    history.replaceState(null, '', url); // Update URL without reloading

    // Re-render all markers
    createMarkers(map_data);
    // Re-render all paths
    createPaths(path_data);
    
    // Reset search box query
    document.getElementById('search-box').value = '';
    
    setTimeout(countMarkersInView, 100); // small delay to allow marker rendering
});
