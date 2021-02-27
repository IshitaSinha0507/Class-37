class Game{
    constructor(){

    }
    getState(){
        var gamestateref = database.ref('gameState');
        gamestateref.on("value",function(data){
            gameState = data.val();
        
        })
    }
    update(state){
        database.ref('/').update({
            gameState:state
        })

    }
    async start(){
        if(gameState === 0){
            Player = new player();
            var pcref = await database.ref('playerCount').once("value");
            if(pcref.exists()){
                playerCount = pcref.val();
                Player.getCount();
            }
            
            form = new Form();
            form.display();
        }
    }
    play(){
        form.hide();
        textSize(30);
        text("Game Start",120,100);
        player.getPlayerinfo();
        if(allplayers !== undefined){
            var displayposition = 130;
            for(var plr in allplayers){
                if(plr === "player"+Player.index)
                    fill("red");
                else
                    fill("black");
                displayposition = displayposition + 20;
                textSize(15);
                text(allplayers[plr].name + ":"+allplayers[plr].distance,120,displayposition);
            }
        }
        if(keyIsDown(UP_ARROW)&& Player.index !== null){
            Player.distance += 50;
            Player.update();

        }
    }
}