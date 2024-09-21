
function resObj(mResUrl) {

    var resUrl = "res.json";
    var resData = null;
    var base64 = new Base64();

    var successFun = null;
    var errorFun = null;

    this.init = function () {
        if (mResUrl) {
            resUrl = mResUrl;
        }
    }
    this.setSuccessFun = function (mSuccessFun) {
        if (mSuccessFun) {
            successFun = mSuccessFun;
        }
    }
    this.setErrorFun = function (mErrorFun) {
        if (mErrorFun) {
            errorFun = mErrorFun;
        }
    }
    this.load = function () {

        $.ajax({
            type: "get",
            url: resUrl,
            contentType: "charset=utf-8",
            data: "",
            async: true,
            timeout: 60000,
            beforeSend: function (xmlhttprequest) {

            },
            success: function (data) {
                //console.log(data);
                resData = data;
                if (successFun) {
                    successFun();
                }
            },
            error: function (xmlhttprequest, error) {
                console.log('error===>' + resUrl + "error===>" + error + ", xmlhttprequest===>" + xmlhttprequest);
                if (errorFun) {
                    errorFun();
                }
            },
            complete: function () {
            }
        });

    }
    this.getResData = function () {
        return resData;
    }
    this.showHtml = function (path, divId) {
        if (resData != null) {
            var resStr = String(resData[path]);
            $("#" + divId).append(base64.decode(resStr));
        }
    }

}

function pageInit(pageId) {
    $("#" + pageId).css({ "width": w, "height": h, "position": "absolute", "left": (-1.0) * w, "top": 0});
}

function headerInit(pageId, titleName, backFun) {

    var str = '<div id="' + pageId + '_header_left" style="display:flex;justify-content: center;align-items: center;"><svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.41421 12L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.29289 12.7071C7.10536 12.5196 7 12.2652 7 12C7 11.7348 7.10536 11.4804 7.29289 11.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z" fill="#000"/></svg></div>'
    str = str + '<div id="' + pageId + '_header_right" style="display: flex;">';
    str = str + '<div id="' + pageId + '_header_right_body" style="justify-content: center;align-items: center;display: flex;font-size: 18px;font-weight:700">' + titleName + '</div>';
    str = str + '<div id="' + pageId + '_header_right_right"></div></div>';

    $("#" + pageId + "_header").html(str);

    $("#" + pageId + "_header").css({ "height": headH, "width": "100%", "display": "flex","background":"transparent"});
    $("#" + pageId + "_header_left").css({ "height": headH, "width": headH });
    $("#" + pageId + "_header_right").css({ "height": headH, "width": w - headH });
    $("#" + pageId + "_header_right_body").css({ "height": headH, "width": w - 2 * headH, "color": "#000" });
    $("#" + pageId + "_header_right_right").css({ "height": headH, "width": headH });

    $("#" + pageId + "_header_left").click(function () {
        pageUnShow(pageId + "Page");
        if (backFun != null) {
            backFun();
        }
    });

}

function pageShow(pageId) {
    $("#" + pageId).transition({
        x: w
    }, PAGETIMEOUT);
}

function pageUnShow(pageId) {
    $("#" + pageId).transition({
        x: 0
    }, PAGETIMEOUT);
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, isPassive() ? {
    capture: false,
    passive: false
} : false);

function isPassive() {
    var supportsPassiveOption = false;
    try {
        addEventListener("test", null, Object.defineProperty({}, 'passive', {
            get: function () {
                supportsPassiveOption = true;
            }
        }));
    } catch (e) { }
    return supportsPassiveOption;
}

Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month 
        "d+": this.getDate(), //day 
        "h+": this.getHours(), //hour 
        "m+": this.getMinutes(), //minute 
        "s+": this.getSeconds(), //second 
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
        "S": this.getMilliseconds() //millisecond 
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

//获取北京时间
function getAbsTime(time) {
    try {
        if (time.toString().length == 10) {
            time = time * 1000;
        }
        var currentZoneTime = new Date(time);
        var currentZoneHours = currentZoneTime.getHours();
        var offsetZone = currentZoneTime.getTimezoneOffset() / 60;

        if (offsetZone > 0) {
            // 大于0的是西区（西区晚） 西区应该用时区绝对值加京八区 重新设置时间
            // 西区时间比东区时间晚 所以加时区间隔
            offsetZone = offsetZone + 8;
            currentZoneTime.setHours(currentZoneHours - offsetZone)
        } else {
            // 小于0的是东区（东区早）  东区时间直接跟京八区相加
            offsetZone += 8;
            currentZoneTime.setHours(currentZoneHours + offsetZone);
        }
        return currentZoneTime;
    } catch (e) {
        throw e
    }
}

function alert() {
    this.init = function () {
        $("#alert").css({ "display": "none", "width": $(window).width(), "height": $(window).height() });
        $("#alert").click(function () {
            $("#alert").css({ "display": "none" });
        });
    }
    this.show = function (msg) {
        $("#alertMsg").html(msg);
        $("#alert").css({ "display": "flex" });
    }
    this.unShow = function () {
        $("#alert").css({ "display": "none" });
    }
    function unShowAlert() {
        $("#alert").css({ "display": "none" });
        $("#alertMsg").html("");
    }
}

function loader() {
    var opts = {
        lines: 16, // The number of lines to draw
        length: 20, // The length of each line
        width: 13, // The line thickness
        radius: 37, // The radius of the inner circle
        scale: 0.3, // Scales overall size of the spinner
        corners: 1, // Corner roundness (0..1)
        speed: 0.5, // Rounds per second
        rotate: 0, // The rotation offset
        animation: 'spinner-line-fade-default', // The CSS animation name for the lines
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: '#ffffff', // CSS color or array of colors
        fadeColor: 'transparent', // CSS color or array of colors
        top: '50%', // Top position relative to parent
        left: '50%', // Left position relative to parent
        shadow: '0 0 1px transparent', // Box-shadow for the lines
        zIndex: 2000000000, // The z-index (defaults to 2e9)
        className: 'spinner', // The CSS class to assign to the spinner
        position: 'absolute', // Element positioning
    };
    var spiner = null;
    this.init = function () {
        $("#loader").css({ "width": $(window).width(), "height": $(window).height(), "display": "none" });
        spiner = new Spinner(opts);
    }
    this.show = function () {
        $("#loader").css({ "display": "block" });
        spiner.spin(document.getElementById("loader"));
    }
    this.unShow = function () {
        spiner.spin();
        $("#loader").css({ "display": "none" });
    }
}

function messageBox() {

    this.init = function () {
        $("#messageBox").css({ "display": "none", "width": $(window).width(), "height": $(window).height() });
        $("#messageBoxBg").css({ "width": $(window).width(), "height": $(window).height() });
        $("#messageBoxBodyBg").css({ "width": $(window).width(), "height": $(window).height() });
        $("#messageBoxBody").css({ "width": $(window).width() * 0.75, "height": "200px" });
    }
    this.show = function (msgContent, okFun, cancelFun) {

        $("#messageBox").css({ "display": "flex", "left": 0 });
        $("#msgContent").html(msgContent);
        $("#msgBtnCancel").unbind();
        $("#msgBtnOK").unbind();
        $("#msgBtnOK").click(function () {
            if (okFun) {
                okFun();
            }
        });
        $("#msgBtnCancel").click(function () {
            if (cancelFun) {
                cancelFun();
            }
            msgObj.unShow();
        });
    }
    this.unShow = function () {
        $("#messageBox").css({ "display": "none" });
    }
}

function messagePage() {

    this.init = function () {
        $("#messagePage").css({ "display": "none", "width": $(window).width(), "height": $(window).height() });
        $("#messagePageBg").css({ "width": $(window).width(), "height": $(window).height() });
        $("#messagePageBodyBg").css({ "width": $(window).width(), "height": $(window).height() });
        $("#messagePageBody").css({ "width": $(window).width() * 0.75, "height": "200px" });
    }
    this.show = function (msgContent, cancelFun) {

        $("#messagePage").css({ "display": "flex", "left": 0 });
        $("#msgPageContent").html(msgContent);
        $("#msgPageBtnClose").unbind();
        $("#msgPageBtnClose").click(function () {
            if (cancelFun) {
                cancelFun();
            }
            msgPageObj.unShow();
        });
        $("#messagePageBodyBg").unbind();
        $("#messagePageBodyBg").click(function () {
            if (cancelFun) {
                cancelFun();
            }
            msgPageObj.unShow();
        });
        $("#messagePageBody").unbind();
        $("#messagePageBody").click(function (event) {
            event.stopPropagation();
        });
    }
    this.unShow = function () {
        $("#messagePage").css({ "display": "none" });
    }
}



function callApp(commandStr) {
    // if (checkIsAndroid()) {
    //     window.location.assign('im://app?command=' + commandStr);
    // } else {
    //     try {
    //         window.webkit.messageHandlers.im.postMessage('im://app?command=' + commandStr);
    //     } catch (e) { }
    // }
}

function checkIsAndroid() {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

    if (isAndroid) {
        return true;
    } else {
        return false;
    }
}




