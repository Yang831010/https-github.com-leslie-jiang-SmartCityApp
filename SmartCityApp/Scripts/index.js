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
    vCarouselData = getCarouselData();
    var setHTML = '';
    if (vCarouselData.length > 0) {
        $.each(vCarouselData, function (iKey, oValue) {
            switch (iKey) {
                case 0:
                    setHTML += '<div class="carousel-item active">';
                    setHTML += '<img src="' + oValue['pictureurl'] + '" class="d-block w-100">';
                    setHTML += '</div>';
                    break;

                default:
                    setHTML += '<div class="carousel-item">';
                    setHTML += '<img src="' + oValue['pictureurl'] + '" class="d-block w-100">';
                    setHTML += '</div>';
                    break;
            }
        });
        $('#carouselList').append(setHTML);
    }

    vGetPhone = getPhoneByBuildingNo();
}

//API------------------------------
function getCarouselData() {
    var vRtn;

    var oData = {
        "isApp": true,
        "buildingid": iBuildingID
    };
    ExecuteAPI_Async(sAPIName, 'GetList', oData,
        function (response) {
            console.log(response);

            if (response.isSuccess && !!response.Data) {
                vRtn = response.Data;
            }
        }
    );
    return vRtn;
}