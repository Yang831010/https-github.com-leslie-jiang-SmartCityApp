//jsCall
function setAccountInfo(sAccountInfoJSON) {

    if (isAndroid() && !!window.hamels) {
        if (!!window.hamels.jsCall_Login) {
            window.hamels.jsCall_Login(sAccountInfoJSON);
        }
    }
    else if (isIOS() && !!window.webkit) {
        if (!!window.webkit.messageHandlers.jsCall_Login.postMessage) {
            window.webkit.messageHandlers.jsCall_Login.postMessage(sAccountInfoJSON);
        }
    }
    else {
        // WEB
        SetCookie('accountinfojson', sAccountInfoJSON);
    }
}

function getAccountInfo() {

    var vAccountInfo = [];
    var sAccountInfoJson = '';
    if (isAndroid() && !!window.hamels) {
        if (!!window.hamels.jsCall_getAccountData) {
            sAccountInfoJson = window.hamels.jsCall_getAccountData();
        }
    }
    else if (isIOS() && !!window.webkit) {

        var payload = { type: "jsCall", functionName: "jsCall_getAccountData", data: null };
        sAccountInfoJson = prompt(JSON.stringify(payload));

    }
    else {
        // WEB
        sAccountInfoJson = getCookie('accountinfojson');

    }

    if (!!sAccountInfoJson) {
        try {
            vAccountInfo = JSON.parse(sAccountInfoJson);

            // 欄位定義
            $.each(vLoginField, function (sIndex, sLoginFieldName) {
                //console.log(sIndex, sLoginFieldName);

                if (!!vAccountInfo['accountinfo'][sIndex]) {
                    vAccountInfo[sLoginFieldName] = vAccountInfo['accountinfo'][sIndex];
                }
            });
        }
        catch (e) {
            console.log(e.Message);

            Swal.fire(sMsgSystemError);
        }
    }

    return vAccountInfo;

}


function enableAppRefresh() {
    if (isAndroid() && !!window.hamels) {
        if (!!window.hamels.jsCall_EnableAppRefresh) {
            window.hamels.jsCall_EnableAppRefresh();
        }
    }
    else if (isIOS() && !!window.webkit) {
        //IOS
    }
}