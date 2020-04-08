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

	// reseting camera transformation
	document.getElementById("range-panX").value = 0;
	document.getElementById("range-panY").value = 0;
	document.getElementById("range-zoom").value = 0;
	document.getElementById("label-range-panX").innerHTML = 0;
	document.getElementById("label-range-panY").innerHTML = 0;
	document.getElementById("label-range-zoom").innerHTML = 0;

	// reseting cameras parameters
	document.getElementById("label-xEye").innerHTML = "0.0";
	document.getElementById("label-yEye").innerHTML = "0.0";
	document.getElementById("label-zEye").innerHTML = "1.0";

	document.getElementById("label-xTarget").innerHTML = "0.0";
	document.getElementById("label-yTarget").innerHTML = "0.0";
	document.getElementById("label-zTarget").innerHTML = "0.0";

	document.getElementById("label-xUp").innerHTML = "0.0";
	document.getElementById("label-yUp").innerHTML = "1.0";
	document.getElementById("label-zUp").innerHTML = "0.0";

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

// Radio Button Events
function inputRadioMEventListener(event)
{
	document.getElementById("label-msg").innerHTML = "Radio-M Selected";
}
function inputRadioCmEventListener(event)
{
	document.getElementById("label-msg").innerHTML = "Radio-CM Selected";
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
}

