var sMsgSystemError = '系统错误。';

//DataTable
var oDtTableDefaultOption = {
    language: {
        url: 'Includes/package/jquery/DataTables/Chinese.json'
    },
    searching: false,
    ordering: false,
    lengthChange: true,
    info: true,
    paging: true,
    pageLength: 5,
    pagingType: 'full_numbers',
    deferRender: true,
    scrollX: true,
    //stateSave: true,
    lengthMenu: [5, 10, 15, 20, 25, 30],
    classes: {
        sLengthSelect: 'form-control d-inline w-auto'
    },
};

//FileInput
var oFileInputDefaultOption = {
    language: 'zh',
    theme: 'explorer-fa',
    allowedFileExtensions: ['jpg', 'jpeg', 'png', 'gif'],  // 'mov'
    overwriteInitial: false,
    validateInitialCount: true,
    showCaption: false,
    showUpload: false,
    showRemove: false,
    showClose: false,
    maxFileSize: 4096,
    initialPreviewAsData: false,
    initialPreviewFileType: 'image'
};

// 图表 Chart
function initChart(sChartID, sType) {
    var oChart = Chart.Bar(sChartID, {
        options: {
            responsive: true,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    return oChart;
}

// Ckeditor
function oCkeditorDefaultOption(oID) {
    if (CKEDITOR.env.ie && CKEDITOR.env.version < 9)
        CKEDITOR.tools.enableHtml5Elements(document);

    CKEDITOR.config.height = 450;
    CKEDITOR.config.width = 'auto';
    CKEDITOR.config.defaultLanguage = 'zh-cn';

    var initSample = (function () {
        //console.log(oID);
        var wysiwygareaAvailable = isWysiwygareaAvailable(),
            isBBCodeBuiltIn = !!CKEDITOR.plugins.get('bbcode');

        return function () {
            if (wysiwygareaAvailable) {
                CKEDITOR.replace(oID);
            } else {
                editorElement.setAttribute('contenteditable', 'true');
                CKEDITOR.inline(oID);
            }
        };

        function isWysiwygareaAvailable() {
            if (CKEDITOR.revision === ('%RE' + 'V%')) {
                return true;
            }
            return !!CKEDITOR.plugins.get('wysiwygarea');
        }
    })();

    initSample();
}

// Dialog
var iDialogMaxHeight = 800;
var sDialogWidth = '50%';
if (800 > $(window).height()) {
    iDialogMaxHeight = 550;
}
if (1024 > $(window).width()) {
    sDialogWidth = '90%';
}
var oDialogDefaultOption = {
    modal: true,
    width: sDialogWidth,
    maxHeight: iDialogMaxHeight,
    dialogClass: 'customdialog',
};

// Swal
var oSwalDefaultOption = {
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '确认',
    cancelButtonText: '取消',
};
var oPopDefaultParam = {
    type: 'S',
    title: '储存成功！',
    text: '',
};

// MonthPropertyData
var oMonthPropertyData = [
    { text: '一月', value: 1 },
    { text: '二月', value: 2 },
    { text: '三月', value: 3 },
    { text: '四月', value: 4 },
    { text: '五月', value: 5 },
    { text: '六月', value: 6 },
    { text: '七月', value: 7 },
    { text: '八月', value: 8 },
    { text: '九月', value: 9 },
    { text: '十月', value: 10 },
    { text: '十一月', value: 11 },
    { text: '十二月', value: 12 }
];

$(document).ready(function () {
    'use strict';

    // fix IOS btn bug
    $('body').attr('ontouchstart', '');
    $('body').attr('onmouseover', '');
});

function encodeURIParm(Uriparm) {
    var endcodeStr = window.btoa(window.encodeURIComponent(Uriparm));
    return endcodeStr;
}

function dencodeURIParm(sUriParam) {
    var sDendcode = decodeURIComponent(atob(sUriParam));
    return sDendcode;
}

function getParameterByName(name, decodeFlag) {
    if (decodeFlag) {
        var paramsString = "?" + window.decodeURIComponent(window.atob(window.location.search.substring(1)));
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(paramsString);

        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    else {
        var url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

}

function GetUrlName(Name) {
    var getUrlString = location.href;
    var url = new URL(getUrlString);
    return url.searchParams.get(Name);
}

function isAndroid() {
    return navigator.userAgent.indexOf("Android") > 0;
}

function isIOS() {
    return /(iPhone|iPad|iPod)/i.test(navigator.userAgent);
}

function isIPad() {
    return /(iPad)/i.test(navigator.userAgent);
}

function SetCookie(name, value) {
    document.cookie = name + "=" + encodeURIComponent(value);
}

function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return decodeURIComponent(arr[2]); return "";
}

function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

function moneyFormat(tVal, iDecimal = 0, tSymbol = false) {
    var sRtn = '';
    var iTmpInt = 0;
    var sTmpDecimal = '';

    tVal = parseFloat(tVal);

    // 小數補0
    if (0 < iDecimal) {
        tVal = tVal.toFixed(iDecimal);
    }

    var vTmpVal = tVal.toString().split('.');

    iTmpInt = vTmpVal[0];
    sTmpDecimal = vTmpVal[1];

    // 整數千分位
    iTmpInt = iTmpInt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    sRtn = iTmpInt;
    if (!!sTmpDecimal && 0 < iDecimal) {
        sRtn += '.' + sTmpDecimal;
    }

    if (tSymbol || 'string' === typeof tSymbol) {
        sRtn = (('string' === typeof tSymbol) ? tSymbol : '$') + sRtn;
    }

    return sRtn;
}

function dateFormat(date) {
    var myDate = new Date(date);
    var d = myDate.getDate();
    var m = myDate.getMonth() + 1;
    var y = myDate.getFullYear();
    return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}

function GetDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1;//获取当前月份的日期
    var d = dd.getDate();
    return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}

function getRandom() {
    var code = "";
    var codeLength = 6; //驗證碼的長度
    var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
    for (var i = 0; i < codeLength; i++) {
        var charNum = Math.floor(Math.random() * 10);
        code += codeChars[charNum];
    }
    return code;
}

function carouselNormalization() {
    var items = $('.carousel .carousel-inner .item'), heights = [], tallest, bwidth, height, width;
    if (items.length) {
        function normalizeHeights() {
            bwidth = $('.carousel').width();
            items.each(function () {
                height = $(this).height();
                width = $(this).width();
                if (width > bwidth) {
                    height = height * (bwidth / width);
                }
                heights.push(height);
            });
            tallest = Math.max.apply(null, heights);
            if (tallest > bwidth) {
                tallest = bwidth;
            }
            items.each(function () {
                $(this).css('height', tallest + 'px');
            });
        };
        normalizeHeights();
        $(window).on('resize', function () {
            bwidth = $('.carousel').width();
            heights = [];
            items.each(function () {
                $(this).css('height', 'auto');
            });
            normalizeHeights();
        });
    }
}

function haveChinese(s) {
    return s.search(RegExp("[一-" + String.fromCharCode(40869) + "]")) > -1;
}

function toUnicode(theString) {
    var unicodeString = '';
    for (var i = 0; i < theString.length; i++) {
        var theUnicode = theString.charCodeAt(i).toString(16).toUpperCase();
        while (theUnicode.length < 4) {
            theUnicode = '0' + theUnicode;
        }
        theUnicode = '\\u' + theUnicode;
        unicodeString += theUnicode;
    }
    return unicodeString;
}

function goPage(sUrl, sParam) {
    sParam = (sParam !== undefined) ? encodeURIParm(sParam) : '';
    window.location.href = sUrl + sParam;
}

function goPageUnencode(sUrl, sParam) {
    window.location.href = sUrl + sParam;
}

function goBack() {
    history.back();
}

function setTitle(sTitle = '', sSubTitle = '') {
    if ('' !== sTitle) {
        $(document).attr('title', sTitle);
        if (!!$('#title')) {
            $('#title').text(sTitle);
        }
    }

    if ('' !== sSubTitle) {
        $(document).attr('subtitle', sSubTitle);
        if (!!$('#subtitle')) {
            $('#subtitle').text(sSubTitle);
        }
    }
}

function downloadFile(sFilePath) {
    console.log(sFilePath);

    var vFilePath = sFilePath.split('/');
    var sFileName = '';
    if (1 < vFilePath.length) {
        sFileName = vFilePath[vFilePath.length - 1];
    }

    var oA = document.createElement('a');
    oA.href = sFilePath;
    oA.download = sFileName;
    oA.click();
}

// 將數字轉為千分位計
function toCurrency(num) {
    var parts = num.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}

// 時間戳轉時間
function getDatetimeByTimestamp(iTimestamp, sSeparate) {
    if (!sSeparate) {
        sSeparate = '/';
    }

    var dDate = new Date(iTimestamp);
    var Y = dDate.getFullYear() + sSeparate;
    var M = (dDate.getMonth() + 1 < 10 ? '0' + (dDate.getMonth() + 1) : dDate.getMonth() + 1) + sSeparate;
    var D = (dDate.getDate() < 10 ? '0' + dDate.getDate() : dDate.getDate()) + ' ';
    var h = (dDate.getHours() < 10 ? '0' + dDate.getHours() : dDate.getHours()) + ':';
    var m = (dDate.getMinutes() < 10 ? '0' + dDate.getMinutes() : dDate.getMinutes()) + ':';
    var s = (dDate.getSeconds() < 10 ? '0' + dDate.getSeconds() : dDate.getSeconds());

    return Y + M + D + h + m + s;
}

function getBase64(sFile, fnCallBack) {
    var reader = new FileReader();
    reader.readAsDataURL(sFile);
    reader.onload = function () {
        //console.log(reader.result);
        fnCallBack(reader.result);
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}

//function showLoading() {
//    if (!$('#loadingmask').length) {
//        var sLoadingMask = '<div id="loadingmask">' +
//            '<div class="modal fade loadermask show" style="display:block;" id="loadermask" tabindex="-1" role="dialog" data-backdrop="static">' +
//            '<div class="modal-dialog">' +
//            '<div class="loader"></div>' +
//            '</div>' +
//            '</div>' +
//            '<div class="modal-backdrop fade show"></div>' +
//            '</div>';
//        $('body').append(sLoadingMask);
//    }
//    if ($('#loadingmask').css('display') == 'none') {
//        $('#loadingmask').show('slow');
//    }
//}

//function hideLoading() {
//    if ($('#loadingmask').length) {
//        $('#loadingmask').hide('slow');
//    }
//}

function showLoading() {
    if (0 === $('#loadingmask').length) {
        var sLoadingMask = '' +
            '<div id="loadingmask" style="display:none;">' +
            '<div class="modal fade loadermask show" style="display:block;" id="loadermask" tabindex="-1" role="dialog" data-backdrop="static">' +
            '<div class="modal-dialog">' +
            '<div class="loader"></div>' +
            '</div>' +
            '</div>' +
            '<div class="modal-backdrop fade show"></div>' +
            '</div>';
        $('body').append(sLoadingMask);
    }

    //console.log('showLoading');
    $('#loadingmask').show('slow').delay('slow').queue(function (next) {
        next();
    });
}

function hideLoading() {
    $('#loadingmask').queue(function (next) {
        //console.log('hideLoading');
        $(this).delay('slow').hide('slow');
        next();
    });
}

function getToday(sSeparate) {
    if (!sSeparate) {
        sSeparate = '/';
    }

    var dToday = new Date();

    var sYear = dToday.getFullYear();
    var sDate = String(dToday.getDate()).padStart(2, '0');
    var sMonth = String(dToday.getMonth() + 1).padStart(2, '0');

    var vToday = [];
    vToday.push(sYear);
    vToday.push(sMonth);
    vToday.push(sDate);

    var sToday = vToday.join(sSeparate);

    return sToday;
}

function calcAge(sBirthday) {
    var dToday = new Date();
    var dBirthDay = new Date(sBirthday);

    var iAge = dToday.getFullYear() - dBirthDay.getFullYear();
    var iMonth = dToday.getMonth() - dBirthDay.getMonth();
    if (iMonth < 0 || (iMonth === 0 && dToday.getDate() < dBirthDay.getDate())) {
        iAge--;
    }

    return iAge;
}

function calcSeniority(sStartDate, sEndDate) {
    var dStartDate = new Date(sStartDate);
    var dEndDate = new Date();
    if ('' !== sEndDate) {
        dEndDate = new Date(sEndDate);
    }

    var iAge = dEndDate.getFullYear() - dStartDate.getFullYear();
    var iMonth = dEndDate.getMonth() - dStartDate.getMonth();
    if (iMonth < 0 || (iMonth === 0 && dEndDate.getDate() < dStartDate.getDate())) {
        iAge--;
    }

    return iAge;
}

function calcHoursDiff(sStartDateTime, sEndDateTime) {
    var dStartDate = new Date(sStartDateTime);
    var dEndDate = new Date();
    if ('' !== sEndDateTime) {
        dEndDate = new Date(sEndDateTime);
    }

    var iHours = Math.abs(dEndDate - dStartDate) / 36e5;

    return iHours;
}

function getQueryString(oParam) {
    return sQueryString = Object.keys(oParam).map(function (sKey) {
        return sKey + '=' + oParam[sKey];
    }).join('&');
}

function checkFileExists(sFileUrl) {
    var http = new XMLHttpRequest();
    http.open('HEAD', sFileUrl, false);
    http.send();
    return http.status !== 404;
}

// checkbox select all
function initCheckBoxCheckAll(sElementName) {
    var oCbxAll = $('#cbxall_' + sElementName);
    var oCbx = $('input[name="cbx_' + sElementName + '"]');

    oCbxAll.on('change', function () {
        if (this.checked) {
            oCbx.prop('checked', true);
        }
        else {
            oCbx.prop('checked', false);
        }
    });

    oCbx.on('change', function () {
        var oCbxChecked = $('input[name="cbx_' + sElementName + '"]:checked');
        if (oCbx.length === oCbxChecked.length) {
            oCbxAll.prop('checked', true);
        }
        else {
            oCbxAll.prop('checked', false);
        }
    });
}

// 開關內容
function showWindowContent(htmlThis) {
    var oNav = $(htmlThis);
    var oNavImg = $(htmlThis).find('img');
    var oContent = oNav.next();
    var bOpen = oContent.is(':visible');

    oNavImg.toggleClass('close', 'slow');

    if (bOpen) {
        oContent.fadeOut('slow');
    }
    else {
        oContent.fadeIn('slow');
    }
}

function formatFloat(iNum, iPos) {
    var iSize = Math.pow(10, iPos);
    return Math.round(iNum * iSize) / iSize;
}

function DateToLocalISOString(oDateData) {
    var iTimeStampTZ = (new Date()).getTimezoneOffset() * 60000;

    return new Date(oDateData.getTime() - iTimeStampTZ).toISOString().substr(0, 16);
}

// 下次要用自己switch case增加
function DateFormat2(sType, oDateData, sSeparate) {
    var sRtn = '';
    if (!sSeparate) {
        sSeparate = '/';
    }

    switch (typeof oDateData) {
        case 'object':
        case 'undefined':
            if (!oDateData) {
                oDateData = new Date();
            }
            break;
        case 'string':
            if ('' !== oDateData) {
                oDateData = new Date(oDateData);
            }
            break;
    }

    var sYear = oDateData.getFullYear();
    var sDate = String(oDateData.getDate()).padStart(2, '0');
    var sMonth = String(oDateData.getMonth() + 1);

    var sHour = String(oDateData.getHours()).padStart(2, '0');
    var sMinute = String(oDateData.getMinutes()).padStart(2, '0');
    var sSecond = String(oDateData.getSeconds()).padStart(2, '0');

    var vDate = [];
    //vDate.push(sYear);
    // vDate.push(sMonth);
    // vDate.push(sDate);

    var vTime = [];
    // vTime.push(sHour);
    // vTime.push(sMinute);
    //vTime.push(sSecond);

    // var iTimeStampTZ = (new Date()).getTimezoneOffset() * 60000;
    // sRtn = new Date(oDateData.getTime() - iTimeStampTZ).toISOString().substr(0, 19).replace('T',' ');
    switch (sType) {
        case 'FULL':  // 2020-05-11 02:30:30
            var iTimeStampTZ = (new Date()).getTimezoneOffset() * 60000;
            sRtn = new Date(oDateData.getTime() - iTimeStampTZ).toISOString().substr(0, 19).replace('T', ' ');
            break;

        case 'DATE':
            break;

        case 'COMMENT':  // 点评专用 5月11日 14:34
            vDate.push(sMonth + '月');
            vDate.push(sDate + '日');
            vTime.push(sHour);
            vTime.push(sMinute);

            var sNowDate = vDate.join('');
            var sNowTime = vTime.join(':');
            sRtn = sNowDate + ' ' + sNowTime;
            break;

        default:
            break;
    }

    return sRtn;
}

// 密碼 验证 英數4~10 for Javascript
function checkPwd(pwd) {
    var regp = /^(?=.*[a-zA-Z]+)(?=.*[0-9]+)[a-zA-Z0-9]+$/;

    if (!regp.test(pwd) || pwd.length > 10 || pwd.length < 4) {
        return false;
    } else {
        return true;
    }
}

// E-mail 验证 for Javascript
function checkEmail(strEmail) {
    if (strEmail.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/) === -1) {
        return false;
    } else {
        return true;
    }
}

function setDataByElement(oElement, sValue, sMode) {
    //console.log(oElement, sValue, sMode);

    switch (sMode) {
        case 'Add':
            break;
        case 'Edit':
            if ((oElement.is('[type=radio]') || oElement.is('[type=checkbox]'))) {
                if ('' !== sValue) {
                    sRadioBoxElement = '*[type=radio][value=' + sValue + ']';
                    if (oElement.is(sRadioBoxElement)) {
                        //console.log($(oElement.filter(sRadioBoxElement)), sRadioBoxElement);
                        $(oElement.filter(sRadioBoxElement)).iCheck('check');
                    }
                    sCheckBoxElement = '*[type=checkbox][value=' + sValue + ']';
                    if (oElement.is(sCheckBoxElement)) {
                        $(oElement.filter(sCheckBoxElement)).iCheck('check');
                    }
                }
            }
            else {
                $.each(oElement, function (iKey, sElement) {
                    switch ($(sElement).prop('tagName')) {
                        case 'SPAN':
                            oElement.text(sValue);
                            break;
                        case 'INPUT':
                            switch ($(sElement).prop('type')) {
                                case 'file':
                                    //var oImg = document.createElement('img');
                                    //oImg.src = sValue;
                                    //oImg.className = '';
                                    //oElement.after(oImg);
                                    //oElement.remove();
                                    break;
                                default:
                                    oElement.val(sValue);
                                    break;
                            }
                            break;
                        case 'TEXTAREA':
                        case 'SELECT':
                            oElement.val(sValue);
                            break;
                    }
                });
            }
            break;
        case 'View':
            if ((oElement.is('[type=radio]') || oElement.is('[type=checkbox]'))) {
                if ('' !== sValue) {
                    sRadioBoxElement = '*[type=radio][value=' + sValue + ']';
                    if (oElement.is(sRadioBoxElement)) {
                        $(oElement.filter(sRadioBoxElement)).iCheck('check');
                    }
                    sCheckBoxElement = '*[type=checkbox][value=' + sValue + ']';
                    if (oElement.is(sCheckBoxElement)) {
                        $(oElement.filter(sCheckBoxElement)).iCheck('check');
                    }
                }
            }
            else {
                $.each(oElement, function (iKey, sElement) {
                    switch ($(sElement).prop('tagName')) {
                        case 'SPAN':
                        case 'DIV':
                        case 'P':
                            oElement.text(sValue);
                            break;
                        case 'IMG':
                            if (!!$.lazyLoadImg) {
                                oElement.addClass('lazy-img');
                                oElement.data('src', sValue);
                                //oElement.attr('data-src', sValue);
                            }
                            else {
                                oElement.prop('src', sValue);  // no lazyload
                            }
                            break;
                        case 'INPUT':
                            switch ($(sElement).prop('type')) {
                                case 'hidden':
                                    oElement.val(sValue);
                                    break;
                                case 'file':
                                    var oImg = document.createElement('img');
                                    oImg.src = sValue;
                                    oImg.className = '';
                                    oElement.after(oImg);
                                    oElement.remove();
                                    break;
                                default:
                                    var oSpan = document.createElement('span');
                                    oSpan.innerText = sValue;
                                    oElement.after(oSpan);
                                    oElement.remove();
                                    break;
                            }
                            break;
                        case 'TEXTAREA':
                            var oSpan = document.createElement('span');
                            oSpan.innerText = sValue;
                            oElement.after(oSpan);
                            oElement.remove();
                            break;
                        case 'SELECT':
                            oElement.val(sValue);
                            oElement.prop('disabled', true);
                            break;
                    }
                });
            }
            break;
    }
}

function getJSONData(oData, sModelName) {
    //console.log(oData, sModelName);

    var vDataNoAll = [];
    $.each(oData, function (sKey, sValue) {
        //console.log(sKey, sValue);

        var regex = new RegExp(sModelName + '_', 'g');
        if (sKey.match(regex)) {
            var sField = sKey.replace(regex, '').replace(/_[0-9]*[0-9]$/, '');
            var sDataNo = sKey.replace(regex, '').replace(sField + '_', '');

            if (3 > sDataNo.length) {
                vDataNoAll.push(parseInt(sDataNo));
            }
        }
    });
    var iDataCnt = Math.max(...vDataNoAll);

    var vData = [];
    $.each(oData, function (sKey, sValue) {
        var regex = new RegExp(sModelName + '_', 'g');
        if (sKey.match(regex)) {
            //console.log(sKey, sValue);

            var vDataNoMatch = sKey.match(/[0-9]*[0-9]$/);
            var sField = sKey.replace(regex, '').replace(/_[0-9]*[0-9]$/, '');

            for (var iDataNo = 0; iDataNo <= iDataCnt; iDataNo++) {
                //vData[iDataNo] = $.extend({}, vData[iDataNo]);

                if (null !== vDataNoMatch && iDataNo === parseInt(vDataNoMatch[0])) {
                    vData[iDataNo] = $.extend({}, vData[iDataNo]);
                    vData[iDataNo][sField] = sValue;

                    delete oData[sKey];
                }
            }
        }
    });

    //console.log(vData);
    oData[sModelName] = JSON.stringify(vData);

    return oData;
}

// 這個月的第一天、最後一天
function getMonthFirstDayLastDay() {

    var startdate = new Date();
    var enddate = new Date();

    //將月份移至下個月份
    enddate.setMonth(enddate.getMonth() + 1);
    //設定為下個月份的第一天
    enddate.setDate(1);

    var resDate = {
        'FirstDay': moment(startdate.setDate(1)).format('YYYY-MM-DD'),
        'LastDay': moment(enddate.setDate(enddate.getDate() - 1)).format('YYYY-MM-DD')
    };

    return resDate;
}

// 上的月的第一天、最後一天
function getLastMonthFirstDayLastDay() {
    var startdate = new Date();
    var enddate = new Date();

    //將月份移至上個月份
    startdate.setMonth(startdate.getMonth() - 1);
    //設定為這個月第一天
    enddate.setDate(1);

    var resDate = {
        'FirstDay': moment(startdate.setDate(1)).format('YYYY-MM-DD'),
        'LastDay': moment(enddate.setDate(enddate.getDate() - 1)).format('YYYY-MM-DD')
    };

    return resDate;
}

function getWeekFirstLastDate(tDate = new Date()) {
    var vRtnDate = {
        'FirstDay': '',
        'LastDay': ''
    };

    if (tDate instanceof Date || 'string' === typeof tDate) {
        var curr;

        if (tDate instanceof Date) {
            curr = tDate;
        }

        if ('string' === typeof tDate) {
            curr = new Date(tDate);
        }

        var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
        var last = first + 6; // last day is the first day + 6
        var firstday = new Date(curr.setDate(first));
        var lastday = new Date(curr.setDate(last));

        vRtnDate['FirstDay'] = moment(firstday).format('YYYY-MM-DD');
        vRtnDate['LastDay'] = moment(lastday).format('YYYY-MM-DD');
    }

    return vRtnDate;
}

function ExecuteAPI_FormData(sControllerName, sMethodName, oFormData, fnSuccess, fnFail) {
    $.ajax({
        url: '/api/' + sControllerName + '/' + sMethodName,
        cache: false,
        contentType: false,
        async: false,
        //beforeSend: function (xhr) { if (typeof __ExecuteAPIToken !== "undefined") xhr.setRequestHeader("Authorization", "Bearer " + __ExecuteAPIToken) },
        processData: false,
        data: oFormData,  // data只能指定單一物件                 
        type: 'post',
        success: function (apiResult) {
            if (!fnSuccess) _ExecuteAPIonSuccess(apiResult); else fnSuccess(apiResult);
        },
        error: function (ex) {
            if (!fnFail) _ExecuteAPIonError(ex); else fnFail(ex);
        }
    });
}

function ExecuteAPI_Async(catalogOrOptions, method, para, success, fail) {
    var catalog = catalogOrOptions;
    $.ajax({
        url: "/api/" + catalog + "/" + method,
        type: "post",
        // contentType: "application/json",
        dataType: 'json',
        crossDomain: true,
        xhr: function () {
            var xhr = jQuery.ajaxSettings.xhr();
            var setRequestHeader = xhr.setRequestHeader;
            xhr.setRequestHeader = function (name, value) {
                if (name == 'X-Requested-With') return;
                setRequestHeader.call(this, name, value);
            };
            return xhr;
        },
        async: false,
        // async: true,
        beforeSend: function (xhr) { if (typeof __ExecuteAPIToken !== "undefined") xhr.setRequestHeader("Authorization", "Bearer " + __ExecuteAPIToken); },
        data: JSON.stringify(para),
        success:
        function (apiResult) {
            if (!success) _ExecuteAPIonSuccess(apiResult); else success(apiResult);
        }, error:
        function (ex) {
            if (!fail) _ExecuteAPIonError(ex); else fail(ex);
        }
    });
}

function ExecuteAPIQueue(funcExecuteAPIAsync) {
    $('#loadingmask').queue(function (next) {
        funcExecuteAPIAsync();

        next();
    });
}

function showPopupWindow(oPopParam) {
    var p = new Promise(function (resolve, reject) {
        var sIconType = '';
        var bShowCancelButton = false;

        switch (oPopParam['type']) {
            case 'S':  // Success
                sIconType = 'success';
                bShowCancelButton = false;
                break;
            case 'R':  // Required
            case 'E':  // Error
                sIconType = 'error';
                bShowCancelButton = false;
                break;
            case 'Q':  // Quest
                sIconType = 'question';
                bShowCancelButton = true;
                break;
        }

        var oSwalData = {};
        if (oPopParam['title']) {
            oSwalData = $.extend(false,
                oPopParam,
                {
                    title: oPopParam['title'],
                }
            );
        }
        if (oPopParam['text']) {
            oSwalData = $.extend(false,
                oPopParam,
                {
                    text: oPopParam['text'],
                }
            );
        }

        Swal.fire($.extend(false,
            oSwalDefaultOption,
            oSwalData,
            {
                title: oPopParam['title'],
                text: oPopParam['text'],
                //icon: sIconType,
                showCancelButton: bShowCancelButton,
            }
        )).then((result) => {
            if (bShowCancelButton) {
                if (result.value) {
                    resolve('Y');
                }
                else {
                    resolve('N');
                }
            }
            resolve('Y');
        });
    });
    return p;
}

function getLastDay(sYearMonth) {
    // sYearMonth -> 2014-01, 2369/12

    var iYear = sYearMonth.substr(0, 4);
    var iMonth = sYearMonth.substr(5, 2);
    //console.log(iYear, iMonth);

    var oDate = new Date(iYear, iMonth, 0);

    return oDate.getDate();
}

// Property 共用 (BSController, BSControllerFunction, Param, ElementName, OptionAll, DefaultValue)
function publicSetPropertyData(sController, sFunctionName, oParam, sElementName, bOptionAll, sValue) {
    var oData;

    switch (sController) {
        case 'Property':
            oData = getPropertyData(oParam);
            setPropertyData(sElementName, oData, bOptionAll, sValue);
            break;
        default:
            oData = getPropertyDataByController(oParam, sController, sFunctionName);
            setPropertyData(sElementName, oData, bOptionAll, sValue);
            break;
    }
}

function getPropertyData(oParam, sFunctionName = 'GetPropertyList') {
    var oRtn;
    ExecuteAPI_Async('Property', sFunctionName, oParam,
        function (response) {
            //console.log(response);

            if (response.isSuccess && !!response.Data) {
                oRtn = response.Data;
            }
        }
    );
    
    return oRtn;
}

function getPropertyDataByController(oParam, sController, sFunctionName) {
    var oRtn;

    ExecuteAPI_Async(sController, sFunctionName, oParam,
        function (response) {
            //console.log(response);

            if (response.isSuccess && !!response.Data) {
                oRtn = response.Data;
            }
        }
    );

    return oRtn;
}

function setPropertyData(sElementName, oData, tOptionAll = true, sValue = '', sSort = '') {
    //console.log(oData, tOptionAll);

    var oSelect = $('select[name=' + sElementName + ']');
    oSelect.empty();

    if (tOptionAll || 'string' === typeof tOptionAll) {
        var oOptionAll = document.createElement('option');
        oOptionAll.innerText = (tOptionAll) ? '全部' : tOptionAll;
        oOptionAll.value = '';
        oSelect.append(oOptionAll);
    }

    // Sort
    if ('' !== sSort) {
        oData = oData.sort(function (a, b) {
            switch (sSort) {
                case 'ASC':
                    return a[sElementName] > b[sElementName] ? -1 : 1;
                    break;
                case 'DESC':
                    return a[sElementName] > b[sElementName] ? 1 : -1;
                    break;
            }
        });
    }

    $(oData).each(function (iKey, oValue) {
        //console.log(iKey, oValue);
        if (0 < oSelect.length) {
            var oOption = document.createElement('option');
            oOption.innerText = oValue['text'];
            oOption.value = oValue['value'];
            if ('' !== sValue && oValue['value'] === sValue) {
                oOption.defaultSelected = 'selected';
            }
            oSelect.append(oOption);
        }
    });
}

function setPropertyDataByElement(oSelect, oData, tOptionAll = true, sValue = '', sSort = '') {
    //console.log(oSelect, oData, tOptionAll);

    oSelect.empty();

    if (tOptionAll || 'string' === typeof tOptionAll) {
        var oOptionAll = document.createElement('option');
        oOptionAll.innerText = ('string' === typeof tOptionAll) ? tOptionAll : '全部';
        oOptionAll.value = '';
        oSelect.append(oOptionAll);
    }

    // Sort
    if ('' !== sSort) {
        oData = oData.sort(function (a, b) {
            switch (sSort) {
                case 'ASC':
                    return a[sElementName] > b[sElementName] ? -1 : 1;
                    break;
                case 'DESC':
                    return a[sElementName] > b[sElementName] ? 1 : -1;
                    break;
            }
        });
    }

    $(oData).each(function (iKey, oValue) {
        //console.log(iKey, oValue);
        if (0 < oSelect.length) {
            var oOption = document.createElement('option');
            oOption.innerText = oValue['text'];
            oOption.value = oValue['value'];
            if ('' !== sValue && oValue['value'] === sValue) {
                oOption.defaultSelected = 'selected';
            }
            oSelect.append(oOption);
        }
    });
}

// 確認輸入時間  EndTime > StartTime  &  要先輸入StartTime , 帶入參數  Ex:$('#start'), $('#end')
function checkStartEndDate(start_date, end_date) {
    if (start_date.val()) {
        var timmer = new Date(end_date.val()) - new Date(start_date.val());
        if (timmer <= 0) {
            Swal.fire("日期错误", "", "error");
            end_date.val('');
            start_date.val('');
        }
    }
    else {
        Swal.fire("请先填写开始日期", "", "error");
        end_date.val('');
        start_date.val('');
    }
}

// 距離轉換  distance單位m
function convertDistance(distance){
    distance = parseInt(distance);
    
    if(isNaN(distance)){
        return '';
    }
    else{
        if(distance >= 1000){
            return (distance / 1000).toFixed(2).slice(0,-1) + 'km';
        }
        else{
            return distance + 'm';
        }
    }
}