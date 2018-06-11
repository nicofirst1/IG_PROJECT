var ground_x = 500;
var ground_y = 500;
var ground_max_z = 70;// the maximum for the ground height map
var ground_min_z = 0; // the minimum for the ground height map
var sky_size = 10000.0; //the size of the skybox
var texture_scale = 8;//bigger values apply more texture on ground (becomes smaller)
var subdivisions = 124; // allows you to increase the complexity of your mesh in order to improve the visual quality of it
var ambient_fog = false;
var water_color = "#0f38da";
var snow_flag=false;


var mapInit = function (scene, light, shadow, camera) {

    var skybox = initSkybox(scene, sky_size);

    if (ambient_fog) {
        scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
        scene.fogColor = new BABYLON.Color3(0.9, 0.9, 0.85);
        scene.fogDensity = 0.01;
    }


    if (snow_flag) {
        snow(scene, skybox);
    }

    var grounds = initGround(scene, ground_x, ground_y);

    initWater(scene, water_color, skybox, grounds);

    return grounds;
};

