var fireballSound = [];


var initSounds = function (scene) {
    var fireballS2, fireballS3;

    fireballS2 = new BABYLON.Sound("fireballS2", "Resources/sounds/Fireball2.mp3", scene);
    fireballS3 = new BABYLON.Sound("fireballS3", "Resources/sounds/Fireball3.mp3", scene);

    fireballSound.push(fireballS2);
    fireballSound.push(fireballS3);

}