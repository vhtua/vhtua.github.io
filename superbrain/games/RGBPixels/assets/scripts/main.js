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