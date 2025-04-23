const song_title = ["Blue - Yungkai", "Đừng yêu nữa, em mệt rồi - Min", "Enchanted - Taylor Swift"];
const songs_list = ["blue-jungkai", "dungyeunuaemmetroi-min", "enchanted-taylorswift"];
const lyrics_list = [lyrics_blue_yungkai, lyrics_dungyeunuaemmetroi, lyrics_enchanted];
let currentSongIndex = 0;

// show current playing song
function showPlayingSong() {
  const currentSongTitle = document.getElementById("current-song");
  currentSongTitle.innerText = `Current song: ${song_title[currentSongIndex]}`
}


function showLyrics() {
  const lyricsDiv = document.getElementById("instruction-heading");
  const audio = document.getElementById("audio");

  const parseTime = (timeStr) => {
    const [h, m, s] = timeStr.replace(",", ".").split(/:|\./).map(Number);
    return h * 3600 + m * 60 + s + Number("0." + timeStr.split(",")[1]);
  };

  const parseSRT = (srt) => {
    return srt.trim().split("\n\n").map(block => {
      const lines = block.split("\n");
      const times = lines[1].split(" --> ");
      return {
        start: parseTime(times[0]),
        end: parseTime(times[1]),
        text: lines.slice(2).join("\n")
      };
    });
  };

  const lyrics = parseSRT(lyrics_list[currentSongIndex]);

  audio.ontimeupdate = () => {
    const currentTime = audio.currentTime;
    const currentLyric = lyrics.find(
      l => currentTime >= l.start && currentTime <= l.end
    );
    lyricsDiv.textContent = currentLyric && currentLyric.text.trim() !== ""
      ? currentLyric.text
      : " ♪ ";
  };
}



function playRandomSong() {
  const audio = document.getElementById("audio");
  const source = audio.querySelector("source");
  let previousSongIndex = currentSongIndex;

  // generate random index for the song in the list
  // currentSongIndex = Math.floor(Math.random() * songs_list.length); --> old version
  currentSongIndex = getRandomNumberInRangeExcept(0, songs_list.length - 1, previousSongIndex)
  // console.log(currentSongIndex);

  // Pick a random song
  const randomSong = songs_list[currentSongIndex];

  // Update source and play
  source.src = `audio/${randomSong}.mp3`;
  audio.load();  // Reload the audio element
  audio.play();  // Start playing

  // Change the current song title
  showPlayingSong();
  showLyrics();
}


showPlayingSong();
showLyrics();