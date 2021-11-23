function showLabyrinthe(){

    let size = 15;
    console.log(labyrinthes[size]["ex-0"])



    var newLabyrinthe = document.getElementById("labyrinthe")
    newLabyrinthe.style.cssText= 'display: grid; grid: repeat('+size+',50px); width: '+size*50+'px'


    labyrinthes[size]["ex-0"].forEach(room => {
        let newRoom = document.createElement("div");
        if(room.entrance){
            newRoom.style.backgroundColor = "orange"
        }
        if(room.walls[0]){
            newRoom.style.borderTop = "solid 1px red"
        }
        if(room.walls[1]){
            newRoom.style.borderRight = "solid 1px red"
        }
        if(room.walls[2]){
            newRoom.style.borderBottom = "solid 1px red"
        }
        if(room.walls[3]){
            newRoom.style.borderLeft = "solid 1px red"
        }
        if(room.exit){
            newRoom.style.backgroundColor = "green"
        }
        newRoom.id = 'room-'+labyrinthes["3"]["ex-0"].indexOf(room)+'';
        newRoom.style.width = "50px"
        newRoom.style.height = "50px"
        newRoom.style.gridRow = room.posX+1
        newRoom.style.gridColumn = room.posY+1
        newRoom.style.boxSizing = "border-box"
        newLabyrinthe.appendChild(newRoom);
    })

}
