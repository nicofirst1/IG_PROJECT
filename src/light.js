var moon_position = new BABYLON.Vector3(600, -600, -700);
var moon_color = "#99C9F1";

var initLight = function (scene) {

    //todo: choose right condition of intensity

    var light = new BABYLON.DirectionalLight("Moon", moon_position, scene);
    light.intensity = 0.6;
    light.diffuse = new BABYLON.Color3.FromHexString(moon_color);
    light.specular = new BABYLON.Color3(0, 1, 1);

    var light2 = new BABYLON.HemisphericLight("sun", new BABYLON.Vector3(0, 200, 0), scene);

    var hemisferic = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene);
    hemisferic.intensity = 0.01;
    hemisferic.diffuse = new BABYLON.Color3.FromHexString(moon_color);
    hemisferic.specular = new BABYLON.Color3(0, 1, 1);

    var lensFlareSystem = new BABYLON.LensFlareSystem("lensFlareSystem", light, scene);
    var flare00 = new BABYLON.LensFlare(0.3, 0, new BABYLON.Color3.FromHexString(moon_color), "Resources/map/flares/flare.png", lensFlareSystem);


    scene.ambientColor = new BABYLON.Color3(0.7, 0.8, 0.8);


    var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
    shadowGenerator.useBlurExponentialShadowMap = true;
    shadowGenerator.blurKernel = 32;

    return [light, shadowGenerator]

}