
var ground_x=500;
var ground_y=500;
var ground_max_z=3;// the maximum for the ground height map
var ground_min_z=-3; // the minimum for the ground height map
var sky_size=10000.0; //the size of the skybox
var texture_scale=100;//bigger values apply more texture on ground (becomes smaller)
var subdivisions=100; // allows you to increase the complexity of your mesh in order to improve the visual quality of it
var ambient_fog=false;


var mapInit = function (scene) {

    // Skybox
    var skybox = BABYLON.Mesh.CreateBox("skyBox", sky_size, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("Resources/map/hw_lagoon/lagoon", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.backFaceCulling = false;
    //disable light to prevent sky reflections
    skyboxMaterial.disableLighting = true;
    //This makes the skybox follow our camera's position
    skybox.infiniteDistance = true;
    skybox.material = skyboxMaterial;

    //add fog
    if (ambient_fog){
    scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
    scene.fogColor = new BABYLON.Color3(0.9, 0.9, 0.85);
    scene.fogDensity = 0.01;}


    //Ground
    var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "Resources/map/height_map/height_map.png", ground_x,
        ground_y, subdivisions, ground_min_z, ground_max_z, scene, false);
    var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture("Resources/map/ground_texture/greybrickwall000.png", scene);
    groundMaterial.diffuseTexture.uScale = texture_scale;
    groundMaterial.diffuseTexture.vScale = texture_scale;
    groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    ground.position.y = -6.0;
    ground.material = groundMaterial;
    ground.receiveShadows = true;

    return ground;
};