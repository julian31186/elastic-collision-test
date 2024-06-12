let collision = false;
let animationId = -1;

let b1 = document.getElementById("b1");
let b2 = document.getElementById("b2");

let b1X = 0;
let b2X = 0;

function hasCollided(x1,x2,radius) {
    return Math.abs(x1 - x2) < radius * 2;
}

function animate() {

    if (hasCollided(b1.getBoundingClientRect().x, b2.getBoundingClientRect().x, b1.clientWidth / 2)) {
        console.log("Collision!");
        collision = true;
    }

    if (collision == false) {
        b1X += parseFloat(document.getElementById("b1-velocity").value);
        b2X -= parseFloat(document.getElementById("b2-velocity").value);
        b1.style.transform = `translateX(${b1X}px)`;
        b2.style.transform = `translateX(${b2X}px)`;
    }

    animationId = requestAnimationFrame(animate);
}

document.addEventListener("keydown", function(e) {
    if (e.key == "Enter") {
        if (animationId != -1) {
            document.getElementById("b1-mass").disabled = false;
            document.getElementById("b2-mass").disabled = false;
            document.getElementById("b1-velocity").disabled = false;
            document.getElementById("b2-velocity").disabled = false;
            document.getElementById("animation-indicator").style.backgroundColor = "#FC6949";
            cancelAnimationFrame(animationId);
            animationId = -1;
        } else {
            document.getElementById("b1-mass").disabled = true;
            document.getElementById("b2-mass").disabled = true;
            document.getElementById("b1-velocity").disabled = true;
            document.getElementById("b2-velocity").disabled = true;
            document.getElementById("animation-indicator").style.backgroundColor = "#49FC4E";
            animationId = requestAnimationFrame(animate);
        }
    }
});