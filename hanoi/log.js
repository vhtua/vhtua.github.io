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
