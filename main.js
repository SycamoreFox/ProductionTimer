var timerProductionVar;
var totalMillSecondsProduction = 0;
var secondsProduction = 0;
var minutesProduction = 0;
var hoursProduction = 0;
var productionStart, productionStop;

var timerDowntimeVar;
var totalMillSecondsDowntime = 0;
var secondsDowntime = 0;
var minutesDowntime = 0;
var hoursDowntime = 0;

var startProduction, stopProduction;
var startDowntime, stopDowntime;

window.onload = function () {
    ////production timer
    timerProductionReset();

    document.getElementById("buttonProductionReset").hidden = true;
    document.getElementById("buttonDowntimeReset").hidden = true;
    document.getElementById("buttonProductionReset").disabled = true;

    document.getElementById("buttonWindowRestore").hidden = true;

    document.getElementById("buttonProduction").onclick = function () {
        var now = new Date();

        if (document.getElementById("buttonProduction").innerHTML == "Start") {
            timerProductionVar = setInterval(countProductionTimer, 100);
            document.getElementById("buttonProduction").innerHTML = "Stop";
            document.getElementById("buttonProductionReset").hidden = true;
            document.getElementById("buttonProductionReset").disabled = true;
            document.getElementById("footerProductionStop").innerHTML = "-";
            startProduction = [
                pad(now.getHours()),
                ':',
                pad(now.getMinutes()),
                ':',
                pad(now.getSeconds())
            ].join('');
            document.getElementById("footerProductionStart").innerHTML = startProduction;
        }
        else {
            clearInterval(timerProductionVar);
            document.getElementById("buttonProduction").innerHTML = "Start";
            document.getElementById("buttonProductionReset").disabled = false;
            document.getElementById("buttonProductionReset").hidden = false;
            stopProduction = [
                pad(now.getHours()),
                ':',
                pad(now.getMinutes()),
                ':',
                pad(now.getSeconds())
            ].join('');
            document.getElementById("footerProductionStop").innerHTML = stopProduction;
        }
    }
    document.getElementById("buttonProductionReset").onclick = function () {
        timerProductionReset();
        document.getElementById("buttonProductionReset").disabled = true;
        document.getElementById("footerProductionStart").innerHTML = "-";
        document.getElementById("footerProductionStop").innerHTML = "-";
        document.getElementById("buttonProductionReset").hidden = true;

    }

    ////downtime timer
    timerDowntimeReset();

    document.getElementById("buttonDowntimeReset").disabled = true;

    document.getElementById("buttonDowntime").onclick = function () {
        var now = new Date();
        if (document.getElementById("buttonDowntime").innerHTML == "Start") {
            timerDowntimeVar = setInterval(countDowntimeTimer, 100);
            document.getElementById("buttonDowntime").innerHTML = "Stop";
            document.getElementById("buttonDowntimeReset").disabled = true;
            document.getElementById("buttonDowntimeReset").hidden = true;
            document.getElementById("footerDowntimeStop").innerHTML = "-";

            startDowntime = [
                pad(now.getHours()),
                ':',
                pad(now.getMinutes()),
                ':',
                pad(now.getSeconds())
            ].join('');
            document.getElementById("footerDowntimeStart").innerHTML = startDowntime;
        }
        else {
            clearInterval(timerDowntimeVar);
            document.getElementById("buttonDowntime").innerHTML = "Start";
            document.getElementById("buttonDowntimeReset").disabled = false;
            document.getElementById("buttonDowntimeReset").hidden = false;

            stopDowntime = [
                pad(now.getHours()),
                ':',
                pad(now.getMinutes()),
                ':',
                pad(now.getSeconds())
            ].join('');
            document.getElementById("footerDowntimeStop").innerHTML = stopDowntime;
        }
    }
    document.getElementById("buttonDowntimeReset").onclick = function () {
        timerDowntimeReset();
        document.getElementById("buttonDowntimeReset").disabled = true;
        document.getElementById("footerDowntimeStart").innerHTML = "-";
        document.getElementById("footerDowntimeStop").innerHTML = "-";
        document.getElementById("buttonDowntimeReset").hidden = true;
    }


    document.getElementById("buttonWindowClose").onclick = function () {
        window.close();
        chrome.app.window.current().minimize();
    }
    document.getElementById("buttonWindowMaximize").onclick = function () {
        chrome.app.window.current().maximize();
        document.getElementById("buttonWindowMaximize").hidden = true;
        document.getElementById("buttonWindowRestore").hidden = false;
    }
    document.getElementById("buttonWindowRestore").onclick = function () {
        chrome.app.window.current().restore();
        document.getElementById("buttonWindowMaximize").hidden = false;
        document.getElementById("buttonWindowRestore").hidden = true;
    }
    document.getElementById("buttonWindowMinimize").onclick = function () {
        chrome.app.window.current().minimize();
    }
}


//display current time
var time = setInterval(timeNow, 100)

function timeNow() {
    var now = new Date();
    var pretty = [
        pad(now.getHours()),
        ':',
        pad(now.getMinutes()),
        ':',
        pad(now.getSeconds())
    ].join('');
    document.getElementById("timeNow").innerHTML = pretty;
}

//production timer
function timerProductionReset() {
    totalMillSecondsProduction = 0;
    secondsProduction = 0;
    minutesProduction = 0;
    hoursProduction = 0;

    document.getElementById("timerProduction").innerHTML =
        pad(hoursProduction) + "h " +
        pad(minutesProduction) + "m " +
        pad(secondsProduction) + "." +
        totalMillSecondsProduction + "s";
}

function countProductionTimer() {
    ++totalMillSecondsProduction;
    if (totalMillSecondsProduction == 10) {
        secondsProduction++;
        totalMillSecondsProduction = 0;
    }
    if (secondsProduction == 60) {
        minutesProduction++;
        secondsProduction = 0;
    }
    if (minutesProduction == 60) {
        hoursProduction++;
        minutesProduction = 0;
    }
    document.getElementById("timerProduction").innerHTML =
        pad(hoursProduction) + "h " +
        pad(minutesProduction) + "m " +
        pad(secondsProduction) + "." +
        totalMillSecondsProduction + "s";
}

//downtime timer
function timerDowntimeReset() {
    totalMillSecondsDowntime = 0;
    secondsDowntime = 0;
    minutesDowntime = 0;
    hoursDowntime = 0;

    document.getElementById("timerDowntime").innerHTML =
        pad(hoursDowntime) + "h " +
        pad(minutesDowntime) + "m " +
        pad(secondsDowntime) + "." +
        totalMillSecondsDowntime + "s";
}

function countDowntimeTimer() {
    ++totalMillSecondsDowntime;
    if (totalMillSecondsDowntime == 10) {
        secondsDowntime++;
        totalMillSecondsDowntime = 0;
    }
    if (secondsDowntime == 60) {
        minutesDowntime++;
        secondsDowntime = 0;
    }
    if (minutesDowntime == 60) {
        hoursDowntime++;
        minutesDowntime = 0;
    }
    document.getElementById("timerDowntime").innerHTML =
        pad(hoursDowntime) + "h " +
        pad(minutesDowntime) + "m " +
        pad(secondsDowntime) + "." +
        totalMillSecondsDowntime + "s";
}



//add leading zeros to time components
function pad(n) {
    return n < 10 ? '0' + n : n
}