const container = document.getElementById("posts");
const timelineContainer = document.getElementById("timeline-list");
const searchInput = document.getElementById("searchInput");

let eventCount = 0;

// Flatten posts with parent info
const flatPosts = [];
map_data.forEach(location => {
  location.detail.forEach(detail => {
    flatPosts.push({
      id: crypto.randomUUID(),
      locationName: location.name,
      ggmaps: location.ggmaps,
      ...detail
    });
  });
});

// Parse date
// | `post.date`                            | Parsed as          |
// | -------------------------------------- | ------------------ |
// | `"20/12/2024"`                         | Dec 20, 2024 00:00 |
// | `"18:44 04/12/2024"`                   | Dec 4, 2024 18:44  |
// | `"13:12-18:04 14/12/2024"`             | Dec 14, 2024 18:04 |
// | `"21/12/2024\nXiên bẩn không nhân 🍟"` | Dec 21, 2024 00:00 |

function parseDate(dateStr) {
    // Try to find the last date in dd/mm/yyyy format
    const dateMatch = dateStr.match(/(\d{1,2}\/\d{1,2}\/\d{4})/g);
    if (!dateMatch) return new Date(0); // fallback
  
    const datePart = dateMatch[dateMatch.length - 1];
    const [day, month, year] = datePart.split("/").map(Number);
  
    // Try to find the last time (hh:mm)
    const timeMatch = dateStr.match(/(\d{1,2}):(\d{2})(?![^]*\d{1,2}:\d{2})/); // last hh:mm
    const hour = timeMatch ? parseInt(timeMatch[1]) : 0;
    const minute = timeMatch ? parseInt(timeMatch[2]) : 0;
  
    return new Date(year, month - 1, day, hour, minute);
  }
  
  

// Sort descending by date
flatPosts.sort((a, b) => parseDate(b.date) - parseDate(a.date));

// Render posts and timeline
function render(filteredPosts) {
  container.innerHTML = "";
  timelineContainer.innerHTML = "";

  filteredPosts.forEach(post => {
    // Count the number of posts/events
    eventCount = eventCount + 1;
    // Posts
    const div = document.createElement("div");
    div.className = "post";
    div.id = post.id;
    div.innerHTML = `
      <h2><span class="cute-icon">📍</span>${post.locationName}</h2>
      <div class="date">🕒 ${post.date}</div>
      ${post.img ? `<img src="../${post.img}" alt="Image">` : ""}
        ${post.video ? `<video class="modal-video" width="100%" controls>
            <source src="../${post.video}" type="video/mp4">
            Your browser does not support the video tag.
        </video>`: ""}
      <div class="desc">${post.desc}</div>
      <a href="${post.ggmaps}" target="_blank">📌 View on Google Maps</a>
    `;
    container.appendChild(div);

    // Timeline
    const item = document.createElement("div");
    item.className = "timeline-item";
    const dateOnly = post.date.match(/\d{2}\/\d{2}\/\d{4}/)?.[0] || post.date;
    item.innerHTML = `<b>${dateOnly}</b> <br> ${post.locationName}`;
    item.onclick = () => {
      document.getElementById(post.id).scrollIntoView({ behavior: "smooth" });
    };
    timelineContainer.appendChild(item);
  });
}

// Search handler
searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.toLowerCase();
  const filtered = flatPosts.filter(post =>
    post.locationName.toLowerCase().includes(keyword) ||
    post.desc.toLowerCase().includes(keyword)
  );
  render(filtered);
});


document.getElementById("menu-toggle").addEventListener("click", () => {
    document.getElementById("timeline").classList.toggle("open");
  });
  


// Initial render
render(flatPosts);


// Back to top
// Show button after scrolling 300px
window.onscroll = function () {
  const btn = document.getElementById("backToTop");
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
};

// Scroll to top on click
document.getElementById("backToTop").onclick = function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Update number of events
function showEventCount() {
  const eventCountContainer = document.getElementById('event-count');
  eventCountContainer.innerText = `Number of events: ${eventCount}`;
}

showEventCount();