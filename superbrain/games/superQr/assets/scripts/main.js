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
    var result = ["13", "38", "53", "75", "10"];
  
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
    } else if (
        values.includes("13") && values.includes("38") && values.includes("53") && values.includes("75") ||
        values.includes("38") && values.includes("53") && values.includes("75") && values.includes("10") ||
        values.includes("53") && values.includes("75") && values.includes("10") && values.includes("13") ||
        values.includes("75") && values.includes("10") && values.includes("13") && values.includes("38") ||
        values.includes("10") && values.includes("13") && values.includes("38") && values.includes("53")   
    ) {
        document.getElementById("result").textContent = "4/5 are correct!";
    } 
    else {

        var count = 0;

        // Iterate through the inputsArray and check if each input is present in the valuesArray
        for (var i = 0; i < values.length; i++) {
            if (result.includes(values[i])) {
            count++;
            }
        }

        // Check if count is equal to 4
        if (count === 3) {
            document.getElementById("result").textContent = "3/5 are correct!";
        } else if (count === 2) {
            document.getElementById("result").textContent = "2/5 are correct!";
        } else if (count === 1) {
            document.getElementById("result").textContent = "1/5 is correct!";
        } else if (count === 0) {
            document.getElementById("result").textContent = "All are wrong!";
        }


    }
  }