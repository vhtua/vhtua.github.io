function getRandomNumberInRangeExcept(min, max, excluded) {
    if (max - min < 1) {
      return null; // Not possible to exclude a number within this range
    }
  
    let randomNumber;
    do {
      randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (randomNumber === excluded);
  
    return randomNumber;
}


// Encode a string to Base64
function encodeString(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

// Decode a Base64 string
function decodeString(encodedStr) {
  return  decodeURIComponent(escape(atob(encodedStr)));
}

// Example usage
// const original = `Chúc mừng cậu đã tìm được đến nơi sâu thẳm nhất của web map này`;
// const encoded = encodeString(original);
// const decoded = decodeString(encoded);

// console.log("Original:", original);
// console.log("Encoded:", encoded);
// console.log("Decoded:", decoded);