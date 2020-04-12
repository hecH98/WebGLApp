function createCube(size, posx, posy, posz) {
	this.size = size;
	this.posx = posx;
	this.posy = posy;
	this.posz = posz;

	// this.vertices = [ 1. ,1., 1.,
	// 	-1., 1., 1.,
	// 	-1., -1., 1.,
	// 	1., -1., 1.,
	// 	1., -1., -1.,
	// 	1., 1., -1.,
	// 	-1., 1., -1.,
	// 	-1., -1., -1.
	// ];

	this.vertices = [(1. + posx) * size, (1. + posy) * size, (1. + posz) * size,
		(-1. + posx) * size, (1. + posy) * size, (1. + posz) * size,
		(-1. + posx) * size, (-1. + posy) * size, (1. + posz) * size,
		(1. + posx) * size, (-1. + posy) * size, (1. + posz) * size,
		(1. + posx) * size, (-1. + posy) * size, (-1. + posz) * size,
		(1. + posx) * size, (1. + posy) * size, (-1. + posz) * size,
		(-1. + posx) * size, (1. + posy) * size, (-1. + posz) * size,
		(-1. + posx) * size, (-1. + posy) * size, (-1. + posz) * size,
	];

	this.indices = [0, 1, 2, 0, 2, 3, // Front face
		0, 3, 4, 0, 4, 5, // Right face
		0, 5, 6, 0, 6, 1, // Top face
		1, 6, 7, 1, 7, 2, // Left face
		7, 4, 3, 7, 3, 2, // Bottom face
		4, 7, 6, 4, 6, 5 // Back face
	];
};

function createPyramid(base, height, posx, posy, posz) {
	this.base = base;
	this.height = height;
	this.posx = posx;
	this.posy = posy;
	this.posz = posz;

	// this.vertices = [ -1., 0., -1.,
	// 		-1., 0., 1.,
	// 		1., 0., 1.,
	// 		1., 0., -1.,
	// 		0., 1., 0.,
	// ];

	this.vertices = [ (-1.*base)+posx, (0.*base)+posy, (-1.*base)+posz,
		(-1.*base)+posx, (0.*base)+posy, (1.*base)+posz,
		(1.*base)+posx, (0.*base)+posy, (1.*base)+posz,
		(1.*base)+posx, (0.*base)+posy, (-1.*base)+posz,
		(0.*height)+posx, (1.*height)+posy, (0.*height)+posz
	];

	this.indices = [0, 1, 2, 3, 0, 4, 3, 2, 4, 1];
};

function createRectangle(base, height, posx, posy, posz) {
	this.base = base;
	this.height = height;
	this.posx = posx;
	this.posy = posy;
	this.posz = posz;

	// this.vertices = [2., 1., 1.,
	// 	-2., 1., 1.,
	// 	-2., -1., 1.,
	// 	2., -1., 1.,
	// 	2., -1., -1.,
	// 	2., 1., -1.,
	// 	-2., 1., -1.,
	// 	-2., -1., -1.		
	// ];

	this.vertices = [(1. + posx) * base, (1. + posy) * height, (0.5 + posz) * base,
		(-1. + posx) * base, (1. + posy) * height, (0.5 + posz) * base,
		(-1. + posx) * base, (-1. + posy) * height, (0.5 + posz) * base,
		(1. + posx) * base, (-1. + posy) * height, (0.5 + posz) * base,
		(1. + posx) * base, (-1. + posy) * height, (-0.5 + posz) * base,
		(1. + posx) * base, (1. + posy) * height, (-0.5 + posz) * base,
		(-1. + posx) * base, (1. + posy) * height, (-0.5 + posz) * base,
		(-1. + posx) * base, (-1. + posy) * height, (-0.5 + posz) * base,	
	];

	this.indices = [0, 1, 2, 0, 2, 3, // Front face
		0, 3, 4, 0, 4, 5, // Right face
		0, 5, 6, 0, 6, 1, // Top face
		1, 6, 7, 1, 7, 2, // Left face
		7, 4, 3, 7, 3, 2, // Bottom face
		4, 7, 6, 4, 6, 5 // Back face
	];
};