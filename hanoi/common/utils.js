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