var iAccountID
var iBuildingID;
var sAPIName = 'Building';

$(document).ready(function () {
    'use strict';
    iAccountID = vAccountInfo[sLoginPkey];
    iBuildingID = vAccountInfo[sBuildingPkey];

    initList();
});

function initList(){
    oGetPhone = getPhoneByBuildingNo();
    $('#call_phone').on('click', function () {
        location.href = 'tel:' + oGetPhone.securityphone;
    })
}



function getPhoneByBuildingNo() {
    var oRtn;

    var oData = {
        "isApp": true,
        "buildingid": iBuildingID
    };
    ExecuteAPI_Async(sAPIName, 'GetPhoneByBuildingNo', oData,
        function (response) {
            console.log(response);

            if (response.isSuccess && !!response.Data) {
                oRtn = response.Data;
            }
        }
    );
    return oRtn;
}