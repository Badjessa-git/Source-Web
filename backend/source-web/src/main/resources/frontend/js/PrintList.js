"use strict";
var backendUrl2 = "https://source-web.herokuapp.com";
var $;
var curEntry;
var alljobform;
var Handlebars;
var curId;
var typeList = ["Not Completed", "Completed"];
var PrintList = /** @class */ (function () {
    function PrintList() {
        this.init();
    }
    /**
     * This will create the table that we will use in the table
     */
    PrintList.prototype.init = function () {
        this.refreshPrintJob();
        PrintList.isInit = true;
    };
    PrintList.prototype.refreshPrintJob = function () {
        var generatedId = window.localStorage.getItem("id");
        $.ajax({
            type: 'GET',
            url: backendUrl2 + '/getJobs/printrequest/' + generatedId,
            dataType: 'json',
            success: this.update
        });
    };
    PrintList.prototype.refreshGraphicWork = function () {
        var generatedId = window.localStorage.getItem("id");
        var values2 = window.localStorage.getItem("values");
        if (values2) {
            window.localStorage.removeItem("values");
        }
        $.ajax({
            type: 'GET',
            url: backendUrl2 + '/getJobs/graphicrequest/' + generatedId
        });
    };
    PrintList.prototype.update = function (data) {
        /// If user is authenticated
        if (data.mStatus === "ok") {
            window.localStorage.setItem("values", JSON.stringify(data));
            $("#" + PrintList.Name).html(Handlebars.templates[PrintList.Name + ".hb"](data));
            $("." + PrintList.Name + "-editbtn").click(PrintList.clickEdit);
        }
        else {
            window.localStorage.clear();
            window.alert("You are not logged in, please log in to use our services");
            $(location).attr('href', './index.html');
        }
    };
    PrintList.clickEdit = function () {
        var id = $(this).data("value");
        var values2 = window.localStorage.getItem("values");
        if (values2) {
            var values = JSON.parse(values2);
            curEntry = values.mData[id - 1];
            $("#" + PrintList.Item).html(Handlebars.templates[PrintList.Item + ".hb"](curEntry));
            $("#options").val(typeList[curEntry.done]);
            $("." + PrintList.Item + "-editbtn").click(PrintList.updateItem);
            window.localStorage.setItem("curItemId", id);
            $('#exampleModalCenter').modal('show');
        }
        else {
            console.log("Error getting the values");
        }
    };
    PrintList.updateItem = function () {
        var updatedval = $("#options").val();
        var value = typeList.indexOf(updatedval);
        curId = window.localStorage.getItem("curItemId");
        var values = JSON.parse(window.localStorage.getItem("values")).mData[curId - 1];
        if (value != values.done) {
            $.ajax({
                type: 'POST',
                url: backendUrl2 + "/update/printrequest/" + value + ":" + curId,
                dataType: 'json',
                success: this.successUpdate,
                failure: function (e) {
                    console.log(e);
                }
            });
        }
    };
    PrintList.successUpdate = function (data) {
        if (data.mStatus !== "ok") {
            window.alert("Error updating element, please try at a different time");
        }
        else {
            window.alert("Update Successful");
            $('#exampleModalCenter').modal('hide');
        }
    };
    PrintList.Name = "PrintList";
    PrintList.Item = "EntryItem";
    PrintList.isInit = false;
    return PrintList;
}());
$(document).ready(function () {
    var userName = window.localStorage.getItem("userName");
    $("p:first").html(userName);
    alljobform = new PrintList();
    alljobform.refreshPrintJob();
});
