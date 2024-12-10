
const boardCreator = () => {
    let alphabet = ['A', 'B', 'C' ,'D' ,'E' ,'F' ,'G', 'H']
    let board = []

    const tile = {
        length: 500,
        width: 500,
        // material: planeMaterial,
    }

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

    console.log('BOARD - ', board)

    return board


}
