function createCube(size, posx, posy, posz) {
    this.size = size;
    this.posx = posx;
    this.posy = posy;
    this.posz = posz;
    this.vertices = [1., 1., 1., // V0
		-1., 1., 1., // v1
	 -1.,-1., 1.,  // V2
	  1., -1.,1.,
	  1., -1., -1.,
	  1., 1., -1.,
	 -1., 1., -1.,
	 -1., -1., -1.
	];

	this.indices = [0, 1, 2,  0, 2, 3, 	// Front face
		0, 3, 4,  0, 4, 5,	// Right face
		0, 5, 6,  0, 6, 1,	// Top face
		1, 6, 7,  1, 7, 2,	// Left face
		7, 4, 3,  7, 3, 2,	// Bottom face
		4, 7, 6,  4, 6, 5	// Back face
	   ];
};

function createSpehere(radius, posx, posy, posz) {
    this.radius = radius;
    this.posx = posx;
    this.posy = posy;
	this.posz = posz;
	
    this.vertices = [1., 1., 1., // V0
		-1., 1., 1., // v1
	 -1.,-1., 1.,  // V2
	  1., -1.,1.,
	  1., -1., -1.,
	  1., 1., -1.,
	 -1., 1., -1.,
	 -1., -1., -1.
	];

	this.indices = [0, 1, 2,  0, 2, 3, 	// Front face
		0, 3, 4,  0, 4, 5,	// Right face
		0, 5, 6,  0, 6, 1,	// Top face
		1, 6, 7,  1, 7, 2,	// Left face
		7, 4, 3,  7, 3, 2,	// Bottom face
		4, 7, 6,  4, 6, 5	// Back face
	   ];
};