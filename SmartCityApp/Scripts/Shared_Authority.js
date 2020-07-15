var vAccountInfo;
var iLoginTimeLimit = 60;  // 分鐘
var sPageType = 'H';

if (-1 !== location.pathname.indexOf('store_')) {
    sPageType = 'S';
}

var sDefaultLoginPage = '/login.html';
var sDefaultIndexPage = '/index.html';

var vLoginField = [
    'accountid',
    'buildingid',
    'householdid',
    'householderid',
];
var sLoginPkey = vLoginField[0];
var sBuildingPkey = vLoginField[1];
var sHouseholdidPkey = vLoginField[2];
var sHouseholderidPkey = vLoginField[3];

$(document).ready(function () {
    'use strict';
    // 重置登入分鐘
    var oLoginTime = new Date();
    oLoginTime.setMinutes(oLoginTime.getMinutes() + iLoginTimeLimit);
    SetCookie('LoginDeadline', oLoginTime.valueOf());

    // GetLoginPkey By App
    vAccountInfo = getAccountInfo();
    var iAccountID = vAccountInfo[sLoginPkey];

    if (!!iAccountID) {

        setTimeout(function () {
            checkLogin();
        }, iLoginTimeLimit * 60 * 1000);
    }
});


function checkLogin(oLoginParamExt) {
    console.log('checkLogin', oLoginParamExt);
     //var vAccountInfo = getAccountInfo();

    var oTempLoginParam = {};
    		oTempLoginParam[sLoginPkey] = vAccountInfo[sLoginPkey];
    		oTempLoginParam['PathName'] = location.pathname + location.search;
	
    		var oLoginParam = $.extend(
    		    oTempLoginParam,
    		    (!!oLoginParamExt) ? oLoginParamExt : {}
    		);
    		//console.log(oLoginParam);
    		
    		var sParam = '';
    		if (!!oLoginParam['PathName']) {
    		    sParam += 'PathName=' + oLoginParam['PathName'];
    		}
    		
    		if (!oLoginParam[sLoginPkey]) {
    		    // 未登入
    		   history.replaceState('', '', sDefaultLoginPage + '?' + encodeURIParm(sParam));
    		    goPage(sDefaultLoginPage + '?', sParam);
    		}
    		else {
    		    // 已登入 檢查是否過期
    		    var iNowTime = new Date().valueOf();
    		    //console.log(iNowTime, getCookie('LoginDeadline'), (getCookie('LoginDeadline') - iNowTime));
    		    if (iNowTime > getCookie('LoginDeadline')) {
    		        doLogout({
    		            PathName: sDefaultLoginPage + '?' + encodeURIParm(sParam)
    		        });
    		    }
    		    //checkLoginTime();
    		    console.log('已登入', oLoginParam[sLoginPkey], vAccountInfo[vLoginField[1]]);
	 }

}

var iCountDown = iLoginTimeLimit * 60;
var iCountDownID;
function checkLoginTime() {
    console.log(iCountDown);

    if (iCountDown == 0) {
        //alert("倒數結束");
        clearTimeout(iCountDownID);
    } else {
        iCountDown--;
        if (iCountDownID) {
            clearTimeout(iCountDownID);
        }
        iCountDownID = setTimeout(checkLoginTime, 1000);
    }
}

function doLogin(oParam) {
    console.log('doLogin');
    console.log(oParam);
    showLoading();

    ExecuteAPI('Account', 'Login', oParam,
        function (response) {
            console.log(response);

            var vMessage = response.Message.split('|');

            // 定義要去的頁面 OR 回去的頁面
            var sPathName = (!!getParameterByName('PathName', true)) ? getParameterByName('PathName', true) : sDefaultIndexPage;
            console.log(sPathName);

            var bError = false;
            var sMessage = '';

            do {
                // Check API ----------
                if (!response.isSuccess) {
                    bError = true;
                    sMessage = sMsgSystemError;

                    break;
                }
                // Check API ----------

                // Check MessageCode ----------
                switch (vMessage[0]) {
                    case 'L_1X000':  // 登入成功
                        //enableAppRefresh();
                        bError = false;
                        try {
                            var vData = JSON.parse(response.Data);
                            console.log(vData);

                            var oTempAccountInfo = {
                                'accountinfo': [parseInt(vData[0]['accountid']), parseInt(vData[0]['buildingid']), parseInt(vData[0]['householdid']), parseInt(vData[0]['householderid'])]
                            };
                            console.log(oTempAccountInfo);
                            var sTempAccountInfo = JSON.stringify(oTempAccountInfo);

                            setAccountInfo(sTempAccountInfo);

                            switch (sPageType) {
                                case 'H':
                                    if (sDefaultIndexPage === sPathName) {
                                        if (isAndroid() && !!window.hamels) {
                                            if (!!window.hamels.jsCall_Back) {
                                                window.hamels.jsCall_Back();  // 仅App 使用此流程
                                            }
                                        }
                                        else if (isIOS() && !!window.webkit) {
                                           if (!!window.webkit.messageHandlers.jsCall_Back.postMessage) {
            								window.webkit.messageHandlers.jsCall_Back.postMessage(null);
        								  }
                                        }
                                    }
                                    else {
                                        // WEB
                                        history.replaceState('', '', sPathName);
                                        goPage(sPathName);
                                    }
                                    break;
                                case 'S':
                                    history.replaceState('', '', sPathName);
                                    goPage(sPathName);
                                    break;
                            }
                        }
                        catch (e) {
                            //console.log(e.Message);
                            bError = true;
                            sMessage = e.Message;
                        }
                        break;
                    case 'L_0X000':  // 登入帐号错误或密码检核错误
                    case 'L_0X002':  // 此账号已停用
                        bError = true;
                        sMessage = vMessage[1];
                        break;
                    case 'L_0X003':  // 无此账号
                        switch (oParam['type']) {
                            case 'M':
                                var sUrlParam = '';
                                sUrlParam += 'my_CountryTel=' + oParam['country_tel_code'];
                                sUrlParam += '&my_Phone=' + oParam['account'];
                                sUrlParam += '&PathName=' + sPathName;  // 要回去的頁面

                                var oPopParam = {};
                                oPopParam['type'] = 'Q';
                                oPopParam['title'] = vMessage[1] + '跳转注册页？';
                                showPopupWindow(oPopParam).then(function (sStatus) {
                                    switch (sStatus) {
                                        case 'Y':
                                            goPage('VerificationPhone.html?', sUrlParam);
                                            break;
                                        case 'N':
                                            break;
                                    }
                                });
                                break;
                            case 'S':
                                bError = true;
                                sMessage = vMessage[1];
                                break;
                        }
                        break;
                }

                // For Switch Break
                if (bError) {
                    break;
                }
                // Check MessageCode ----------

                // Other Condition...
            }
            while (false);

            if (bError) {
                oPopParam = {};  // already var
                oPopParam['type'] = 'E';
                oPopParam['title'] = sMessage ;
                showPopupWindow(oPopParam);
            }

            hideLoading();
        }
    );
}

function doLogout(oLogoutParamExt) {
    console.log('doLogout');

    var oLogoutParam = $.extend(
        {
            'PathName': sDefaultIndexPage,
        },
        (!!oLogoutParamExt) ? oLogoutParamExt : {}
    );

    showLoading();

    if (isAndroid() && !!window.hamels) {
        if (!!window.hamels.jsCall_Logout) {
            window.hamels.jsCall_Logout();
        }
    }
    else if (isIOS() && !!window.webkit) {
        if (!!window.webkit.messageHandlers.jsCall_Logout.postMessage) {
            window.webkit.messageHandlers.jsCall_Logout.postMessage(null);
        }
    }
    else {
        delCookie('accountinfojson');
    }

    var sPathName = oLogoutParam['PathName'];
    history.replaceState('', '', sPathName);
    //console.log(sPathName);

    goPage(sPathName);

    hideLoading();
}