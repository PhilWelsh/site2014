function debounce(fn, delay) {
    var timer = null;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    };
}

$(function () {
    console.log("hi there");

    var images = {};

    loadImage("arm");
    loadImage("leg");
    loadImage("legBack");
    loadImage("torso");
    loadImage("armBack");
    loadImage("head");
    loadImage("hair");

    function loadImage(name) {

        images[name] = new Image();
        images[name].onload = function () {
            resourceLoaded();
        }
        images[name].src = "self/self_" + name + ".png";
    }

    var totalResources = 7;
    var numResourcesLoaded = 0;
    var fps = 30;

    function resourceLoaded() {

        numResourcesLoaded += 1;
        if (numResourcesLoaded === totalResources) {
            setInterval(redraw, 1000 / fps);
        }
    }

    var context = document.getElementById('canvas').getContext("2d");

    //positioning

    var charX = 0;
    var charY = 0;
    var rotAngle1 = 0;
    var rotAngle2 = 0;

    var breathDir = 1;
    var breathInc = 0.2;
    var breathAmt = 0;
    var breathMax = .8;
    var breathInterval = setInterval(updateBreath, 1000 / fps);

    function updateBreath() {

        if (breathDir === 1) {  // breath in
            breathAmt -= breathInc;
            if (breathAmt < -breathMax) {
                breathDir = -1;  
            }
        } else {  // breath out
            breathAmt += breathInc;
            if (breathAmt > breathMax) {
                breathDir = 1;
            }
        }
    }

    var walkDir = 1;
    var walkInc = 0.2;
    var walkAmt = 0;
    var walkMax = .8
    var walkInterval = setInterval(updateWalk, 1000 / fps);

    function updateWalk() {

        if (walkDir === 1) {  // front
            walkAmt -= walkInc;
            if (walkAmt < -walkMax) {
                walkDir = 2;
            }
        } else {  // back
            walkAmt += walkInc;
            if (walkAmt > walkMax) {
                walkDir = 1;
            }
        }
    }
var x = charX;
    function redraw() {
        var y = charY;
        var degreeTurn1 = 1;
        var degreeTurn2 = -1;

        if (walkDir === 1) {
            rotAngle1 -= degreeTurn1;
            rotAngle2 -= degreeTurn2;
        } else {
            rotAngle1 += degreeTurn1;
            rotAngle2 += degreeTurn2;
        }

        canvas.width = canvas.width; // clears the canvas 
        var pivotX = 90;
        var pivotY = 90;

        function rotBodyPart(partName, breath){
            context.save();
            context.translate(pivotX, pivotY);
            context.rotate(rotAngle1 * Math.PI/180);
            if (breath == true) {context.drawImage(images[partName], x - pivotX, y - pivotY - breathAmt);} else{context.drawImage(images[partName], x - pivotX, y - pivotY)}
            context.restore();
        }
        function rotBodyPartRev(partName, breath) {
            context.save();
            context.translate(pivotX, pivotY);
            context.rotate(rotAngle2 * Math.PI / 180);
            if (breath == true) { context.drawImage(images[partName], x - pivotX, y - pivotY - breathAmt);} else{context.drawImage(images[partName], x - pivotX, y - pivotY)}
            context.restore();
        }
       
        rotBodyPartRev("legBack", false);
        rotBodyPart("armBack", true);
        rotBodyPart("leg", false);
        
        context.drawImage(images["torso"], x, y - breathAmt);
        rotBodyPartRev("arm", true);
        
        context.drawImage(images["head"], x, y - breathAmt);
        context.drawImage(images["hair"], x, y - breathAmt);
      //  x += 1; movement    
        }


    //PAGE CHANGES
    //Portfolio
    var topMenu = document.getElementsByClassName("topmenu");
    var home = document.getElementById("home");
    var portfolio = document.getElementById("portfolio");
    var about = document.getElementById("about");
    var contact = document.getElementById("contact");

    var highlight = function (selected) {
        $(selected).on('click', function () {
            if ($(selected).hasClass("highlighted")) {
                selected.className -= " highlighted ";
                setTimeout(function () {
                   selected.className += " highlighted "; 
                }, 200);
                
            } else {
                $(selected).parent().siblings().children().removeClass("highlighted");
                selected.className += " highlighted ";
            }
        });
    }

    highlight(home);
    highlight(portfolio);
    highlight(about);
    highlight(contact);

    var homeEle = document.getElementsByClassName("homeEle");

    (portfolio).on('click', function () {
        if ($(".stripe").hasClass("homeEle")) {
            $(".stripe").removeClass("homeEle")
            $(".stripe").addClass("portEle")
        };

    })

});