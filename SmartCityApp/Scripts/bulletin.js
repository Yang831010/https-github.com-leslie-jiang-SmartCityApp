var iAccountID
var iBuildingID;
var sAPIName = 'Bulletin';

$(document).ready(function () {
    'use strict';
    iAccountID = vAccountInfo[sLoginPkey];
    iBuildingID = vAccountInfo[sBuildingPkey];

    initList();
});

function initList() {
    vGetBulletinList = getBulletinList();
    console.log(vGetBulletinList);
    if (vGetBulletinList.length > 0) {
        $.each(vGetBulletinList, function (iKey, oValue) {
            switch (oValue.typecode) {
                case 'I':
                    console.log('I' + oValue.bulletinid);
                    $('#bulletin_I').append('<li onclick="goDetail(' + oValue.bulletinid + ');" class="list-group-item"> <span class="mr-3"><small>' + oValue.datefrom + '~' + oValue.dateto + '</small></span><p class="mt-3">' + oValue.title + '</p></li>');
                    break;
                case 'F':
                    console.log('F' + oValue.bulletinid);
                    $('#bulletin_F').append('<li onclick="goDetail(' + oValue.bulletinid + ');" class="list-group-item"> <span class="mr-3"><small>' + oValue.datefrom + '~' + oValue.dateto + '</small></span><p class="mt-3">' + oValue.title + '</p></li>');
                    break;
                case 'A':
                    var setHtml = '';
                    setHtml +=  '<div onclick="goActivity(' + oValue.refid + ');" class="card shadow">';
                    setHtml +=  '<div class="card-header bg-transparent" style="color: #000000">' + oValue.datefrom + '~' + oValue.dateto + '</div>';
                    setHtml +=      '<div class="card-body text-primary ">';
                    setHtml +=          '<img src="' + oValue.firstpictureurl+'" class="img-fluid" alt="Placeholder image">';
                    setHtml +=      '</div>';
                    setHtml +=  '<div class="card-footer bg-transparent bg-primary" style="color: #000000">' + oValue.title + '</div>';
                    setHtml += '</div>';
                    $('#bulletin_A').append(setHtml);
                    break;
            }
        });
    }
}

function goDetail(sID) {
    console.log(sID);
    goPage('bulletinDetail.html?', 'bulletinid=' + sID);
}

function goActivity(sID) {
    console.log(sID);
}

//API------------------------------
function getBulletinList() {
    var vRtn;

    var oData = {
        "isApp": true,
        "buildingid": iBuildingID
    };
    ExecuteAPI_Async(sAPIName, 'GetBulletinList', oData,
        function (response) {
            console.log(response);

            if (response.isSuccess && !!response.Data) {
                vRtn = response.Data;
            }
        }
    );
    return vRtn;
}