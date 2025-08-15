const apiKey = "AIzaSyBixqWu98dMK2oZu-X3106xxhHj7GP8Xt0";
const searchQuery = "devotional songs";

// YouTube API se data fetch
function searchSongs(query) {
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${encodeURIComponent(query)}&type=video&key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            let resultsContainer = document.getElementById("results");
            resultsContainer.innerHTML = "";

            data.items.forEach(item => {
                let videoId = item.id.videoId;
                let title = item.snippet.title;
                let thumbnail = item.snippet.thumbnails.medium.url;

                let songCard = document.createElement("div");
                songCard.className = "song-card";
                songCard.innerHTML = `
                    <img src="${thumbnail}" alt="${title}">
                    <p>${title}</p>
                `;

                songCard.addEventListener("click", () => {
                    document.getElementById("video-frame").src = `https://www.youtube.com/embed/${videoId}`;
                    window.scrollTo({ top: 0, behavior: "smooth" });
                });

                resultsContainer.appendChild(songCard);
            });
        })
        .catch(error => console.error("Error fetching YouTube data:", error));
}

// Default load me devotional songs dikhaye
window.onload = () => {
    searchSongs(searchQuery);
};

// Search button ka click event
document.getElementById("search-btn").addEventListener("click", () => {
    let query = document.getElementById("search-input").value;
    if (query.trim() !== "") {
        searchSongs(query);
    }
});
