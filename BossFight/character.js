var jumpHeight = 10;
var jumpProgress = jumpHeight;
var jumpBool = true;

var initCharacter = function (scene, camera, shadowGenerator) {

    // var warrior = 0;
    // BABYLON.SceneLoader.ImportMesh("", "Models/psc-warrior-babylon/", "psc-warrior.babylon", scene, function (newMeshes) {
    //     warrior = newMeshes[0];
    //     camera.target = warrior;
    //
    //     warrior.scaling = new BABYLON.Vector3(3, 3, 3);
    //     warrior.rotation.y = Math.PI;
    //     warrior.position = new BABYLON.Vector3(0, 30, 0);
    //
    //     // shadowGenerator.getShadowMap().renderList.push(warrior);
    //
    // });

    BABYLON.SceneLoader.ImportMesh("", "Models/dummy/", "dummy3.babylon", scene, function (newMeshes, particleSystems, skeletons) {
        var skeleton = skeletons[0];

        var warrior_mesh = newMeshes[1];

        skeleton.checkCollisions = true;
        warrior_mesh.checkCollisions = true;

        camera.target = warrior_mesh;
        camera.heightOffset = 0;
        camera.radius = 100;

        warrior_mesh.position.y = 100;
        var scaling = 11;
        warrior_mesh.scaling = new BABYLON.Vector3(scaling, scaling, scaling);


        shadowGenerator.addShadowCaster(scene.meshes[0], true);
        for (var index = 0; index < newMeshes.length; index++) {
            newMeshes[index].setPivotMatrix(BABYLON.Matrix.Translation(0, 2.35, 0));
            newMeshes[index].receiveShadows = false;
            newMeshes[index].physicsImpostor = new BABYLON.PhysicsImpostor(newMeshes[index],
                BABYLON.PhysicsImpostor.BoxImpostor,
                { mass: 3, restitution: 0.1, friction: 0.05 }, scene);
        }

        // ROBOT
        skeleton.animationPropertiesOverride = new BABYLON.AnimationPropertiesOverride();
        skeleton.animationPropertiesOverride.enableBlending = true;
        skeleton.animationPropertiesOverride.blendingSpeed = 0.05;
        skeleton.animationPropertiesOverride.loopMode = 1;

        var idleRange = skeleton.getAnimationRange("YBot_Idle");
        var walkRange = skeleton.getAnimationRange("YBot_Walk");
        var runRange = skeleton.getAnimationRange("YBot_Run");
        var leftRange = skeleton.getAnimationRange("YBot_LeftStrafeWalk");
        var rightRange = skeleton.getAnimationRange("YBot_RightStrafeWalk");

        // IDLE
        if (idleRange) scene.beginAnimation(skeleton, idleRange.from, idleRange.to, true);

        document.addEventListener('keydown', function(event) {
                if(event.keyCode == 65) {
                    // Left
                    if (window.moveW && !window.moveA) {
                        window.moveA = true;
                        window.moveD = false;
                        scene.stopAnimation(skeleton);
                        var walkAnim = scene.beginWeightedAnimation(skeleton, walkRange.from, walkRange.to, 0.5, true);
                        var leftAnim = scene.beginWeightedAnimation(skeleton, leftRange.from, leftRange.to, 0.5, true);

                        // Note: Sync Speed Ratio With Master Walk Animation
                        walkAnim.syncWith(null);
                        leftAnim.syncWith(walkAnim);
                    }

                    else if (window.moveS && !window.moveA) {
                        window.moveA = true;
                        window.moveD = false;
                        scene.stopAnimation(skeleton);
                        var walkAnim = scene.beginWeightedAnimation(skeleton, walkRange.to, walkRange.from, 0.5, true);
                        var leftAnim = scene.beginWeightedAnimation(skeleton, leftRange.from, leftRange.to, 0.5, true);

                        // Note: Sync Speed Ratio With Master Walk Animation
                        walkAnim.syncWith(null);
                        leftAnim.syncWith(walkAnim);
                    }

                    else if (!window.moveA) {
                        window.moveA = true;
                        if (leftRange) scene.beginAnimation(skeleton, leftRange.from, leftRange.to, true);
                    }
                }
                else if(event.keyCode == 68) {
                    // Right
                    if (window.moveW && !window.moveD) {
                        window.moveD = true;
                        window.moveA = false;
                        scene.stopAnimation(skeleton);
                        var walkAnim = scene.beginWeightedAnimation(skeleton, walkRange.from, walkRange.to, 0.5, true);
                        var rightAnim = scene.beginWeightedAnimation(skeleton, rightRange.from, rightRange.to, 0.5, true);

                        // Note: Sync Speed Ratio With Master Walk Animation
                        walkAnim.syncWith(null);
                        rightAnim.syncWith(walkAnim);
                    }

                    else if (window.moveS && !window.moveD) {
                        window.moveD = true;
                        window.moveA = false;
                        scene.stopAnimation(skeleton);
                        var walkAnim = scene.beginWeightedAnimation(skeleton, walkRange.to, walkRange.from, 0.5, true);
                        var leftAnim = scene.beginWeightedAnimation(skeleton, rightRange.from, rightRange.to, 0.5, true);

                        // Note: Sync Speed Ratio With Master Walk Animation
                        walkAnim.syncWith(null);
                        leftAnim.syncWith(walkAnim);
                    }

                    else if (!window.moveD) {
                        window.moveD = true;
                        if (rightRange) scene.beginAnimation(skeleton, rightRange.from, rightRange.to, true);
                    }
                }
                else if(event.keyCode == 87) {
                    // Forward
                    if (window.moveA && !window.moveW) {
                        window.moveW = true;
                        scene.stopAnimation(skeleton);
                        var walkAnim = scene.beginWeightedAnimation(skeleton, walkRange.from, walkRange.to, 0.5, true);
                        var leftAnim = scene.beginWeightedAnimation(skeleton, leftRange.from, leftRange.to, 0.5, true);

                        // Note: Sync Speed Ratio With Master Walk Animation
                        walkAnim.syncWith(null);
                        leftAnim.syncWith(walkAnim);
                    }
                    else if (window.moveD && !window.moveW) {
                        window.moveW = true;
                        scene.stopAnimation(skeleton);
                        var walkAnim = scene.beginWeightedAnimation(skeleton, walkRange.from, walkRange.to, 0.5, true);
                        var rightAnim = scene.beginWeightedAnimation(skeleton, rightRange.from, rightRange.to, 0.5, true);

                        // Note: Sync Speed Ratio With Master Walk Animation
                        walkAnim.syncWith(null);
                        rightAnim.syncWith(walkAnim);
                    }
                    else if (!window.moveW) {
                        window.moveW = true;
                        if (walkRange) scene.beginAnimation(skeleton, walkRange.from, walkRange.to, true);
                    }
                }
                else if(event.keyCode == 83) {
                    // Backward
                    if (window.moveA && !window.moveS) {
                        window.moveS = true;
                        scene.stopAnimation(skeleton);
                        var walkAnim = scene.beginWeightedAnimation(skeleton, walkRange.to, walkRange.from, 0.5, true);
                        var leftAnim = scene.beginWeightedAnimation(skeleton, leftRange.from, leftRange.to, 0.5, true);

                        // Note: Sync Speed Ratio With Master Walk Animation
                        walkAnim.syncWith(null);
                        leftAnim.syncWith(walkAnim);
                    }
                    else if (window.moveD && !window.moveS) {
                        window.moveS = true;
                        scene.stopAnimation(skeleton);
                        var walkAnim = scene.beginWeightedAnimation(skeleton, walkRange.to, walkRange.from, 0.5, true);
                        var rightAnim = scene.beginWeightedAnimation(skeleton, rightRange.from, rightRange.to, 0.5, true);

                        // Note: Sync Speed Ratio With Master Walk Animation
                        walkAnim.syncWith(null);
                        rightAnim.syncWith(walkAnim);
                    }
                    else if (!window.moveS) {
                        window.moveS = true;
                        if (walkRange) scene.beginAnimation(skeleton, walkRange.to, walkRange.from, true);
                    }
                }
                else if(event.keyCode == 32) {
                    if (jumpBool == false) {
                        jumpBool = true;
                    }
                }
            });

        document.addEventListener('keyup', function(event) {
            if(event.keyCode == 65) {
                // Left
                window.moveA = false;
                if (window.moveW) {
                    if (walkRange) scene.beginAnimation(skeleton, walkRange.from, walkRange.to, true);
                }
                else if (window.moveS) {
                    if (walkRange) scene.beginAnimation(skeleton, walkRange.to, walkRange.from, true);
                }
                else {
                    if (idleRange) scene.beginAnimation(skeleton, idleRange.from, idleRange.to, true);
                }
            }
            else if(event.keyCode == 68) {
                // Right
                window.moveD = false;
                if (window.moveW) {
                    if (walkRange) scene.beginAnimation(skeleton, walkRange.from, walkRange.to, true);
                }
                else if (window.moveS) {
                    if (walkRange) scene.beginAnimation(skeleton, walkRange.to, walkRange.from, true);
                }
                else {
                    if (idleRange) scene.beginAnimation(skeleton, idleRange.from, idleRange.to, true);
                }
            }
            else if(event.keyCode == 87) {
                // Forward
                window.moveW = false;
                if (!window.moveA && !window.moveD) {
                    if (idleRange) scene.beginAnimation(skeleton, idleRange.from, idleRange.to, true);
                }
                else if (window.moveA) {
                    if (leftRange) scene.beginAnimation(skeleton, leftRange.from, leftRange.to, true);
                }
                else if (window.moveD) {
                    if (rightRange) scene.beginAnimation(skeleton, rightRange.from, rightRange.to, true);
                }
            }
            else if(event.keyCode == 83) {
                // Backward
                // Forward
                window.moveS = false;
                if (!window.moveA && !window.moveD) {
                    if (idleRange) scene.beginAnimation(skeleton, idleRange.from, idleRange.to, true);
                }
                else if (window.moveA) {
                    if (leftRange) scene.beginAnimation(skeleton, leftRange.from, leftRange.to, true);
                }
                else if (window.moveD) {
                    if (rightRange) scene.beginAnimation(skeleton, rightRange.from, rightRange.to, true);
                }
            }
            else if(event.keyCode == 32) {
                if (jumpBool == false) {
                    jumpBool = true;
                }
            }
        });

    });

};