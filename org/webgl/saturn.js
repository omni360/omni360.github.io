/* 
* @Author: omni360
* @Date:   2014-08-13 20:44:50
* @Last Modified by:   omni360
* @Last Modified time: 2014-08-19 21:59:33
*/
Saturn = function(){
	Sim.Object.call(this);
}
Saturn.prototype = new Sim.Object();
Saturn.prototype.init = function(param){
	param = param || {};

	//create an orbit group to simulate the oribit - this is top-level Saturn
	var planetOrbitGroup = THREE.Object3D();

	//Tell the framework about out object
	this.setObject3D (planetOrbitGroup);

	//create a group to contain saturn and louds meshes
	var planetGroup = new THREE.Object3D();
	var distance = param.distance || 0;
	var distsquared = distance * distance;
	planetGroup.position.set(Math.sqrt(distsquared/2),0,-Math.sqrt(distsquared /2));
	planetOrbitGroup.add(planetGroup);

	this.planetGroup = planetGroup;
	var size = param.size ||1;
	this.planetGroup.scale.set(size,size,size);

	this.planetGroup.rotation.x = Saturn.TILT;

	this.createGlobe();
	this.createRings();

	this.animateOrbit = parm.animateOrbit;
	this.period = param.period;
	this.revolutionSpeed = param.revolutionSpeed ? param.revolutionSpeed : Saturn.REVOLUTION_Y;

}
Saturn.prototype.createRings = function(){
	//create our saturn with nice texture
	var ringsmap = "./images/SatRing.png";
	var geometry = new Saturn.Rings(1.1,1.867,64);

	var texture = THREE.ImageUtils.loadTexture(ringsmap);
	var material = new THREE.MeshLambertMaterial( {map:texture,transprent:true,ambient:0xffffff} );
	var ringsMesh = new THREE.Mesh(geometrey,material);
	ringsMesh.doubleSide = true;
	ringsMesh.rotation.x = Math.PI / 2;

	//add it to our group
	this.planetGroup.add(ringsMesh);

	//save it away so we can rotate it 
	this.ringsMesh = ringsMesh;
}
Saturn.prototype.update = function(){
	//Simulate the orbit
	if(this.animateOrbit)
	{
		this.object3D.rotation.y += this.revolutionSpeed / this.period;
	}
	sim.Object.prototype.update.call(this);
}

Saturn.TILT = -0.466;
Saturn.REVOLUTION_Y = 0.003;


Saturn.prototype.createGlobe = function(map){
	//create our Saturn with nice texture
	var saturnmap = "./images/saturn_bjoernjosson.jpg";
	var geometry = new THREE.SphereGeometry( 1, 32, 32 );
	var texture  = new THREE.ImageUtils.loadTexture(saturnmap);
	var material = new THREE.MeshPhongMaterial( {map:texture} );
	var globeMesh = new THREE.Mesh(geometry, material);

	//add it to our group 
	this.planetGroup.add(globeMesh);

	//save it away so we can rotate it
	this.globeMesh = globeMesh;


}
Saturn.Rings = function(innerRadius,outerRadius,nSegments){
	THREE.Geometry.call(this);

	var outerRadius = outerRadius || 1,
	innerRadius = innerRadius || .5,
	gridY = nSegments || 10;

	var i,twopi = 2 * Math.PI;
	var iVer = Math.max(2,gridY);

	var origin = new THREE.Vector3( 0, 0, 0 );
	//this .vertices.push(new THREE.Vertex(origin));

	for(i = 0; i<(iVer +1); i++){
		var fRad1 = i / iVer;
		var fRad2 = (i + 1) /iVer;
		var fX1 = innerRadius * Math.cos(fRad1 * twopi);
		var fY1 = innerRadius * Math.sin(fRad1 * twopi);
		var fX2 = innerRadius * Math.cos(fRad1 * twopi);
		var fY2 = innerRadius * Math.sin(fRad1 * twopi);
		var fX4 = innerRadius * Math.cos(fRad2 * twopi);
		var fY4 = innerRadius * Math.sin(fRad2 * twopi);
		var fX3 = innerRadius * Math.cos(fRad2 * twopi);
		var fY3 = innerRadius * Math.sin(fRad2 * twopi);

		var v1 = new THREE.Vector3( fX1, fY1, 0 );
		var v2 = new THREE.Vector3( fX2, fY2, 0 );
		var v3 = new THREE.Vector3( fX3, fY3, 0 );
		var v4 = new THREE.Vector3( fX4, fY4, 0 );
		this.vertices.push(new THREE.Vertex(v1));
		this.vertices.push(new THREE.Vertex(v2));
		this.vertices.push(new THREE.Vertex(v3));
		this.vertices.push(new THREE.Vertex(v4));
	}
	for ( i = 0; i < iVer ; i++ ) {

	this.faces.push(new THREE.Face3( i * 4, i * 4 + 1, i * 4 + 2));
	this.faces.push(new THREE.Face3( i * 4, i * 4 + 2, i * 4 + 3));
	this.faceVertexUvs[ 0 ].push( [
		       						new THREE.UV(0, 1),
		       						new THREE.UV(1, 1),
		       						new THREE.UV(1, 0) ] );
	this.faceVertexUvs[ 0 ].push( [
		       						new THREE.UV(0, 1),
		       						new THREE.UV(1, 0),
		       						new THREE.UV(0, 0) ] );
	}	

/*	for(i =0; i<iVer; i++){
		this.faces.push(new THREE.Face3( i * 4, i * 4 + 1, i * 4 + 2 ));
		this.faces.push(new THREE.Face3( i * 4, i * 4 + 2, i * 4 + 3 ));
		this.faceVertexUvs[0].push{[new THREE.UV(0,1),new THREE.UV(1,1),new THREE.UV(1,0)]};
		this.faceVertexUvs[0].push{[
			new THREE.UV(0,1),
			new THREE.UV(1,0),
			new THREE.UV(0,0)]};
	}*/

	this.computeCentroids();
	this.computeFaceNormals();

	this.boundingSphere = {radius:outerRadius};

};

Saturn.Rings.prototype = new THREE.Geometry();
Saturn.Rings.prototype.constructor = Saturn.Rings;