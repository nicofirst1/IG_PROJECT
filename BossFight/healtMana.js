var healt_value=100;
var healt_bar;
var healt_text;


var mana_value=100;
var mana_bar;
var mana_text;


var ignoreCollision=["ground","arm","groundBox"]; //meshes to ignore for collisions
var damages={
    bulletFireballRest:1,
    metheorite:30,
}


var initHealtMana=function (scene, camera) {



    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("gameUI",true,scene);

    healtBar(scene,advancedTexture);
    manaBar(scene,advancedTexture);

    camera.onCollide = function(collidedMesh) {

        //ignore collision with sepcific meshes
        for (var idx in ignoreCollision){
            if (collidedMesh.id===ignoreCollision[idx]){
                return;
            }
        }
        console.log(collidedMesh.id);

        if (collidedMesh.id==="metheorite"){

            update_healt(-damages.metheorite);


        }

        if(collidedMesh.id==="bulletFireballRest"){
            update_healt(-damages.bulletFireballRest)
        }


    }
};




var update_healt=function (value) {
    healt_value+=value;
    healt_bar.width=5*healt_value+"px";
    healt_text.text=healt_value+"/100";

};

var update_mana=function (new_value) {
    mana_value=new_value;

};

var healtBar= function (scene,advancedTexture) {


    healt_bar = new BABYLON.GUI.Rectangle();
    healt_bar.width = "500px";
    healt_bar.height = "40px";
    healt_bar.cornerRadius = 0;
    healt_bar.color = "Orange";
    healt_bar.thickness = 4;
    healt_bar.background = "red";
    healt_bar.top="10px";

    healt_bar.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    healt_bar.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;

    var healt_bk = new BABYLON.GUI.Rectangle();
    healt_bk.width = "500px";
    healt_bk.height = "40px";
    healt_bk.cornerRadius = 0;
    healt_bk.color = "gray";
    healt_bk.thickness = 4;
    healt_bk.background = "gray";
    healt_bk.top="10px";

    healt_bk.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    healt_bk.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;

    healt_text=new BABYLON.GUI.TextBlock();
    healt_text.text="100/100";
    healt_text.color="white";
    healt_text.fontSize=24;
    healt_text.top="15px";

    healt_text.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    healt_text.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    healt_text.paddingLeft="200px";

    advancedTexture.addControl(healt_bk);
    advancedTexture.addControl(healt_bar);
    advancedTexture.addControl(healt_text);


};


var manaBar= function (scene, advancedTexture) {


    mana_bar = new BABYLON.GUI.Rectangle();
    mana_bar.width = "500px";
    mana_bar.height = "40px";
    mana_bar.cornerRadius = 0;
    mana_bar.color = "#429cff";
    mana_bar.thickness = 4;
    mana_bar.background = "#1f36ff";
    mana_bar.top="55px";
    mana_bar.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    mana_bar.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;

    var mana_bk = new BABYLON.GUI.Rectangle();
    mana_bk.width = "500px";
    mana_bk.height = "40px";
    mana_bk.cornerRadius = 0;
    mana_bk.color = "#5e5e5e";
    mana_bk.thickness = 4;
    mana_bk.background = "#5e5e5e";
    mana_bk.top="55px";
    mana_bk.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    mana_bk.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;

    mana_text=new BABYLON.GUI.TextBlock();
    mana_text.text="100/100";
    mana_text.color="white";
    mana_text.fontSize=24;
    mana_text.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    mana_text.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    mana_text.paddingLeft="200px";
    mana_text.paddingTop="60";

    advancedTexture.addControl(mana_bk);
    advancedTexture.addControl(mana_bar);
    advancedTexture.addControl(mana_text);


};