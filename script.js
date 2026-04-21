document.getElementById("startBtn").addEventListener("click", function() {
    const music = document.getElementById("bg-music");
    music.play();

    document.getElementById("startScreen").style.display = "none";
});

document.getElementById("attendanceForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let type = document.getElementById("type").value;

    let A = parseInt(document.getElementById("attended").value);
    let T = parseInt(document.getElementById("total").value);
    let S = parseInt(document.getElementById("semester").value);

    // ✅ Lab adjustment
    if (type === "lab") {
        A = A * 2;
        T = T * 2;
        S = S * 2;
    }

    // Show loading
    document.getElementById("loading").classList.remove("hidden");

    document.getElementById("inputSummary").innerHTML = `
        Type: ${type} <br>
        Total: ${T} <br>
        Attended: ${A} <br>
        Semester Total: ${S}
    `;

    setTimeout(() => {

        const target = 0.75;

        // ✅ MUST ATTEND calculation
        let X = Math.ceil((target * T - A) / (1 - target));
        if (X < 0) X = 0;

        // ✅ CAN SKIP calculation
        let Y = Math.floor((A - target * T) / target);
        if (Y < 0) Y = 0;

        // Remaining lectures
        let R = S - T;

        let mustAttend = Math.min(X, R);
        let canSkip = Math.min(Y, R);

        // Show result
        document.getElementById("loading").classList.add("hidden");
        document.getElementById("result").classList.remove("hidden");

        document.getElementById("resultType").innerText = "Lecture Type: " + type.toUpperCase();

        document.getElementById("mustAttend").innerHTML =
            `Must Attend: <span class="highlight">${mustAttend}</span>`;

        document.getElementById("canSkip").innerHTML =
            `Can Skip: <span class="highlight">${canSkip}</span>`;

    }, 3000);
});