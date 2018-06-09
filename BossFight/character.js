var jumpHeight = 10;
var jumpProgress = jumpHeight;
var jumpBool = true;

var initCharacter = function (scene, camera, shadowGenerator) {

    document.addEventListener('keydown', function(event) {
            if(event.keyCode == 65) {
                // Left
                window.moveA = true;
            }
            else if(event.keyCode == 68) {
                // Right
                window.moveD = true;

            }
            else if(event.keyCode == 87) {
                // Forward
                window.moveW = true;

            }
            else if(event.keyCode == 83) {
                // Backward
                window.moveS = true;
            }
            else if(event.keyCode == 32) {
                if (!window.jump) {
                    window.jump = true;
                }
            }
        });

    document.addEventListener('keyup', function(event) {
        if (event.keyCode == 65) {
            // Left
            window.moveA = false;
        }
        else if (event.keyCode == 68) {
            // Right
            window.moveD = false;

        }
        else if (event.keyCode == 87) {
            // Forward
            window.moveW = false;

        }
        else if (event.keyCode == 83) {
            // Backward
            window.moveS = false;
        }
    });

};