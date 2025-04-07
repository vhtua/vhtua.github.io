const menuBtn = document.getElementById('menu');
const popup = document.getElementById('popup');
const closeBtn = document.getElementById('closePopup');

let currentTitleIndex = 0;
let numberOfChangedAppTitle = 0;

const changeTitleBtn = document.getElementById('changeTitle');
// const mapTitle = document.getElementById('mapTitle');

menuBtn.addEventListener('click', () => {
    popup.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === popup) {
        popup.style.display = 'none';
    }
});

// ======== Change Map Title
changeTitleBtn.addEventListener('click', () => {
    currentTitleIndex = (currentTitleIndex + 1) % map_title.length;
    numberOfChangedAppTitle += 1;
    document.getElementById('change-app-title-result').innerHTML = `<p style="color: green; font-size: 14px;">Successfully changed app title ${numberOfChangedAppTitle} times</p>`;
    document.getElementById('map-heading-text').innerText = `${map_title[currentTitleIndex]}`;
});


// ======== Filter Date 
document.getElementById('applyFilter').addEventListener('click', () => {
    const from = document.getElementById('dateFrom').value;
    const to = document.getElementById('dateTo').value;
    // alert(`Filtering from ${from} to ${to}`);
    if (!from || !to) {
        // alert("Please select both From and To dates.");
        return;
    }
    const formattedFrom = formatDateToDDMMYYYY(from);
    const formattedTo = formatDateToDDMMYYYY(to);
    document.getElementById('filtered-date-heading').innerText = `Chúng mình đã đi những đâu từ ngày ${formattedFrom} đến ngày ${formattedTo} 👇`;
});