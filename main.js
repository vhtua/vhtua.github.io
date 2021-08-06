function atMyWorst() {
   
    let x = document.getElementById("str").value;

    let text;
    if (x == 'whenever you want me' || x == 'whenever you want me.' || x == 'Whenever you want me') {
      text = "Correct answer";
    } else {
      text = "Wrong answer";
    }
    document.getElementById("song").innerHTML = text;
  }

function showanswer1() {
  document.getElementById("song").innerHTML = "whenever you want me"

}
 

// Photograph

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

function showanswer2() {
  document.getElementById("song2").innerHTML = "can mend your soul"
}


// Oah

function oah() {
  let x = document.getElementById("str3").value;
  let y = document.getElementById("str3.2").value;

  let text;
  if (x == 'left to me' || x == 'left to me.') {
    if (y == 'crying secretly' || y == 'crying secretly.') {
      text = "(1) & (2) are correct";
    } else {
      text = "(1) is correct, (2) is wrong";
    }
  } else {
    if (y == 'crying secretly' || y == 'crying secretly.') {
      text = "(2) is correct";
    } else {
      text = "(1) & (2) are wrong";
    }
    
  }
  document.getElementById("song3").innerHTML = text;

}

function showanswer3() {
  document.getElementById("song3").innerHTML = "(1) left to me (2) crying secretly"
}