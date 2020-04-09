function createPyramid(base, height, posx, posy, posz) {
	this.base = base;
	this.height = height;
    this.posx = posx;
    this.posy = posy;
    this.posz = posz;
	
	vertices = [ -1., 0., -1., 	// V0
		-1., 0., 1.,	// v1
		 1., 0., 1.,	// V2
		 1., 0., -1.,	// V3
		 0., 1., 0.	// V4
		];
		
	indices = [0, 1, 2, 3, 0, 4, 3, 2, 4, 1];
};