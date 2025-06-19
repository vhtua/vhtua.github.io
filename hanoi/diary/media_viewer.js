document.addEventListener("DOMContentLoaded", () => {
  const posts = document.querySelectorAll(".post");

  posts.forEach(post => {
    const viewer = post.querySelector(".media-viewer");
    const mediaItems = post.querySelectorAll(".media-item");

    let isDragging = false;
    let dragDistance = 0;
    let startX = 0;
    let scrollLeft = 0;

    if (viewer) {
      // Mouse events
      viewer.addEventListener("mousedown", (e) => {
        isDragging = true;
        dragDistance = 0;
        startX = e.pageX;
        scrollLeft = viewer.scrollLeft;
        viewer.classList.add("dragging");
      });

      viewer.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        const x = e.pageX;
        const walk = (x - startX) * 1; // Adjust multiplier for feel
        viewer.scrollLeft = scrollLeft - walk;
        dragDistance += Math.abs(walk);
      });

      viewer.addEventListener("mouseup", () => {
        isDragging = false;
        viewer.classList.remove("dragging");
      });

      viewer.addEventListener("mouseleave", () => {
        isDragging = false;
        viewer.classList.remove("dragging");
      });

      // Touch events
      viewer.addEventListener("touchstart", (e) => {
        isDragging = true;
        dragDistance = 0;
        startX = e.touches[0].pageX;
        scrollLeft = viewer.scrollLeft;
      }, { passive: true });

      viewer.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        const x = e.touches[0].pageX;
        const walk = (x - startX) * 1; // Same here, real-time scroll
        viewer.scrollLeft = scrollLeft - walk;
        dragDistance += Math.abs(walk);
        e.preventDefault(); // Prevent native scrolling
      }, { passive: false });

      viewer.addEventListener("touchend", () => {
        isDragging = false;
      });
    }

    // Handle image click only if not dragging
    mediaItems.forEach(item => {
      const img = item.querySelector("img");
      if (img) {
        img.setAttribute("draggable", "false");

        img.addEventListener("dragstart", e => e.preventDefault());
        img.addEventListener("mousedown", () => { dragDistance = 0; });
        img.addEventListener("touchstart", () => { dragDistance = 0; });

        img.addEventListener("click", () => {
          if (dragDistance > 5) return;

          const modal = document.getElementById("imageModal");
          const modalImg = document.getElementById("modalImage");
          const downloadLink = document.getElementById("modalDownload");

          modal.style.display = "block";
          modalImg.src = img.src;
          downloadLink.href = img.src;
          downloadLink.download = img.src.split("/").pop();
        });
      }

      const video = item.querySelector("video");
      if (video) {
        video.addEventListener("play", () => {
          mediaItems.forEach(other => {
            const v = other.querySelector("video");
            if (v && v !== video) v.pause();
          });
        });
      }
    });
  });

  // Modal logic
  const modal = document.getElementById('imageModal');
  const closeModal = document.getElementById('closeModal');

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
