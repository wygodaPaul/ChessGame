let moves = [
    'ng1-f3',
    'pd7-d5',
    'pd2-d4',
    'pc7-c6',
    'pc2-c4',
    'pe7-e6',
    'nb1-d2',
    'ng8-f6',
    'pe2-e3',
    'nb8-d7',
    'bf1-d3',
    'bf8-d6',
    'pe3-e4',
    'pd5-e4',
    'nd2-e4',
    'nf6-e4',
    'bd3-e4',
    // '0-0',
    'ke1-g1',
    'rh1-f1'
,    // '0-0',
    'ke8-g8',
    'rh8-f8',
    'ph7-h6',
    'be4-c2',
    'pe6-e5',
    'rf1-e1',
    'pe5-e4',
    'qd1-d4',
    'bd6-c5',
    'qd4-c3',
    'pa7-a5',
    'pa2-a3',
    'nd7-f6',
    'bc1-e3',
    'bc5-e3',
    're1-e3',
    'bc8-g4',
    'nf3-e5',
    'rf8-e8',
    'ra1-e1',
    'bg4-e6',
    'pf2-f4',
    'qd8-c8',
    'ph2-h3',
    'pb7-b5',
    'pf4-f5',
    'be6-c4',
    'ne5-c4',
    'pb5-b4',
    're3-e8',
    'nf6-e8',
    're1-e4',
    'ne8-f6',
    're4-c4',
    'nf6-d5',
    'qc3-e5',
    'qc8-d7',
    'rc4-g4',
    'pf7-f6',
    'qe5-d4',
    'kg8-h7',
    'rg4-e4',
    'ra8-d8',
    'kg1-h1',
    'qd7-c7',
    'qd4-f2',
    'qc7-b8',
    'bc2-a4',
    'pc6-c5',
    'ba4-c6',
    'pc5-c4',
    're4-c4',
    'nd5-b4',
    'bc6-f3',
    'nb4-d3',
    'qf2-h4',
    'qb8-b2',
    'qh4-g3',
    'qb2-a3',
    'rc4-c7',
    'qa3-f8',
    'rc7-a7',
    'nd3-e5',
    'ra7-a5',
    'qf8-f7',
    'ra5-e5',
    'pf6-e5',
    'qg3-e5',
    'rd8-e8',
    'qe5-f4',
    'qf7-f6',
    'bf3-h5',
    're8-f8',
    'bh5-g6',
    'kh7-h8',
    'qf4-c7',
    'qf6-d4',
    'kh1-h2',
    'rf8-a8',
    'bg6-h5',
    'qd4-f6',
    'bh5-g6',
    'ra8-g8',
    ];

let moves2 = [
    'pe2-e4',
    'pe7-e5',
    'pd2-d4',
    'pd7-d5',
    'nb1-c3',
    'bf8-b4',
    'pa2-a3',
    'bb4-c3',
    'bc1-d2',
    'bc3-d4',
    'pc2-c3',
    'bd4-c5',
    'pb2-b4',
    'bc5-b6',
    'ng1-f3',
    'ng8-f6',
    'bd2-g5',
    'ph7-h5',
    'nf3-e5',
    'ph5-h4',
    'bf1-e2',
    'qd8-d6',
    'be2-b5',
    'pc7-c6',
    'bg5-f6',
    'qd6-f6',
    'qd1-d4',
    'bb6-d4',
    'pc3-d4',
    'pc6-b5',
    'pe4-d5',
    'nb8-d7',
    'ne5-f3',
    'nd7-b6',
    'ke1-g1',
    'rh1-f1',
    'nb6-d5',
    'rf1-e1',
    'bc8-e6',
    'nf3-e5',
    'be6-d7',
    'ne5-g4',
    'qf6-e7',
    're1-e7',
    'ke8-e7',
    'ra1-e1',
    'ke7-d6',
    'ng4-e5',
    'bd7-e6',
    're1-c1',
    'ra8-c8',
    'rc1-c5',
    'nd5-c3',
    'rc5-c8',
    'rh8-c8',
    'pf2-f4',
    'be6-d5',
    'kg1-f1',
    'rc8-a8',
    'pa3-a4',
    'pb5-a4',
    'kf1-f2',
    'pf7-f6',
    'ne5-g6',
    'nc3-b5',
    'kf2-e3',
    'ra8-e8',
    'ke3-d3',
    'bd5-e4',
    'kd3-c4',
    'nb5-a3',
    'kc4-c3',
    'be4-g6',
    'pg2-g3',
    'na3-b5',
    'kc3-c4',
    'pa7-a6',
    'ph2-h3',
    're8-c8',

]

let counter = 0
let groupPosition
let deadFigurePosition = -1
let moving = false
let distanceX 
let distanceZ 


const makeMove = (board) => {

    console.log(moves2[counter])
    let figure = moves2[counter].charAt(0)
    let moveFrom = moves2[counter].charAt(1).toUpperCase() + moves2[counter].charAt(2)
    let moveTo = moves2[counter].charAt(4).toUpperCase() + moves2[counter].charAt(5)

    // console.log('moveFrom -', moveFrom)
    // console.log('moveTo -', moveTo)
    let fieldStart = board.find(x => x.symbol === moveFrom)

    let fieldStop = board.find(x => x.symbol === moveTo)
    // console.log('fieldStart -', fieldStart)
    // console.log('fieldStop -', fieldStop)
    // console.log('allPawns', allPawns.children[0].position.x)
    
    if (!moving) {
        groupPosition = allPawns.children.findIndex(pawn => pawn.position.x === fieldStart.x && pawn.position.z === fieldStart.z)
        deadFigurePosition = allPawns.children.findIndex(pawn => pawn.position.x === fieldStop.x && pawn.position.z === fieldStop.z)
        // console.log('groupPosition - ', groupPosition)
        // console.log('deadFigurePosition - ', deadFigurePosition)
        distanceX = allPawns.children[groupPosition].position.x - fieldStop.x
        distanceZ = allPawns.children[groupPosition].position.z - fieldStop.z
        moving = true
    } else {

        let speed = 0.4

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
            console.log(board[s])
            console.log(board[e])
            board[s].figure = ''
            board[e].figure = allPawns.children[groupPosition].name.charAt(0).toLowerCase()
            console.log(board[s])
            console.log(board[e])

            if (deadFigurePosition !== -1) {
                allPawns.children[deadFigurePosition].position.x += 200
                allPawns.children[deadFigurePosition].position.y += 200
                allPawns.children[deadFigurePosition].position.z += 200

                deadFigurePosition = -1
            }
            counter++
            moving = false

            console.log(board)
        }
    }


    
}