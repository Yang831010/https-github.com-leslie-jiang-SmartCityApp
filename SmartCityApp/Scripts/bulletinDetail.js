var iAccountID
var iBuildingID;
var sAPIName = 'Bulletin';
var iBulletinID;

$(document).ready(function () {
    'use strict';
    iAccountID = vAccountInfo[sLoginPkey];
    iBuildingID = vAccountInfo[sBuildingPkey];

    iBulletinID = (!!getParameterByName('bulletinid', true)) ? getParameterByName('bulletinid', true) : '';
    initList();
});

function initList() {
    var oGetBulletinByNo = getBulletinByNo();
    console.log(oGetBulletinByNo);
    $('#billetin_img').prop('src', oGetBulletinByNo.pictureurl);
    $('#billetin_date').text(oGetBulletinByNo.datefrom + ' ~ ' + oGetBulletinByNo.dateto);
    $('#billetin_title').text(oGetBulletinByNo.title);
    $('#image-cover-image').prop('src', oGetBulletinByNo.pictureurl);
    $('#bulletin_content').text(oGetBulletinByNo.content);
}


//API------------------------------
function getBulletinByNo() {
    var oRtn;

    var oData = {
        "isApp": true,
        "bulletinid": iBulletinID
    };
    ExecuteAPI_Async(sAPIName, 'GetBulletinByNo', oData,
        function (response) {
            console.log(response);

            if (response.isSuccess && !!response.Data) {
                oRtn = response.Data;
            }
        }
    );
    return oRtn;
}