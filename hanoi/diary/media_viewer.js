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
        startX = e.pageX - viewer.offsetLeft;
        scrollLeft = viewer.scrollLeft;
        viewer.classList.add("dragging");
      });

      viewer.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        const x = e.pageX - viewer.offsetLeft;
        const walk = (x - startX) * 1.2;
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
        startX = e.touches[0].pageX - viewer.offsetLeft;
        scrollLeft = viewer.scrollLeft;
      }, { passive: true });

      viewer.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        const x = e.touches[0].pageX - viewer.offsetLeft;
        const walk = (x - startX) * 1.2;
        viewer.scrollLeft = scrollLeft - walk;
        dragDistance += Math.abs(walk);
      }, { passive: true });

      viewer.addEventListener("touchend", () => {
        isDragging = false;
      });
    }

    // Handle image click only if not dragging
    mediaItems.forEach(item => {
      const img = item.querySelector("img");
      if (img) {
        img.setAttribute("draggable", "false");

        img.addEventListener("dragstart", (e) => {
          e.preventDefault();
        });

        img.addEventListener("mousedown", () => {
          dragDistance = 0;
        });

        img.addEventListener("touchstart", () => {
          dragDistance = 0;
        });

        img.addEventListener("click", () => {
          if (dragDistance > 5) return; // it's a drag, skip modal

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

  // Modal close logic =================================
  const modal = document.getElementById('imageModal');
  const imgModal = document.getElementById('imageModal');
  const closeModal = document.getElementById('closeModal');

  closeModal.addEventListener("click", () => {
    imgModal.style.display = "none";
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});
