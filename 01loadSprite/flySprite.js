/**
 * Loading Game Sprite
 */

    'use strict'
    // requestAnimationFrame for all browser by PaulIrish
    if(!window.requestAnimationFrame){
        window.requestAnimationFrame = webkitRequestAnimationFrame ||
                                      mzRequestAnimationFrame ||
                                      oRequestAnimationFrame ||
                                      msRequestAnimationFrame ||
                                      function (callback, element){
                                          setTimeout(callback, 1000/60);
                                      }

    }

    /** Game Time getter*/
    function gTime(){
        return window.performance && window.performance.now() ? window.performance.now() : new Date().getTime();
    }// end gTime

    let Game = {
        c : undefined, // game canvas
        ctx : undefined, // game context
        bgSpr: undefined, // background Sprite
        shipSpr: undefined, // ship sprite
        shipPos: {x: 500, y: 0}
    };

    Game.start = function (){
        Game.c = document.getElementById("flyCanvas");
        Game.ctx = Game.c.getContext("2d");

        // load the image
        Game.bgSpr = new Image();
        Game.bgSpr.src = "imgAsset/spr_background.jpg";
        Game.shipSpr = new Image();
        Game.shipSpr.src = "imgAsset/spr_ship.png";
        
        Game.mainLoop();
    }

    Game.drawImage = function(spr, pos){
        Game.ctx.save();
        Game.ctx.translate(pos.x, pos.y);
        Game.ctx.drawImage(spr, 0,0, spr.width, spr.height, 0, 0, spr.width, spr.height);
        Game.ctx.restore();
    }

    window.addEventListener('DOMContentLoaded', Game.start);



    Game.clearCanvas = function(){
        Game.ctx.clearRect(0,0, Game.c.width, Game.c.height);
    }

    Game.update = function(){
        Game.shipPos.y = (gTime() * 0.1) % Game.c.width ;
    }

    Game.draw = function(){
        Game.drawImage(Game.bgSpr, {width: 800, height: 480});
        Game.drawImage(Game.shipSpr, Game.shipPos);
    }

    Game.mainLoop = function(){
        Game.clearCanvas();
        Game.update();
        Game.draw();

        window.requestAnimationFrame(Game.mainLoop);
    }

  