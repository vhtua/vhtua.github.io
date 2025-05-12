//==================== Search functions ======================//

document.querySelector('.search-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission (page reload)
    const query = document.getElementById('search-box').value;
    searchMarker(query);
    searchPath(query);
});
