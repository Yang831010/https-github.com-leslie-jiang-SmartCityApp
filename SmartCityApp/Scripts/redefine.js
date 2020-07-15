// For Test
switch (location.hostname) {
    case 'localhost':
        webApiUrl = '';
        break;
    default:
        webApiUrl = '//smalltowntest.jotangi.net';
        break;
}

function ExecuteAPI(catalogOrOptions, method, para, success, fail) {
    var catalog = catalogOrOptions;
    $.ajax({
        url: webApiUrl + "/api/" + catalog + "/" + method,
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
        //async: false,
        async: true,
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

function ExecuteAPI_Async(catalogOrOptions, method, para, success, fail) {
    var catalog = catalogOrOptions;
    $.ajax({
        url: webApiUrl + "/api/" + catalog + "/" + method,
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

function ExecuteAPI_FormData(sControllerName, sMethodName, oFormData, fnSuccess, fnFail) {
    $.ajax({
        url: webApiUrl + '/api/' + sControllerName + '/' + sMethodName,
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