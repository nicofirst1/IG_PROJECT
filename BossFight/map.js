
var ground_x=500;
var ground_y=500;
var ground_max_z=0;// the maximum for the ground height map
var ground_min_z=0; // the minimum for the ground height map
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
    skybox.layerMask = 2; // 010 in binary


    // Shadows stuff
    var defaultLight = new BABYLON.PointLight("Moon", light_position1, scene);

    defaultLight.intensity = 0.5;
    var dir = new BABYLON.DirectionalLight('dirLight', new BABYLON.Vector3(-0.5, -1, -0.5), this.scene);
    dir.position = new BABYLON.Vector3(40, 60, 40);
    var shadowGenerator = new BABYLON.ShadowGenerator(1024, dir);
    shadowGenerator.useBlurVarianceShadowMap = true;
    // Apply shadows on each mesh in the map
    scene.meshes.forEach(function (m) {

            m.receiveShadows = true;

    });


    //add fog
    if (ambient_fog){
    scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
    scene.fogColor = new BABYLON.Color3(0.9, 0.9, 0.85);
    scene.fogDensity = 0.01;}


    //Ground
    //var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "Resources/map/height_map/height_map.png", ground_x,
    //    ground_y, subdivisions, ground_min_z, ground_max_z, scene, false);

    var ground = BABYLON.Mesh.CreateGround("ground1", 500, 500, 2, scene);

    var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture("Resources/map/ground_texture/greybrickwall000.png", scene);
    groundMaterial.diffuseTexture.uScale = texture_scale;
    groundMaterial.diffuseTexture.vScale = texture_scale;
    groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    ground.position.y = 0.0;
    ground.material = groundMaterial;
    ground.receiveShadows = true;

    scene.collisionsEnabled = true;
    ground.checkCollisions = true;

    ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9, friction: 0.05 }, scene);

    return ground;
};