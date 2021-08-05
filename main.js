function atMyWorst() {
   
    let x = document.getElementById("str").value;

    let text;
    if (x == 'whenever you want me' || x == 'whenever you want me.') {
      text = "Correct answer";
    } else {
      text = "Wrong answer";
    }
    document.getElementById("song").innerHTML = text;
  }

function photograph() {
  let x = document.getElementById("str2").value;

  let text;
  if (x == 'can mend your soul' || x == 'can mend your soul.') {
    text = "Correct answer";
  } else {
    text = "Wrong answer";
  }
  document.getElementById("song2").innerHTML = text;

}