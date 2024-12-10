


const populateChessboard = (board) => {
    for (i=0; i<64; i++) {
        let { whatFigure, figureNumber } = createFigure(i, board[i].x, board[i].z)
        board[i].figure = whatFigure
        board[i].figureNumber = figureNumber
    
    }

    return board
}

const cos = () => {}

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
     
    const loader = new THREE.OBJLoader()
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






















			