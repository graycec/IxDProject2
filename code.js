// document.addEventListener("DOMContentLoaded", function () {
//     const timeline = document.querySelector(".timeline");
//     const events = document.querySelectorAll(".event");

//     function applyEffect() {
//         const containerCenter = window.innerWidth / 2;

//         events.forEach(event => {
//             const rect = event.getBoundingClientRect();
//             const eventCenter = rect.left + rect.width / 2;
//             const distance = Math.abs(containerCenter - eventCenter);
//             const scaleFactor = Math.max(1, 1.25 - (distance / containerCenter));
//             event.style.zIndex = Math.round(scaleFactor * 100);
//             event.style.transform = `scale(${scaleFactor})`;
//         });
//     }

//     document.querySelector(".timeline-container").addEventListener("scroll", applyEffect);
//     applyEffect(); // Initial call to apply effect on load
// });

document.addEventListener("DOMContentLoaded", function () {
    const timeline = document.querySelector(".timeline");
    const events = document.querySelectorAll(".event");
    const timelineContainer = document.querySelector(".timeline-container");
    const scrollButton = document.getElementById("scrollButton");
    const modal = document.getElementById("myModal");
    const modal2 = document.getElementById("myModal2");
    const openModalBtn = document.getElementById("openModalBtn");
    const openModalBtn2 = document.getElementById("openModalBtn2");
    const closeBtn = document.getElementById("closeBtn");
    const closeBtn2 = document.getElementById("closeBtn2");

    // When the user clicks the button, open the modal
    openModalBtn.onclick = function() {
        modal.style.display = "block";
    }

    openModalBtn2.onclick = function() {
        modal2.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    closeBtn2.onclick = function() {
        modal2.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
            modal2.style.display = "none";
        }
    }

    function applyEffect() {
        const containerCenter = window.innerWidth / 2;

        events.forEach(event => {
            const rect = event.getBoundingClientRect();
            const eventCenter = rect.left + rect.width / 2;
            const distance = Math.abs(containerCenter - eventCenter);
            const scaleFactor = Math.max(1, 1.25 - (distance / containerCenter));
            event.style.zIndex = Math.round(scaleFactor * 100);
            event.style.transform = `scale(${scaleFactor})`;
        });
    }

    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3); // Smooth easing function (fast start, slow end)
    }

    function smoothScrollToEnd() {
        const startScroll = timelineContainer.scrollLeft;
        const endScroll = timelineContainer.scrollWidth - timelineContainer.clientWidth;
        const distance = endScroll - startScroll;
        const duration = 100; // Adjust for slower scrolling
        const startTime = performance.now();

        // 🔹 **Set an initial small scroll movement immediately**
        timelineContainer.scrollLeft += 2;

        function scrollStep(currentTime) {
            const elapsed = currentTime - startTime;
            const t = Math.min(elapsed / duration, 1); // Normalized progress (0 → 1)
            const easedProgress = easeOutCubic(t);

            timelineContainer.scrollLeft = startScroll + easedProgress * distance;

            if (t < 1) {
                requestAnimationFrame(scrollStep);
            }
        }

        requestAnimationFrame(scrollStep); // Start the animation loop immediately
    }

    if (timelineContainer) {
        timelineContainer.addEventListener("scroll", applyEffect);
        applyEffect(); // Initial call to apply effect on load
    }

    if (scrollButton) {
        scrollButton.addEventListener("click", smoothScrollToEnd);
    }
});




