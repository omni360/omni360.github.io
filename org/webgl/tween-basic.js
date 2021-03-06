/* 
* @Author: omni360
* @Date:   2014-08-20 17:36:56
* @Last Modified by:   omni360
* @Last Modified time: 2014-08-20 18:12:49
*/
//构造函数
TweenApp = function(){
	Sim.App.call(this);
}

//从sim。app继承
TweenApp.prototype = new Sim.App();

//自定义的初始化器
TweenApp.prototype.init= function(param){
	//调用超类的代码来建立场景，渲染器，和相机。
	Sim.App.prototype.init.call(this,param);
	//创建一个照射到球体上的点光源
	var light = new THREE.PointLight( 0xffffff, 1, 100 );
	light.position.set(0,0,20);
	this.scene.add(light);
	this.camera.position.z= 6.667;
	//创建球体对象并添加到sim框架中
	var movingBall = new MovingBall();
	movingBall.init();
	this.addObject(movingBall);
	this.movingBall = movingBall;
}

TweenApp.prototype.update = function(){
	TWEEN.update();
	Sim.App.prototype.update.call(this);
}
TweenApp.prototype.handleMouseUp = function(x,y){
	this.movingBall.animate();
}
//定制movingBall类
MovingBall =function(){
	Sim.Object.call(this);

}
MovingBall.prototype = new Sim.Object();
MovingBall.prototype.init = function(){
	//创建球体
	var BALL_TEXTURE = "./images/ball_texture.jpg";
	var geometry = new THREE.SphereGeometry( 1,32,32);
	var material = new THREE.MeshPhongMaterial( {map:THREE.ImageUtils.loadTexture(BALL_TEXTURE)} );
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.x = -3.333;

	//把对象反馈给框架
	this.setObject3D(mesh);

}
MovingBall.prototype.animate = function(){
	var newpos;
	if(this.object3D.position.x >0)
	{
		newpos = this.object3D.position.x - 6.667;
	}
	else
	{
		newpos = this.object3D.position.x + 6.667;
	}
	new TWEEN.Tween(this.object3D.position).to({
		x:newpos
	},2000).start();
}