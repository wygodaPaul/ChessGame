import * as THREE from 'three';

let scene, camera, renderer, ambientLight, directionalLight, allPawns
// const main = () => {
    scene = new THREE.Scene()
    allPawns = new THREE.Group()
    scene.add(allPawns)
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 )
    camera.position.x = 20
    camera.position.y = 50
    camera.position.z = 20
    renderer = new THREE.WebGLRenderer({ antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    ambientLight = new THREE.AmbientLight(0x606060);
    scene.add(ambientLight);
    
    directionalLight = new THREE.DirectionalLight( 0xffffb2, 1.0 );
    directionalLight.position.set( 0, 50, 0 );
    scene.add( directionalLight );
    

    // let board = boardCreator()
    // board = populateChessboard(board)


    var floor = new THREE.TextureLoader().load('img/blackCarpet.jpg'); 
    floor.repeat.set( 4,4); 
    floor.wrapS = THREE.RepeatWrapping; 
    floor.wrapT = THREE.RepeatWrapping; 
    floor.anisotropy = 16;  
    
    var planeMaterial = new THREE.MeshBasicMaterial({map: floor});
    var planeGeometry = new THREE.BoxGeometry( 3500, 1, 3500 )
    var	plane = new THREE.Mesh( planeGeometry, planeMaterial )
        plane.position.y -= 1024
        scene.add( plane );

        
	var room = new THREE.TextureLoader().load('img/room.jpg');
    room.repeat.set( 1,1); 
    room.wrapS = THREE.RepeatWrapping; 
    room.wrapT = THREE.RepeatWrapping; 
    room.anisotropy = 16

    var geometry = new THREE.CylinderGeometry(8*1024, 8*1024, 8*1024, 100, 100, true);
    var material = new THREE.MeshBasicMaterial( { map: room, side: THREE.BackSide } )
    var cylinder = new THREE.Mesh( geometry, material )

    cylinder.position.set(0,-1024,0)
    scene.add( cylinder )

    
    let angle = 0

    function animate() {
        requestAnimationFrame( animate );
    
        angle += 0.005; 
        camera.position.x = 40 + Math.sin( angle ) * -100
        camera.position.y = 50
        camera.position.z = 40 + Math.cos( angle ) * -100
        camera.lookAt( 40, 0, 40 )

        // makeMove(board)
        

        renderer.render( scene, camera );
    };

    
    setTimeout( () => {
        animate()
    },5000)


// }

// main()