function main() {
    // Retrieve the <canvas> element
    var canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return false;
    }

    // Get the rendering context for 2DCG
    var ctx = canvas.getContext('2d');

    ctx.fillRect(0, 0, canvas.width, canvas.height);

    document.getElementById('drawButton').addEventListener('click', handleDrawEvent);
    document.getElementById('drawOperationButton').addEventListener('click', handleDrawOperationEvent);
}

// function to handle the button click event
function handleDrawEvent() {
    var canvas = document.getElementById('example');
    var ctx = canvas.getContext('2d');

    // clear the canvas
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // read v1 inputs
    var x1 = parseFloat(document.getElementById('xInput').value);
    var y1 = parseFloat(document.getElementById('yInput').value);
    var v1 = new Vector3([x1, y1, 0]);

    // read v2 inputs
    var x2 = parseFloat(document.getElementById('xInput2').value);
    var y2 = parseFloat(document.getElementById('yInput2').value);
    var v2 = new Vector3([x2, y2, 0]);

    // draw both vectors
    drawVector(v1, "red");
    drawVector(v2, "blue");
}

function handleDrawOperationEvent() {
    var canvas = document.getElementById('example');
    var ctx = canvas.getContext('2d');

    // clear canvas
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // read v1 inputs
    var x1 = parseFloat(document.getElementById('xInput').value);
    var y1 = parseFloat(document.getElementById('yInput').value);
    var v1 = new Vector3([x1, y1, 0]);

    // read v2 inputs
    var x2 = parseFloat(document.getElementById('xInput2').value);
    var y2 = parseFloat(document.getElementById('yInput2').value);
    var v2 = new Vector3([x2, y2, 0]);

    // draw v1 and v2
    drawVector(v1, "red");
    drawVector(v2, "blue");

    // get selected operation and scalar if needed
    var operation = document.getElementById('operation').value;
    var scalar = parseFloat(document.getElementById('scalar').value);

    let result1, result2;

    switch (operation) {
        case "add":
            result1 = new Vector3([x1, y1, 0]).add(new Vector3([x2, y2, 0]));
            drawVector(result1, "green");
            break;
        case "sub":
            result1 = new Vector3([x1, y1, 0]).sub(new Vector3([x2, y2, 0]));
            drawVector(result1, "green");
            break;
        case "mul":
            result1 = new Vector3([x1, y1, 0]).mul(scalar);
            result2 = new Vector3([x2, y2, 0]).mul(scalar);
            drawVector(result1, "green");
            drawVector(result2, "green");
            break;
        case "div":
            if (scalar !== 0) {
                result1 = new Vector3([x1, y1, 0]).div(scalar);
                result2 = new Vector3([x2, y2, 0]).div(scalar);
                drawVector(result1, "green");
                drawVector(result2, "green");
            } else {
                alert("Cannot divide by zero!");
            }
            break;
        case "magnitude":
            console.log("Magnitude of v1: ", v1.magnitude());
            console.log("Magnitude of v2: ", v2.magnitude());
            break;
        case "normalize":
            result1 = new Vector3(v1.elements).normalize();
            result2 = new Vector3(v2.elements).normalize();
            drawVector(result1, "green");
            drawVector(result2, "green");
            break;
        case "angle":
            const angle = angleBetween(v1, v2);
            if (angle !== null) {
                console.log("Angle between v1 and v2:", angle.toFixed(2), "degrees");
            } else {
                console.log("Cannot compute angle (one of the vectors is zero-length).");
            }
            break;
        case "area":
            const area = areaTriangle(v1, v2);
            console.log("Area of triangle formed by v1 and v2:", area.toFixed(2));
            break;
        default:
            alert("Unknown operation");
    }
}

function angleBetween(v1, v2) {
    const dotProd = Vector3.dot(v1, v2);
    const mag1 = v1.magnitude();
    const mag2 = v2.magnitude();

    if (mag1 === 0 || mag2 === 0) return null; // prevent division by zero

    const cosTheta = dotProd / (mag1 * mag2);

    // angle in radians
    const angleRad = Math.acos(Math.min(Math.max(cosTheta, -1), 1));

    // angle in degrees
    const angleDeg = angleRad * (180 / Math.PI);

    return angleDeg;
}

function areaTriangle(v1, v2) {
    const crossProd = Vector3.cross(v1, v2);
    const mag = crossProd.magnitude();

    // area of triangle will be half of area of parallelogram
    return 0.5 * mag;
}

// function to draw a vector on the canvas
function drawVector(v, color) {
    var canvas = document.getElementById('example');
    var ctx = canvas.getContext('2d');

    // set drawing color
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    // start at center of canvas (200, 200)
    ctx.beginPath();
    ctx.moveTo(200, 200);

    // scale the vector components by 20 for better visualization
    var scaledX = v.elements[0] * 20;
    var scaledY = v.elements[1] * 20;

    // draw the vector using lineTo to create a line to the vector endpoint
    ctx.lineTo(200 + scaledX, 200 - scaledY); // using 200 for center

    ctx.stroke();
}
