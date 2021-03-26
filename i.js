"use strict";
/*

Use with the following index.html file and parcel.

```
<html><head><meta charset="utf-8" /></head><script src="./i.ts"></script></html>
```

 $ parcel serve index.html

*/
document.body = document.createElement("body");
document.body.style.background = "black";
const d = document.createElement("div");
d.style.margin = "20px auto";
d.style.width = "min-content";
const canvas = document.createElement("canvas");
canvas.innerText = "html5 required";
canvas.width = 960;
canvas.height = 540;
const backbuffer = document.createElement("canvas");
backbuffer.width = 960;
backbuffer.height = 540;
const ctx = backbuffer.getContext("2d");
ctx.font = "30px Helvetica serif";
let prevFrameTimestamp;
let position = 10;
let shipX = 70;
let shipY = 70;
let shipAngle = 0;
let shipSpeed = 1; // pixels per second
let downLeft = false;
let downRight = false;
let downForward = false;
const drawSpaceShip = (x, y, angle) => {
    const size = 20;
    ctx.fillStyle = "orchid";
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.lineTo(size, 0);
    ctx.lineTo(-size, -size / 2);
    ctx.lineTo(-size, size / 2);
    ctx.closePath();
    ctx.resetTransform();
    ctx.fill();
};
const updateSpaceship = (delta) => {
    shipX += Math.cos(shipAngle) * shipSpeed * delta;
    shipY += Math.sin(shipAngle) * shipSpeed * delta;
    shipSpeed -= (shipSpeed / 200) * delta;
    if (downLeft)
        shipAngle -= delta * 0.003;
    if (downRight)
        shipAngle += delta * 0.003;
    if (downForward)
        shipSpeed += delta * 0.002;
};
const handleEvent = ({ kind, key }) => {
    if (kind === "keydown" || kind === "keyup") {
        const isDown = kind === "keydown";
        if (key === 37)
            downLeft = isDown;
        if (key === 39)
            downRight = isDown;
        if (key === 38)
            downForward = isDown;
    }
};
["keydown", "keyup"].map((evName) => document.body.addEventListener(evName, (ev) => handleEvent({ kind: evName, key: ev.keyCode })));
const draw = () => {
    ctx.fillStyle = "#112";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const x = 960 / 2 + Math.cos(position / 50) * 300;
    const y = 540 / 2 + Math.sin(position / 50) * 200;
    ctx.fillStyle = "aquamarine";
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillText("le earth", x + 30, y + 8);
    const moonX = x + Math.cos(position / 30) * 50;
    const moonY = y + Math.sin(position / 30) * 50;
    ctx.fillStyle = "teal";
    ctx.beginPath();
    ctx.arc(moonX, moonY, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillText("le moon", moonX + 30, moonY + 8);
    ctx.fillStyle = "darkgoldenrod";
    ctx.beginPath();
    ctx.arc(960 / 2, 540 / 2, 100 + Math.sin(position / 70) * 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillText("le sun", 960 / 2 + 120, 540 / 2 + 8);
    drawSpaceShip(shipX, shipY, shipAngle);
};
const nextFrame = (now) => {
    prevFrameTimestamp = prevFrameTimestamp || now;
    const delta = now - (prevFrameTimestamp || now);
    prevFrameTimestamp = now;
    position += delta / 20;
    updateSpaceship(delta);
    draw();
    canvas.getContext("2d").drawImage(backbuffer, 0, 0);
    requestAnimationFrame(nextFrame);
};
window.requestAnimationFrame(nextFrame);
d.appendChild(canvas);
document.body.appendChild(d);
