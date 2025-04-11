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

const lyrics = parseSRT(lyrics_blue_yungkai);

audio.ontimeupdate = () => {
  const currentTime = audio.currentTime;
  const currentLyric = lyrics.find(
    l => currentTime >= l.start && currentTime <= l.end
  );
  lyricsDiv.textContent = currentLyric && currentLyric.text.trim() !== ""
    ? currentLyric.text
    : " ♪ ";
};