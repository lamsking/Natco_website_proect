var canvas = document.getElementById("scene");
console.log(canvas)
// Create scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.getElementById("scene").appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

var animate = function () {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );
};

animate();

// Functions

class _DataTransfer {
	constructor() {
		return new ClipboardEvent("").clipboardData || new DataTransfer();
	}
};

function createFile(name){
	var ts = new Date();
	ts.toString();
	var f = new File([""], name, {type: "image/jpeg", lastModified: ts});
	return f
};

function loadFiles(){
	$("tr").click(function(e) {
		   // Get associate files
			 var pathFile = $(this).attr('id').slice(0, -4);
			 var obj = pathFile+'.obj';
			 var mtl = pathFile+'.mtl';
			 var img = pathFile+'.jpg';

			 // Create File
			 var objFile = createFile(obj);
			 var mtlFile = createFile(mtl);
			 var imgFile = createFile(img);

			// Create FileList
			 const dt = new _DataTransfer();
			 dt.items.add(objFile);
			 dt.items.add(mtlFile);
			 dt.items.add(imgFile);

			 // Diplay object on console log
			 console.log(dt.files);

			 // Return files
			 return dt.files;

	 });
};

function addObject(object){

};
