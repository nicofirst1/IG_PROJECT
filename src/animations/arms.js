var moveArms = false;
var phase1Arms = true;
var phase2Arms = false;


var armAngle = 0;
var armInc = -0.1;


var chargedForJump = false;


var beforeRenderArms=function () {


    var maxUpper = 0.8;


    if (moveArms) {

        if (armAngle<maxUpper && phase1Arms){
           if(armInc<0)armInc=-armInc;

        }
        else {
            if(armInc>0) armInc=-armInc;
            phase1Arms=false;
            phase2Arms=true;
        }

        if(armAngle>-maxUpper && phase2Arms){
            if(armInc>0) armInc=-armInc;
        }
        else{
            if(armInc<0) armInc=-armInc;
            phase1Arms=true;
            phase2Arms=false;

        }


        upperArmRight.rotate(BABYLON.Axis.Z, armInc);
        upperArmLeft.rotate(BABYLON.Axis.Z, -armInc);
        armAngle += armInc;

    }
    else{
        armAngle=round(armAngle,3);

        if(armAngle>0){
            if(armInc>0) armInc=-armInc;
            upperArmRight.rotate(BABYLON.Axis.Z, armInc);
            upperArmLeft.rotate(BABYLON.Axis.Z, -armInc);
            armAngle += armInc;
        }
        else if(armAngle<0){
            if(armInc<0) armInc=-armInc;
            upperArmRight.rotate(BABYLON.Axis.Z, armInc);
            upperArmLeft.rotate(BABYLON.Axis.Z, -armInc);
            armAngle += armInc;
        }

    }
};

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}
