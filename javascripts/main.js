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

        function rotBodyPart(partName, breath) {
            context.save();
            context.translate(pivotX, pivotY);
            context.rotate(rotAngle1 * Math.PI / 180);
            if (breath == true) { context.drawImage(images[partName], x - pivotX, y - pivotY - breathAmt); } else { context.drawImage(images[partName], x - pivotX, y - pivotY) }
            context.restore();
        }
        function rotBodyPartRev(partName, breath) {
            context.save();
            context.translate(pivotX, pivotY);
            context.rotate(rotAngle2 * Math.PI / 180);
            if (breath == true) { context.drawImage(images[partName], x - pivotX, y - pivotY - breathAmt); } else { context.drawImage(images[partName], x - pivotX, y - pivotY) }
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

    var container = document.getElementById("stripecontainer");
    var stripe = document.getElementsByClassName("stripe");
    var seg1 = document.getElementsByClassName("seg1");
    var seg2 = document.getElementsByClassName("seg2");


    $(home).on('click', function () {
        $(container).removeClass("slideleft");
    });

    var pageOut = function (page) {

            $(stripe).removeClass(page + "fade")
            $(seg1).removeClass(page + "fade")
            $(seg2).removeClass(page + "fade")
        setTimeout(function () {
            $(stripe).removeClass(page + "Ele")
            $(seg1).removeClass(page + "Ele")
            $(seg2).removeClass(page + "Ele")
    }, 1000);
    }

    var pageIn = function (page) {

        $(stripe).addClass(page + "Ele")
        $(seg1).addClass(page + "Ele")
        $(seg2).addClass(page + "Ele")
        setTimeout (function (){
        $(stripe).addClass(page + "fade")
        $(seg1).addClass(page + "fade")
        $(seg2).addClass(page + "fade")
        }, 1000);
    }

    $(home).on('click', function () {
        $(container).removeClass("slideleft");
        $(pageOut("port"));
        $(pageOut("about"));
        $(pageIn("home"));
    });

    $(portfolio).on('click', function () {
        $(container).removeClass("slideleft");
        $(pageOut("home"));
        $(pageOut("about"));
        $(pageIn("port"));
    });

    $(about).on('click', function () {
        $(container).removeClass("slideleft");
        if ($(stripe).hasClass("homeEle")) {
            $(pageIn("about"));
             $(pageOut("home"));
        }else{
        $(pageOut("port"));
        $(pageIn("about"));}
    });

    $(contact).on('click', function () {
        $(stripe).removeClass("portEle");
        if ($(container).hasClass("slideleft")) {} else {
            $(container).addClass("slideleft");
            $(seg1).removeClass("homeEle aboutEle");
            $(seg2).removeClass("homeEle aboutEle");
        }
    });

    $('.portexamples').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
    {
        breakpoint: 1500,
        settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: false
        }
    },
    {
        breakpoint: 1000,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 1
        }
    },
    {
        breakpoint: 775,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1
        }
    }
        ]

});



});