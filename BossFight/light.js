var moon_position = new BABYLON.Vector3(100, -1000, 0);



var initLight= function (scene) {


    var light = new BABYLON.DirectionalLight("Moon", moon_position, scene);
    light.intensity=1.0;

    //var hemisferic = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene);
    //hemisferic.intensity=0.2;


    var lensFlareSystem = new BABYLON.LensFlareSystem("lensFlareSystem", light, scene);
    var flare00 = new BABYLON.LensFlare(0.2, 0, new BABYLON.Color3(1, 1, 1), "Resources/map/flares/flare.png", lensFlareSystem);


    var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
    shadowGenerator.useBlurExponentialShadowMap = true;
    shadowGenerator.blurKernel = 32;

    return [light,shadowGenerator]

}