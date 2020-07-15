$(document).ready(function () {
    'use strict';
    initList();
});

function initList() {
    var vCarouseList = getCarouselData();
    //console.log(vCarouseList);
    var i = 0;
    $.each(vCarouseList, function (iKey, oValue) {
        if ('' !== oValue['picture_url'] && oValue['website_id'] == '5') {
            console.log(1);
            if (0 === i) {
                $('#carousel').append('<div class="carousel-item active"><img src =' + oValue['picture_url'] + '></div >');
            }
            else {
                $('#carousel').append('<div class="carousel-item"><img src =' + oValue['picture_url'] + '></div >');
            }
            i++;
        }
    });


}
function getCarouselData() {
    var oRtn;

    var oFormData = {
        "isApp":true
    };
    ExecuteAPI_Async('Banner', 'GetList', oFormData,
        function (response) {
            //console.log(response);

            if (response.isSuccess && !!response.Data) {
                oRtn = response.Data;
            }
        }
    );
    return oRtn;
}