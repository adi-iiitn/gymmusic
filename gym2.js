$(document).ready(function() {
    // List of all songs (Add your own songs here)
    const allSongs = [
      { title: "Power Up", artist: "DJ Muscle", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", genre: "Electronic" },
      { title: "Pump It", artist: "Fitness Beats", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", genre: "Hip Hop" },
      { title: "Speed Thrills", artist: "Workout Jamz", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", genre: "Rock" },
      { title: "Hit the Beat", artist: "Energy Tunes", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", genre: "Pop" },
      { title: "Endurance", artist: "Motivation Beats", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", genre: "Reggaeton" },
      { title: "Strength", artist: "Workout Kings", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", genre: "Pop" },
      { title: "Unstoppable", artist: "Fit Jams", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", genre: "Hip Hop" },
      { title: "Muscle Flow", artist: "Gym Beats", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", genre: "Electronic" },
      // Add more songs as needed
    ];
  
    // Popular songs to display initially
    const popularSongs = allSongs.slice(0, 5); // Show first 5 popular songs
  
    // Store the current audio object for controlling playback
    let currentAudio = null;
  
    // Function to display songs
    function displaySongs(filteredSongs) {
      const songList = $('#song-list');
      songList.empty();  // Clear previous songs
      filteredSongs.forEach(song => {
        songList.append(`
          <div class="song-item">
            <h3>${song.title}</h3>
            <p>${song.artist}</p>
            <button class="play-btn" onclick="playSong('${song.url}', this)">Play</button>
            <button class="pause-btn" onclick="pauseSong()" style="display: none;">Pause</button>
          </div>
        `);
      });
    }
  
    // Function to play a song
    window.playSong = function(url, button) {
      // Pause any currently playing song if there is one
      if (currentAudio) {
        currentAudio.pause();
        // Reset the previous button state: Hide pause and show play
        $('.pause-btn').hide();
        $('.play-btn').removeClass('playing-btn').show();
      }
  
      // Create a new audio object for the selected song
      currentAudio = new Audio(url);
      currentAudio.play();
  
      // Change the color of the play button (make it red) and hide play button, show pause button
      $(button).addClass('playing-btn').hide();
      $(button).siblings('.pause-btn').show();
    };
  
    // Function to pause the current song
    window.pauseSong = function() {
      if (currentAudio) {
        currentAudio.pause();
        // Hide pause button and show play button again
        $('.pause-btn').hide();
        $('.play-btn').removeClass('playing-btn').show();
      }
    };
  
    // Display popular songs initially
    displaySongs(popularSongs);
  
    // Search functionality
    $('#search-bar').on('input', function() {
      const searchTerm = $(this).val().toLowerCase();
      const filteredSongs = allSongs.filter(song => 
        song.title.toLowerCase().includes(searchTerm) || 
        song.artist.toLowerCase().includes(searchTerm) || 
        song.genre.toLowerCase().includes(searchTerm)
      );
      displaySongs(filteredSongs);
    });
  });
  