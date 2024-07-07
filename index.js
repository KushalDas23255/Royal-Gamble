//keep track of total
var trackTotal = 0;

//captcha code function
function generateCaptchaCode(length) {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const numbers = "0123456789";
    let captcha = "";
    for (let i = 0; i < length; i++) {
        if (i % 2 === 0) {
            captcha +=
                characters[Math.floor(Math.random() * characters.length)];
        } else {
            captcha += numbers[Math.floor(Math.random() * numbers.length)];
        }
    }
    return captcha;
}

//creating and displaying captcha Code
var captchaCode = generateCaptchaCode(8);
$(".heading.captcha").html(captchaCode);

//Initializing the drop down menu
$(".starting.menu").hide();
$(".roulette.menu").hide();
$("#menuButton").click(function () {
    $(".starting.menu").slideToggle();
    $(".roulette.menu").slideToggle();
    $("#menuButton").hide();
    $("#spin").hide();
    $("#moneyList").hide();
});

//Confirm button handling
$("#confirm").click(function () {
    var firstUserName = $("#fname").val();
    var lastUserName = $("#lname").val();
    var bettingAmount = $("#bamount").val();
    var captcha = $("#captcha").val();
    if (captcha === captchaCode && bettingAmount >= 5000) {
        var welcomeMessage =
            "Welcome " +
            (firstUserName[0].toUpperCase() +
                firstUserName.slice(1, firstUserName.length).toLowerCase()) +
            " " +
            (lastUserName[0].toUpperCase() +
                lastUserName.slice(1, lastUserName.length).toLowerCase()) +
            ", let's gamble! ♠️ ♣️ ♦️ ♥️ 👑";

        $(".heading.fname").html(welcomeMessage);
        $(".heading.bamount").html(bettingAmount);
        $(".initial.user").hide();
        $("label.betting.amount").html("Total amount invested(₹):");
        $("li.captcha").hide();
        $("li.lname").hide();
        $("li.confirm").hide();
        $("label.fname").hide();
        $("hr").hide();
        $("#spin").toggle();
        $("#moneyList").toggle();
        $(".money").html("₹" + bettingAmount);
        $(".drawn").hide();
        trackTotal = bettingAmount;
    }
});

//Checking Spin Button //////////////////Needs Correction
var initialAngle = 0;
$("#spin").click(function () {
    $(".drawn").hide();
    $(".lucky.number").hide();
    var angleChosen = Math.round(Math.random() * 360);
    initialAngle = angleChosen;
    var element = $("#rouletteWheel");
    $({ degrees: initialAngle - 18000 }).animate(
        { degrees: initialAngle },
        {
            duration: 2000,
            step: function (now) {
                element.css({
                    transform: "rotate(" + now + "deg)",
                });
            },
        }
    );
    numberRand = Math.round(Math.random() * 36);
    calcNewTotal(numberRand, trackTotal);
});

//function calculate number //////////////////Needs Correction
function calcNum(angleResult) {
    var numList = [0, 32, 15, 19];
}

//function calculate new total
function calcNewTotal(number, netAmount) {
    //converting netAmount to string
    netAmount /= 1;
    //checking other inputs
    var numOdd = $("#oddNum").is(":checked");
    var numEven = $("#evenNum").is(":checked");
    var numRed = $("#red").is(":checked");
    var numBlack = $("#black").is(":checked");
    var numPrime = $("#primeNum").is(":checked");
    var numSingle = $("#singleNum").val();
    console.log(netAmount);

    //handling odd
    if (numOdd === true) {
        if (number % 2 != 0) {
            netAmount += 50;
        } else {
            netAmount -= 50;
        }
    }

    //handling even
    if (numEven === true) {
        if (number % 2 == 0) {
            netAmount += 50;
        } else {
            netAmount -= 50;
        }
    }

    //handling red------------------------------------------
    var teamRed = [
        32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3,
    ];
    if (numRed === true) {
        if (teamRed.indexOf(number) !== -1) {
            netAmount += 50;
        } else {
            netAmount -= 50;
        }
    }
    //handling black---------------------------------------------------
    var teamBlack = [
        15, 4, 2, 17, 6, 13, 11, 8, 10, 24, 33, 20, 31, 22, 29, 28, 35, 26,
    ];
    if (numBlack === true) {
        if (teamBlack.indexOf(number) !== -1) {
            netAmount += 50;
        } else {
            netAmount -= 50;
        }
    }

    //handling prime
    function isPrime(n) {
        if (n <= 1) return false;
        for (let i = 2; i < n; i++) if (n % i == 0) return false;
        return true;
    }
    if (numPrime === true) {
        if (isPrime(number) == true) {
            netAmount += 1000;
        } else {
            netAmount -= 500;
        }
    }

    //handling single
    if (numSingle !== "") {
        if (numSingle === number) {
            netAmount += 10000;
        } else {
            netAmount -= 100;
        }
    }

    setTimeout(function () {
        $(".money").html("₹" + netAmount);
        $(".heading.bamount").html(netAmount);
        $(".lucky.number").html(number);
        $(".lucky.number").toggle();
        $(".drawn").toggle();
    }, 2000);

    trackTotal = netAmount;
    console.log(number);
    console.log(netAmount);
    console.log([numOdd, numEven, numRed, numBlack, numPrime, numSingle]);
}
