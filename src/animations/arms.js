

var armMovement=function(scene, upperArm, lowerArm){

    var mat = upperArm.getLocalMatrix();
    mat = mat.multiply(BABYLON.Matrix.RotateY(0.5));

    upperArm.updateMatrix(mat);

};