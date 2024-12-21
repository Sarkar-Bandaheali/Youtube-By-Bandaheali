document.getElementById("searchBtn").addEventListener("click", async () => {
  const searchText = document.getElementById("search").value;
  if (!searchText) return alert("Please enter a search term!");

  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(`/api/search?text=${encodeURIComponent(searchText)}`);
    const data = await response.json();

    if (!data.status || !data.result.data.length) {
      resultsContainer.innerHTML = "<p>No results found.</p>";
      return;
    }

    resultsContainer.innerHTML = data.result.data
      .map(video => `
        <div class="result-item">
          <img src="${video.thumbnail}" alt="${video.title}" class="thumbnail">
          <div class="title">${video.title}</div>
          <div class="description">${video.description}</div>
          <div>Duration: ${video.duration.timestamp} | Views: ${video.views}</div>
          <a href="${video.url}" target="_blank" class="download-btn">Download</a>
        </div>
      `)
      .join("");
  } catch (error) {
    resultsContainer.innerHTML = `<p>Error fetching results: ${error.message}</p>`;
  }
});
