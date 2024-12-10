import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { moves } from './movment';

let scene, camera, renderer, ambientLight, directionalLight, allPawns
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

const boardCreator = () => {
    let alphabet = ['A', 'B', 'C' ,'D' ,'E' ,'F' ,'G', 'H']
    let board = []

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let planeMaterial = new THREE.MeshPhongMaterial({color: (i+j)%2 === 0 ? 0xFFFFFF : 0x110000})
            let planeGeometry = new THREE.BoxGeometry( 10, 1, 10 )
            let plane = new THREE.Mesh( planeGeometry, planeMaterial )
            plane.position.x += 10 * i
            plane.position.y = 0
            plane.position.z += 10 * j

            board.push({
                symbol: alphabet[j] + (i+1),
                x: 10*i,
                z: 10*j,
                figure: null,
                figureNumber: null,
                playable: true,
            })
            scene.add( plane );
        }

    }
    return board
}

const populateChessboard = (board) => {
    for (let i=0; i<64; i++) {
        let { whatFigure, figureNumber } = createFigure(i, board[i].x, board[i].z)
        board[i].figure = whatFigure
        board[i].figureNumber = figureNumber
    
    }

    return board
}

const createFigure =  (position, x, z) => {
    let figure

    switch(position) {
        case 0: figure = 'Rook'
        break;
        case 1: figure = 'Knight'
        break;
        case 2: figure = 'Bishop'
        break;
        case 3: figure = 'Queen'
        break;
        case 4: figure = 'King'
        break;
        case 5: figure = 'Bishop'
        break;
        case 6: figure = 'Knight'
        break;
        case 7: figure = 'Rook'
        break;
        case 63: figure = 'Rook'
        break;
        case 62: figure = 'Knight'
        break;
        case 61: figure = 'Bishop'
        break;
        case 60: figure = 'King'
        break;
        case 59: figure = 'Queen'
        break;
        case 58: figure = 'Bishop'
        break;
        case 57: figure = 'Knight'
        break;
        case 56: figure = 'Rook'
        break;
        default: figure = 'Pawn'
        break;
    }

    if (position > 15 && position < 48 ) {
        return {whatFigure: null, figureNumber: null }
    } 

    let id
    
    const loader = new OBJLoader()
    loader.load(`models/${figure}.obj`, function ( object  ) {
        const box = object 
        box.position.set(x, 0, z)
        box.castShadow = true
        box.receiveShadow = true
        box.rotation.y = Math.PI / 2
        box.name = figure
        id = box.id
        
        if (position > 47) {
            box.children[0].material.color.b = 0.1 
            box.children[0].material.color.r = 0.1 
            box.children[0].material.color.g = 0.1
            box.rotation.y = Math.PI / -2
        }
        allPawns.add(box)

    })

    return {whatFigure: figure[0].toLowerCase(), figureNumber: id}
}

let board = boardCreator()
board = populateChessboard(board)

let counter = 0
let groupPosition
let deadFigurePosition = -1
let moving = false
let distanceX 
let distanceZ 

const makeMove = (board) => {
    let moveFrom = moves[counter].charAt(1).toUpperCase() + moves[counter].charAt(2)
    let moveTo = moves[counter].charAt(4).toUpperCase() + moves[counter].charAt(5)

    let fieldStart = board.find(x => x.symbol === moveFrom)
    let fieldStop = board.find(x => x.symbol === moveTo)
    
    if (!moving) {
        groupPosition = allPawns.children.findIndex(pawn => pawn.position.x === fieldStart.x && pawn.position.z === fieldStart.z)
        deadFigurePosition = allPawns.children.findIndex(pawn => pawn.position.x === fieldStop.x && pawn.position.z === fieldStop.z)
        distanceX = allPawns.children[groupPosition].position.x - fieldStop.x
        distanceZ = allPawns.children[groupPosition].position.z - fieldStop.z
        moving = true
    } else {

        let speed = 0.15

        if (distanceX > 0) {
            allPawns.children[groupPosition].position.x -= speed
            distanceX -= speed
        } else {
            allPawns.children[groupPosition].position.x += speed
            distanceX += speed
        }

        if (distanceX > -1 && distanceX < 1) {
            allPawns.children[groupPosition].position.x = fieldStop.x
            distanceX = 0
        }
        if (distanceZ !== 0) {
            if (distanceZ > 0) {
                allPawns.children[groupPosition].position.z -= speed
                distanceZ -= speed
            } else {
                allPawns.children[groupPosition].position.z += speed
                distanceZ += speed
            }

            if (distanceZ > -1 && distanceZ < 1) {
                allPawns.children[groupPosition].position.z = fieldStop.z
                distanceZ = 0
            }
        }



        if (distanceX === 0 && distanceZ === 0) {
            let s = board.findIndex(g => g.symbol === moveFrom)
            let e = board.findIndex(g => g.symbol === moveFrom)
            board[s].figure = ''
            board[e].figure = allPawns.children[groupPosition].name.charAt(0).toLowerCase()

            if (deadFigurePosition !== -1) {
                allPawns.children[deadFigurePosition].position.x += 200
                allPawns.children[deadFigurePosition].position.y += 200
                allPawns.children[deadFigurePosition].position.z += 200

                deadFigurePosition = -1
            }
            counter++
            moving = false
            }
    }
}


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

    angle += 0.002; 
    camera.position.x = 40 + Math.sin( angle ) * -100
    camera.position.y = 50
    camera.position.z = 40 + Math.cos( angle ) * -100
    camera.lookAt( 40, 0, 40 )

    makeMove(board)
    

    renderer.render( scene, camera );
};


setTimeout( () => {
    animate()
},5000)
