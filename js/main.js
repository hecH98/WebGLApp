"use strict"
var canvas;	
var gl;		// WebGL rendering context
var vertices, indices;
var shaderProgram
var orbitCamera;
var theta, deltaTheta;
var xEyeIni, yEyeIni, zEyeIni;			// Posición incial de la cámara
var xTargetIni, yTargetIni, zTargetIni;	// Target inicial de la cámara
var xUpIni, yUpIni, zUpIni;				// Orientación incial de la cámara
var xEye, yEye, zEye;					// Posición actual de la cámara		
var xTarget, yTarget, zTarget;	
var xUp, yUp, zUp;				
var home;
var vbo;
var arrayCube = [];

function init()
{
	// Init Scene
	// vertices = [0., 0.5, 0.,	// X0, y0, z0
	// 		    -0.5, -0.5, 0.,
	// 		     0.5, -0.5, 0.
	// 		    ];

	// indices =[0, 1, 2];
	// vertices = [0., 0., 0.,
	// 			0., 0.5, 0.,
	// 			-0.5, 0., 0.,
	// 			-0.5, 0.5, 0.
	// 		];  
	// indices =[1,2,3,4,1,0,4,6,8,3,8,6,4,1,9,5,6,9,7,3,7,9,5,0];	

	vertices = [1., 1., 1., // V0
		-1., 1., 1., // v1
	 -1.,-1., 1.,  // V2
	  1., -1.,1.,
	  1., -1., -1.,
	  1., 1., -1.,
	 -1., 1., -1.,
	 -1., -1., -1.
	];

	indices = [0, 1, 2,  0, 2, 3, 	// Front face
		0, 3, 4,  0, 4, 5,	// Right face
		0, 5, 6,  0, 6, 1,	// Top face
		1, 6, 7,  1, 7, 2,	// Left face
		7, 4, 3,  7, 3, 2,	// Bottom face
		4, 7, 6,  4, 6, 5	// Back face
	   ];
		
	

	// Init Parameters
	orbitCamera = false;
	home = false;
	theta = 0.;
	deltaTheta = 3. * Math.PI / 180.;
	// Init Rendering
	canvas = document.getElementById("canvas");
	gl = canvas.getContext("webgl");				// Get the WebGL rendering context (WebGL state machine)
	gl.clearColor(0., 0., 0., 1.);					// Set current color to clear buffers to BLACK
	gl.viewport(0, 0, canvas.width, canvas.height);	// Set the Viewport transformation

	// Init Shaders
	shaderProgram = createShaderProgram("vertexShader", "fragmentShader");
	gl.useProgram(shaderProgram);					// Set the current Shader Program to use

	// Init Buffers
	// VBO
	vbo = gl.createBuffer();
	var bufferType = gl.ARRAY_BUFFER;			// Buffer type to storage float data
	gl.bindBuffer(bufferType, vbo);				// Bind to a type of buffer
	var data = new Float32Array(vertices);		// Data to be storage in a Buffer (a raw device)
	var usage = gl.STATIC_DRAW;					// Used for drawing optimization
	gl.bufferData(bufferType, data, usage);		// Load data into the Buffer
	// IBO
	var ibo = gl.createBuffer();
	var bufferType = gl.ELEMENT_ARRAY_BUFFER;	// Buffer type to storage float data
	gl.bindBuffer(bufferType, ibo);				// Bind to a type of buffer
	var data = new Uint16Array(indices);		// Data to be storage in a Buffer (a raw device)
	var usage = gl.STATIC_DRAW;					// Used for drawing optimization
	gl.bufferData(bufferType, data, usage);		// Load data into the Buffer

	// Init Shaders Data
	// Init Uniform variables
	// uModelMatrix
	var uModelMatrixLocation = gl.getUniformLocation(shaderProgram, "uModelMatrix");
	var modelMatrix = glMatrix.mat4.create();	// M-model = I
	gl.uniformMatrix4fv(uModelMatrixLocation, false, modelMatrix);
	// uCameraMatrix
	xEyeIni = 0.;
	yEyeIni = 0.;
	zEyeIni = 5.;
	xTargetIni = 0.;
	yTargetIni = 0.;
	zTargetIni = 0.;
	xUpIni = 0.;
	yUpIni = 1.;
	zUpIni = 0.;

	xEye = xEyeIni;
	yEye =yEyeIni;;
	zEye = zEyeIni;
	xTarget = xTargetIni;
	yTarget = yTargetIni;
	zTarget = zTargetIni;
	xUp = xUpIni;
	yUp = yUpIni;
	zUp = zUpIni;

	var eye = [xEyeIni, yEyeIni, zEyeIni];
	var target = [xTargetIni, yTargetIni, zTargetIni];
	var up = [xUpIni, yUpIni, zUpIni];
	var cameraMatrix = glMatrix.mat4.create();	// M-camera = I
	glMatrix.mat4.lookAt(cameraMatrix, eye, target, up);
	var uCameraMatrixLocation = gl.getUniformLocation(shaderProgram, "uCameraMatrix");
	gl.uniformMatrix4fv(uCameraMatrixLocation, false, cameraMatrix);
	// uProjMatrix
	// Perspective projection
	var fovy = 60. * Math.PI / 180.;
	var aspect = canvas.width / canvas.height;
	var near = 0.1;
	var far = 1000.;
	var projMatrix = glMatrix.mat4.create();
	glMatrix.mat4.perspective(projMatrix, fovy, aspect, near, far);
	var uProjMatrixLocation = gl.getUniformLocation(shaderProgram, "uProjMatrix");
	gl.uniformMatrix4fv(uProjMatrixLocation, false, projMatrix);
	// Init Attribute variables	
	// "aPosition" attribute
	gl.useProgram(shaderProgram);				// Set the current Shader Program to use
	var bufferType = gl.ARRAY_BUFFER;			// Buffer type to storage float data
	gl.bindBuffer(bufferType, vbo);	// Bind to a type of buffer
	var aPositionLocation = gl.getAttribLocation(shaderProgram, "aPosition");	// Locate attribute position
	var index = aPositionLocation;				// index of the attribute location
	var size = 3; 								// The number of components per attribute
	var type = gl.FLOAT; 						// The data type of each component
	var normalized = false; 					// Whether integer values should be normalized
	var stride = 0; 							// Offset in bytes between consecutive attributes
	var offset = 0;								// Offset in bytes of the first attribute
	gl.vertexAttribPointer(index, size, type, normalized, stride, offset); // Tell Vertex Shader how to retrieve data from the Buffer
	gl.enableVertexAttribArray(aPositionLocation);	// Enable attribute
	
	// Init Events
	initEventHandler();
}

function render()
{
	// Clear the Color Buffer now using the current clear color
	gl.clear(gl.COLOR_BUFFER_BIT);
				
	// Draw scene
	var primitiveType = gl.LINE_STRIP;//gl.TRIANGLES;		// Primitive type to be rendered
	var count = indices.length;			// Number of elements (indices) to be rendered
	var type = gl.UNSIGNED_SHORT; 		// Value type in the element array buffer
	var offset = 0; 					// Bytes offset in the element array buffer
	gl.drawElements(primitiveType, count, type, offset);

	if (home) {
		// vertices = [0., 0.5, 0.,	// X0, y0, z0
		// 	-0.5, -0.5, 0.,
		// 	 0.5, -0.5, 0.
		// 	];
		vertices = [0.0, 1.0, 0.5, 		
			-0.5, 0.5, 0.5, 		
			-0.5, 0.0, 0.5, 		
			0.5, 0.0, 0.5, 		
			0.5, 0.5, 0.5, 		
			0.0, 1.0, -0.5, 		
			0.5, 0.5, -0.5, 		
			-0.5, 0.0, -0.5, 		
			0.5, 0.0, -0.5, 		
			-0.5, 0.5, -.5, 		
			0.0, 2.0, 0.5, 		
			0.5, 0.5, 0.5, 		
			0.5, 0.5, 0.5, 		
			0.0, 1.0, -0.5, 		
			0.5, 0.5, -0.5, 		
			0.5, 0.5, -0.5]; 

		xEye = xEyeIni;
		yEye =yEyeIni;;
		zEye = zEyeIni;
		xTarget = xTargetIni;
		yTarget = yTargetIni;
		zTarget = zTargetIni;
		xUp = xUpIni;
		yUp = yUpIni;
		zUp = zUpIni;
	
		var eye = [xEyeIni, yEyeIni, zEyeIni];
		var target = [xTargetIni, yTargetIni, zTargetIni];
		var up = [xUpIni, yUpIni, zUpIni];
		var cameraMatrix = glMatrix.mat4.create();
		glMatrix.mat4.lookAt(cameraMatrix, eye, target, up);
		var uCameraMatrixLocation = gl.getUniformLocation(shaderProgram, "uCameraMatrix");
		gl.uniformMatrix4fv(uCameraMatrixLocation, false, cameraMatrix);


		home = false;
	}

	if(orbitCamera)
	{
		// scene update
		theta = theta + deltaTheta;
		var radius = zEyeIni;
		var xEye = radius * Math.sin(theta);
		var zEye = radius * Math.cos(theta);
		var eye = [xEye, yEye, zEye];
		var target = [xTarget, yTarget, zTarget];
		var up = [xUpIni, yUpIni, zUpIni];
		var uCameraMatrixLocation = gl.getUniformLocation(shaderProgram, "uCameraMatrix");
		var cameraMatrix = glMatrix.mat4.create();	// M-camera = I
		glMatrix.mat4.lookAt(cameraMatrix, eye, target, up);
		gl.uniformMatrix4fv(uCameraMatrixLocation, false, cameraMatrix);

	}

	requestAnimationFrame(render);	// call next frame
}

function main()
{
	init();
	requestAnimationFrame(render);	// render loop
}
