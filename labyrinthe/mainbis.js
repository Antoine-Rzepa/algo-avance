
let size = 15;
let type = "ex-0";


function showLabyrinthe() {


    var newLabyrinthe = document.getElementById("labyrinthe")
    newLabyrinthe.style.cssText = 'display: grid; grid: repeat(' + size + ',50px); width: ' + size * 50 + 'px'


    labyrinthes[size][type].forEach(room => {
        let newRoom = document.createElement("div");
        if (room.entrance) {
            newRoom.style.backgroundColor = "orange"
        }
        if (room.walls[0]) {
            newRoom.style.borderTop = "solid 1px red"
        }
        if (room.walls[1]) {
            newRoom.style.borderRight = "solid 1px red"
        }
        if (room.walls[2]) {
            newRoom.style.borderBottom = "solid 1px red"
        }
        if (room.walls[3]) {
            newRoom.style.borderLeft = "solid 1px red"
        }
        if (room.exit) {
            newRoom.style.backgroundColor = "green"
        }
        newRoom.id = 'room-' + labyrinthes[size][type].indexOf(room) + '';
        newRoom.style.width = "50px"
        newRoom.style.height = "50px"
        newRoom.style.gridRow = room.posX + 1
        newRoom.style.gridColumn = room.posY + 1
        newRoom.style.boxSizing = "border-box"
        newLabyrinthe.appendChild(newRoom);
    })

}

let startRoom;
let endRoom;

let labyrinthe = labyrinthes[size][type]
labyrinthe.forEach(room => {
    if (room.entrance) {
        startRoom = room;
    } else if (room.exit) {
        endRoom = room;
    }
    room.visited = false;
})

async function findWayIterative(labyrinthe, startRoom) {

    let path = [];
    let stack = [];
    stack.push(startRoom);

    while (stack.length !== 0) {
        let v = stack.pop()
        if (!v.entrance && !v.exit) {
            let vVisual = document.getElementById('room-' + labyrinthe.indexOf(v) + '')
            vVisual.style.backgroundColor = "purple"
        }
        await new Promise((resolve) => setTimeout(resolve, 100));
        if (!v.visited) {
            v.visited = true;
            if (!v.entrance && !v.exit) {
                let vVisual = document.getElementById('room-' + labyrinthe.indexOf(v) + '')
                vVisual.style.backgroundColor = "rgba(0, 128, 0,0.7)"
            }
            let d = [-size, 1, size, -1]
            let indexV = labyrinthe.indexOf(v);
            v.walls.forEach((wall, index) => {
                let indexW;
                if (!wall) {
                    indexW = indexV + d[index];
                    let w = labyrinthe[indexW]
                    if (!w.visited) {
                        w.parent = v
                        stack.push(w)
                    }
                }
            })
            if (v.exit) {
                while (v.parent){
                    let parent = v.parent;
                    path.push(parent)
                    v = parent;
                }
                path.forEach(cell => {
                    if(!cell.entrance){
                        let cellVisual = document.getElementById('room-' + labyrinthe.indexOf(cell) + '')
                        cellVisual.style.backgroundColor = "blue"
                    }
                })
                return path;
            }
        }
    }
    return undefined;
}


async function findWayRecursive(labyrinthe, v){
     if (!v.entrance && !v.exit) {
         let vVisual = document.getElementById('room-' + labyrinthe.indexOf(v) + '')
         vVisual.style.backgroundColor = "purple"
     }
    await new Promise((resolve) => setTimeout(resolve, 100));
    if (!v.visited) {
        v.visited = true;
        if (!v.entrance && !v.exit) {
            let vVisual = document.getElementById('room-' + labyrinthe.indexOf(v) + '')
            vVisual.style.backgroundColor = "rgba(0, 128, 0,0.7)"
        }
        if (v.exit) {
            return v;
        }
        let d = [-size, 1, size, -1];
        let indexV = labyrinthe.indexOf(v);
        for (const index in v.walls) {
            const wall = v.walls[index];
            let indexW;
            if (!wall) {
                indexW = indexV + d[index];
                let w = labyrinthe[indexW]
                if (!w.visited) {
                    w.parent = v;
                    let path = await findWayRecursive(labyrinthe, w)
                    if (path === w){
                        while (path.parent){
                            if(!path.parent.entrance){
                                let cellVisual = document.getElementById('room-' + labyrinthe.indexOf(path.parent) + '')
                                cellVisual.style.backgroundColor = "blue"
                            }
                            path = path.parent;
                        }
                    }
                }
            }
        }
    }

    return undefined;
}

