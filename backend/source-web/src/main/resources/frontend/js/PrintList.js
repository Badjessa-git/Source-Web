"use strict";
var backendUrl2 = "https://source-web.herokuapp.com";
var $;
var alljobform;
var Handlebars;
var PrintList = /** @class */ (function () {
    function PrintList() {
        this.init();
    }
    /**
     * This will create the table that we will use in the table
     */
    PrintList.prototype.init = function () {
        this.refresh();
        PrintList.isInit = true;
    };
    PrintList.prototype.refresh = function () {
        var generatedId = window.localStorage.getItem("id");
        $.ajax({
            type: 'GET',
            url: backendUrl2 + '/getJobs/' + generatedId,
            dataType: 'json',
            success: this.update
        });
    };
    PrintList.prototype.update = function (data) {
        /// If user is authenticated
        if (data.mStatus === "ok") {
            $("#" + PrintList.Name).html(Handlebars.templates[PrintList.Name + ".hb"](data));
        }
        else {
            window.localStorage.clear();
            window.alert("You are not logged in, please log in to use our services");
            $(location).attr('href', './index.html');
        }
    };
    PrintList.Name = "PrintList";
    PrintList.isInit = false;
    return PrintList;
}());
$(document).ready(function () {
    alljobform = new PrintList();
    alljobform.refresh();
});
