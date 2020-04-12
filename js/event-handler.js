// Button Events
function clickButtonAutoFocusEventListener(event)
{
	document.getElementById("label-msg").innerHTML = "AUTO-FOCUS Button clicked!";
}
function clickButtonOrbitEventListener(event)
{
	// First Call RESET
	orbitCamera = true;
}
function clickButtonPauseEventListener(event)
{
	orbitCamera = false;
	// document.getElementById("label-msg").innerHTML = "PAUSE Button clicked!";
}
function clickButtonHomeEventListener(event)
{
	home = true;
	orbitCamera = false;
	buffersVBO = [];
	buffersIBO = [];

	// reseting camera transformation
	document.getElementById("range-panX").value = 0;
	document.getElementById("range-panY").value = 0;
	document.getElementById("range-zoom").value = 0;
	document.getElementById("label-range-panX").innerHTML = 0;
	document.getElementById("label-range-panY").innerHTML = 0;
	document.getElementById("label-range-zoom").innerHTML = 0;

	// reseting cube
	document.getElementById("text-size-cube").value = 1;
	document.getElementById("text-cube-posx").value = 0
	document.getElementById("text-cube-posy").value = 0;
	document.getElementById("text-cube-posz").value = 0;

	// reseting pyramid
	document.getElementById("text-pyramid-base").value = 1;
	document.getElementById("text-pyramid-height").value = 1;
	document.getElementById("text-pyramid-posx").value = 0
	document.getElementById("text-pyramid-posy").value = 0;
	document.getElementById("text-pyramid-posz").value = 0;

	// reseting rectangle
	document.getElementById("text-rectangle-base").value = 2;
	document.getElementById("text-rectangle-height").value = 1;
	document.getElementById("text-rectangle-posx").value = 0
	document.getElementById("text-rectangle-posy").value = 0;
	document.getElementById("text-rectangle-posz").value = 0;

}

// Range Events
function inputRangePanXEventListener(event)
{
	var sliderValue = Number(document.getElementById("range-panX").value);
	// Update Camera
	xEye = xEyeIni + sliderValue;
	xTarget = xTargetIni + sliderValue;
	var eye = [xEye, yEyeIni, zEyeIni];
	var target = [xTarget, yTargetIni, zTargetIni];
	var up = [xUpIni, yUpIni, zUpIni];
	var cameraMatrix = glMatrix.mat4.create();	// M-camera = I
	glMatrix.mat4.lookAt(cameraMatrix, eye, target, up);
	var uCameraMatrixLocation = gl.getUniformLocation(shaderProgram, "uCameraMatrix");
	gl.uniformMatrix4fv(uCameraMatrixLocation, false, cameraMatrix);
	// Update GUI
	document.getElementById("label-range-panX").innerHTML = sliderValue;
	document.getElementById("label-xEye").innerHTML = eye[0].toFixed(1);
	document.getElementById("label-xTarget").innerHTML = target[0].toFixed(1);
}
function inputRangePanYEventListener(event)
{
	var sliderValue = Number(document.getElementById("range-panY").value);
	yEye = yEyeIni + sliderValue;
	yTarget = yTargetIni + sliderValue;
	var eye = [xEyeIni, yEye, zEyeIni];
	var target = [xTargetIni, yTarget, zTargetIni];
	var up = [xUpIni, yUpIni, zUpIni];
	var cameraMatrix = glMatrix.mat4.create();	// M-camera = I
	glMatrix.mat4.lookAt(cameraMatrix, eye, target, up);
	var uCameraMatrixLocation = gl.getUniformLocation(shaderProgram, "uCameraMatrix");
	gl.uniformMatrix4fv(uCameraMatrixLocation, false, cameraMatrix);
	document.getElementById("label-range-panY").innerHTML = sliderValue;
}
function inputRangeZoomEventListener(event)
{
	var sliderValue = Number(document.getElementById("range-zoom").value);
	zEye = zEyeIni + sliderValue;
	zTarget = zTargetIni + sliderValue;
	var eye = [xEyeIni, yEyeIni, zEye];
	var target = [xTargetIni, yTargetIni, zTarget];
	var up = [xUpIni, yUpIni, zUpIni];
	var cameraMatrix = glMatrix.mat4.create();	// M-camera = I
	glMatrix.mat4.lookAt(cameraMatrix, eye, target, up);
	var uCameraMatrixLocation = gl.getUniformLocation(shaderProgram, "uCameraMatrix");
	gl.uniformMatrix4fv(uCameraMatrixLocation, false, cameraMatrix);
	document.getElementById("label-range-zoom").innerHTML = sliderValue;
}

// Buttons Cube
function clickButtonCubeEventListener(event) {
	var size = parseFloat(document.getElementById("text-size-cube").value);
	var posx = parseFloat(document.getElementById("text-cube-posx").value);
	var posy = parseFloat(document.getElementById("text-cube-posy").value);
	var posz = parseFloat(document.getElementById("text-cube-posz").value);
	console.log("size: ", size);
	console.log("posx: ", posx);
	console.log("posy: ", posy);
	console.log("posz: ", posz);
	var cube = new createCube(size, posx, posy, posz);
	var newVertices = cube.vertices;
	var newIndices = cube.indices;
	buffersVBO.push(newVertices);
	buffersIBO.push(newIndices);
	console.log(newVertices);
	console.log(newIndices);
	console.log("vbo",buffersVBO);
	console.log("ibo",buffersIBO);
	render();
}

// Buttons Pyramid
function clickButtonPyramidEventListener(event) {
	var base = parseFloat(document.getElementById("text-pyramid-base").value);
	var height = parseFloat(document.getElementById("text-pyramid-height").value);
	var posx = parseFloat(document.getElementById("text-pyramid-posx").value);
	var posy = parseFloat(document.getElementById("text-pyramid-posy").value);
	var posz = parseFloat(document.getElementById("text-pyramid-posz").value);
	console.log("base: ", base);
	console.log("height: ", height);
	console.log("posx: ", posx);
	console.log("posy: ", posy);
	console.log("posz: ", posz);
	var pyramid = new createPyramid(base, height, posx, posy, posz);
	var newVertices = pyramid.vertices;
	var newIndices = pyramid.indices;
	buffersVBO.push(newVertices);
	buffersIBO.push(newIndices);
	console.log(newVertices);
	console.log(newIndices);
	console.log("vbo",buffersVBO);
	console.log("ibo",buffersIBO);
	render();
}

// Buttons Rectangle
function clickButtonRectangleEventListener(event) {
	var base = parseFloat(document.getElementById("text-rectangle-base").value);
	var height = parseFloat(document.getElementById("text-rectangle-height").value);
	var posx = parseFloat(document.getElementById("text-rectangle-posx").value);
	var posy = parseFloat(document.getElementById("text-rectangle-posy").value);
	var posz = parseFloat(document.getElementById("text-rectangle-posz").value);
	console.log("base: ", base);
	console.log("height: ", height);
	console.log("posx: ", posx);
	console.log("posy: ", posy);
	console.log("posz: ", posz);
	var rectangle = new createRectangle(base, height, posx, posy, posz);
	var newVertices = rectangle.vertices;
	var newIndices = rectangle.indices;
	buffersVBO.push(newVertices);
	buffersIBO.push(newIndices);
	console.log(newVertices);
	console.log(newIndices);
	console.log("vbo",buffersVBO);
	console.log("ibo",buffersIBO);
	render();
}

function initEventHandler(event)
{
	// Buttons
	document.getElementById("button-auto-focus").addEventListener("click", clickButtonAutoFocusEventListener, false);
	document.getElementById("button-orbit").addEventListener("click", clickButtonOrbitEventListener, false);
	document.getElementById("button-pause").addEventListener("click", clickButtonPauseEventListener, false);
	document.getElementById("button-home").addEventListener("click", clickButtonHomeEventListener, false);

	// Range Sliders
	document.getElementById("range-panX").addEventListener("input", inputRangePanXEventListener, false);
	document.getElementById("range-panY").addEventListener("input", inputRangePanYEventListener, false);
	document.getElementById("range-zoom").addEventListener("input", inputRangeZoomEventListener, false);

	// Buttons Cube
	document.getElementById("button-cube").addEventListener("click", clickButtonCubeEventListener, false);

	// Buttons Pyramid
	document.getElementById("button-pyramid").addEventListener("click", clickButtonPyramidEventListener, false);

	// Buttons rectangle
	document.getElementById("button-rectangle").addEventListener("click", clickButtonRectangleEventListener, false);

}

