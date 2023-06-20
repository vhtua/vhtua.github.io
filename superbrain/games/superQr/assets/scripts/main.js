function checkAnswer() {
    let x = document.getElementById("str").value;
    let text;

    if (x == 10 || x == 'pic 10') {
        text = "Correct answer";
    } else {
        text = "Wrong answer";
    }
    document.getElementById("answer").innerHTML = text;
}

function checkInputs() {
    var inputs = document.getElementsByTagName("input");
    var values = [];
  
    // Get the values of the input fields
    for (var i = 0; i < inputs.length; i++) {
      values.push(inputs[i].value);
    }
  
    // Check if all inputs are correct
    if (values.includes("13") &&
        values.includes("38") &&
        values.includes("53") &&
        values.includes("75") &&
        values.includes("10")) {
      document.getElementById("result").textContent = "All are correct!";
    } else {
      document.getElementById("result").textContent = "Wrong answers!";
    }
  }