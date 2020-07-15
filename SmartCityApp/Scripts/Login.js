$(document).ready(function () {
    'use strict';

    setTitle('登入');

    console.log(window.decodeURIComponent(window.atob(window.location.search.substring(1))));
    $('#account').val('0972732158');
    $('#password').val('a831010110');
    // BIND --------------------------------------------------
    $('#memberform').on('submit', function () {
        GoNext();
    });
    // BIND --------------------------------------------------

    //var oParam_CountryTel = { key: 'country_tel_code' };
    //var oData_CountryTel = getPropertyData(oParam_CountryTel);
    //setPropertyDataByElement($('select[id=country_tel_code]'), oData_CountryTel, false);
    var iClick = 0;
    var vTestAccount = ['hugh', 'peter', 'jason', 'leslie'];
    $('#testaccount').on('click', function () {
        var fn = window[vTestAccount[iClick]];
        if (typeof fn === 'function') {
            fn();
        }

        if (iClick === (vTestAccount.length - 1)) {
            iClick = 0;
        }
        else {
            iClick++;
        }
    });
    // BIND --------------------------------------------------

    // $('#type').change();
});

function GoNext() {
    var sAccount = $('#account').val().trim();
    var sPassword = $('#password').val().trim();
    var sType = $('#type').val().trim();
    var isApp = $('#isApp').val().trim();

    if ('' === sAccount) {
        Swal.fire('请输入账号');
        return;
    }
    if ('' === sPassword) {
        Swal.fire('请输入密码');
        return;
    }

    var oParam = {
        'account': sAccount,
        'password': sPassword,
        'type': sType,
        'isApp': isApp,
        'buildingid':1
    };

    doLogin(oParam);
}

function hugh() {
    // Hugh
    $('#country_tel_code').val('Taiwan');
    $('#account').val('0919694695');
    $('#password').val('qqq111');
}

function peter() {
    // Peter
    $('#country_tel_code').val('Taiwan');
    $('#account').val('0972732158');
    $('#password').val('a831010110');
}

function jason() {
    // Jason
    $('#country_tel_code').val('Taiwan');
    $('#account').val('0905188997');
    $('#password').val('qqq111');
}

function leslie() {
    // leslie
    $('#country_tel_code').val('Taiwan');
    $('#account').val('0903762527');
    $('#password').val('leslie');
}