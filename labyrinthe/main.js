
let size = 17;


function showLabyrinthe() {


    var newLabyrinthe = document.getElementById("labyrinthe")
    newLabyrinthe.style.cssText = 'display: grid; grid: repeat(' + size + ',50px); width: ' + size * 50 + 'px'


    labyrinthes[size]["ex-2"].forEach(room => {
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
        newRoom.id = 'room-' + labyrinthes[size]["ex-2"].indexOf(room) + '';
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
let actualRoom;

let labyrinthe = labyrinthes[size]["ex-2"]
labyrinthe.forEach(room => {
    if (room.entrance) {
        startRoom = room;
    } else if (room.exit) {
        endRoom = room;
    }
    room.visited = false;
})

async function findWay(labyrinthe, startRoom) {

    console.log(labyrinthe);
    let path = [];
    let stack = [];
    stack.push(startRoom);

    while (stack.length !== 0) {
        let v = stack.pop()
        if (!v.entrance && !v.exit) {
            let vVisual = document.getElementById('room-' + labyrinthe.indexOf(v) + '')
            vVisual.style.backgroundColor = "purple"
        }
        path.push(v)
        await new Promise((resolve) => setTimeout(resolve, 100));
        if (!v.visited) {
            v.visited = true;
            if (!v.entrance && !v.exit) {
                let vVisual = document.getElementById('room-' + labyrinthe.indexOf(v) + '')
                vVisual.style.backgroundColor = "rgba(0, 128, 0,0.7)"
            }
            let d = [-size, 1, size, -1]
            let indexV = labyrinthe.indexOf(v);
            v.neighboursCount = 0;
            v.walls.forEach((wall, index) => {
                let indexW;
                if (!wall) {
                    indexW = indexV + d[index];
                    let w = labyrinthe[indexW]
                    if (!w.visited) {
                        w.parent = v
                        v.neighboursCount++;
                        stack.push(w)
                        //path.push(w)
                    }
                }
            })
            if (v.neighboursCount===0) {
                while(path[path.length-1].neighboursCount<2) {
                    path.pop();
                }
            }
            if (v.exit) {
                path.forEach(cell => {
                    let cellVisual = document.getElementById('room-' + labyrinthe.indexOf(cell) + '')
                    cellVisual.style.backgroundColor = "blue"
                })
                console.log(path)
                return path;
            }
        }
    }
    return undefined;
}

