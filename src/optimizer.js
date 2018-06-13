var initOptimizer = function (scene) {


    var options = new BABYLON.SceneOptimizerOptions();
    options.addOptimization(new BABYLON.HardwareScalingOptimization(0, 1));

    // Optimizer
    var optimizer = new BABYLON.SceneOptimizer(scene, options);


}