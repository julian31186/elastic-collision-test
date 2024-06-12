let animationId = -1;
let hasCollidedFlag = false;

let b1 = {
    element : document.getElementById("b1"),
    velocity : 0,
    mass : 0,
    deltaX : 0
}

let b2 = {
    element : document.getElementById("b2"),
    velocity : 0,
    mass : 0,
    deltaX : 0
}

function hasCollided(x1,x2,radius) {
    return Math.abs(x1 - x2) < radius * 2;
}

function collide(b1,b2) {
    console.log(b1.velocity)
    b1.velocity = ((b1.velocity * (b1.mass - b2.mass)) + (2 * b2.mass * b2.velocity)) / (b1.mass + b2.mass)
    console.log(b1.velocity)
}

function animate() {

    if (hasCollided(b1.element.getBoundingClientRect().x, b2.element.getBoundingClientRect().x, b1.element.clientWidth / 2)) {
        if (hasCollidedFlag == false) {
            console.log("Collision!");
            tempBall = { ...b1 }
            collide(b1,b2);
            collide(b2,tempBall);
            hasCollidedFlag = true;
        }
    }
    
    b1.deltaX += b1.velocity;
    b2.deltaX += b2.velocity;
    b1.element.style.transform = `translateX(${b1.deltaX}px)`;
    b2.element.style.transform = `translateX(${b2.deltaX}px)`;

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
            b1.velocity = document.getElementById("b1-velocity").value !== '' ? parseFloat(document.getElementById("b1-velocity").value) : 0;
            b2.velocity = document.getElementById("b2-velocity").value !== '' ? -parseFloat(document.getElementById("b2-velocity").value) : 0;

            b1.mass = document.getElementById("b1-mass").value !== '' ? parseFloat(document.getElementById("b1-mass").value) : 0;
            b2.mass = document.getElementById("b2-mass").value !== '' ? parseFloat(document.getElementById("b2-mass").value) : 0;

            document.getElementById("b1-mass").disabled = true;
            document.getElementById("b2-mass").disabled = true;
            document.getElementById("b1-velocity").disabled = true;
            document.getElementById("b2-velocity").disabled = true;
            document.getElementById("animation-indicator").style.backgroundColor = "#49FC4E";
            animationId = requestAnimationFrame(animate);
        }
    }
});

document.addEventListener("keydown", function(e) {
    if (e.key == 'r') {
        console.log("Reset");
        cancelAnimationFrame(animationId);
        b1.velocity = 0;
        b2.velocity = 0;
        b1.deltaX = 0;
        b2.deltaX = 0;
        b1.element.style.transform = `translateX(0px)`;
        b2.element.style.transform = `translateX(0px)`;
        document.getElementById("b1-mass").disabled = false;
        document.getElementById("b2-mass").disabled = false;
        document.getElementById("b1-velocity").disabled = false;
        document.getElementById("b2-velocity").disabled = false;
        hasCollidedFlag = false;
        document.getElementById("animation-indicator").style.backgroundColor = "#FC6949";
        animationId = -1;
    }
});