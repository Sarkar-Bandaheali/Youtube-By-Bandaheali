document.getElementById('downloadButton').addEventListener('click', function () {
  const videoUrl = document.getElementById('videoUrl').value;
  if (!videoUrl) {
    alert('Please enter a video URL');
    return;
  }

  fetch(`/api/download?url=${encodeURIComponent(videoUrl)}`)
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        const downloadLink = document.getElementById('downloadLink');
        downloadLink.href = data.downloadUrl;
        downloadLink.style.display = 'inline-block';
        downloadLink.innerHTML = 'Click to download video';
        document.getElementById('errorMessage').style.display = 'none';
      } else {
        document.getElementById('errorMessage').style.display = 'inline-block';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('errorMessage').style.display = 'inline-block';
    });
});
