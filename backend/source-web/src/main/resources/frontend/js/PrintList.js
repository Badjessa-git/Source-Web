"use strict";
var backendUrl2 = "https://source-web.herokuapp.com";
var $;
var curEntry;
var alljobform;
var Handlebars;
var curId;
var typeList = ["Not Completed", "Completed"];
Handlebars.registerHelper("inc", function (value, options) {
    return parseInt(value) + 1;
});
var PrintList = /** @class */ (function () {
    function PrintList() {
    }
    //Send a request to the back end to retrieve all of the submitted printjobs
    PrintList.prototype.refreshPrintJob = function () {
        var generatedId = window.localStorage.getItem("id");
        var values2 = window.localStorage.getItem("values");
        if (values2) {
            window.localStorage.removeItem("values");
        }
        $.ajax({
            type: 'GET',
            url: backendUrl2 + '/getJobs/printrequest/' + generatedId,
            dataType: 'json',
            success: this.update
        });
    };
    // This function will make a get request to the backend to retrieve all of the graphic design request that were added
    PrintList.prototype.refreshGraphicWork = function () {
        var generatedId = window.localStorage.getItem("id");
        var values2 = window.localStorage.getItem("values");
        if (values2) {
            window.localStorage.removeItem("values");
        }
        $.ajax({
            type: 'GET',
            url: backendUrl2 + '/getJobs/graphicrequest/' + generatedId,
            dataType: 'json',
            success: this.updateGraphic
        });
    };
    //Send an Ajax response to get all of the item of request
    PrintList.prototype.refreshRequests = function () {
        var generatedId = window.localStorage.getItem("id");
        var values2 = window.localStorage.getItem("values");
        if (values2) {
            window.localStorage.removeItem("values");
        }
        $.ajax({
            type: 'GET',
            url: backendUrl2 + '/getJobs/allrequest/' + generatedId,
            dataType: 'json',
            success: this.updateRequest
        });
    };
    //Update the table on the html page with the values returned from the call
    PrintList.prototype.updateRequest = function (data) {
        if (data.mStatus === "ok") {
            $("#" + PrintList.Request).html(Handlebars.templates[PrintList.Request + ".hb"](data));
            $("." + PrintList.Request + "-clubMonthbtn").click(PrintList.getTopClubs);
            window.localStorage.setItem("values", JSON.stringify(data));
        }
        else {
            window.localStorage.clear();
            window.alert("You are not logged in, please log in to use our services");
            $(location).attr('href', './index.html');
        }
    };
    //Same as top
    PrintList.prototype.updateGraphic = function (data) {
        if (data.mStatus === "ok") {
            $("#" + PrintList.Graphic).html(Handlebars.templates[PrintList.Graphic + ".hb"](data));
            $("." + PrintList.Graphic + "-editbtn").click(PrintList.editGraphic);
            window.localStorage.setItem("values", JSON.stringify(data));
        }
        else {
            window.localStorage.clear();
            window.alert("You are not logged in, please log in to use our services");
            $(location).attr('href', './index.html');
        }
    };
    PrintList.prototype.update = function (data) {
        /// If user is authenticated
        if (data.mStatus === "ok") {
            window.localStorage.setItem("values", JSON.stringify(data));
            $("#" + PrintList.Name).html(Handlebars.templates[PrintList.Name + ".hb"](data));
            $("." + PrintList.Name + "-editbtn").click(PrintList.editPrintJob);
        }
        else {
            window.localStorage.clear();
            window.alert("You are not logged in, please log in to use our services");
            $(location).attr('href', './index.html');
        }
    };
    PrintList.editGraphic = function () {
        var id = $(this).data("value");
        var values2 = window.localStorage.getItem("values");
        if (values2) {
            var values = JSON.parse(values2);
            curEntry = values.mData[id - 1];
            $("#" + PrintList.GrahicItem).html(Handlebars.templates[PrintList.GrahicItem + ".hb"](curEntry));
            //$("#options").val(typeList[curEntry.done])
            $("." + PrintList.GrahicItem + "-editbtn").click(PrintList.updateItem);
            window.localStorage.setItem("curItemId", id);
            $('#exampleModalCenter2').modal('show');
        }
        else {
            console.log("Error getting the values");
        }
    };
    PrintList.editPrintJob = function () {
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
        var generatedId = window.localStorage.getItem("id");
        curId = window.localStorage.getItem("curItemId");
        var values = JSON.parse(window.localStorage.getItem("values")).mData[curId - 1];
        if (value != values.done) {
            $.ajax({
                type: 'POST',
                url: backendUrl2 + "/update/printrequest/" + value + ":" + curId + "/" + generatedId,
                dataType: 'json',
                success: this.successUpdate,
                failure: function (e) {
                    console.log(e);
                }
            });
        }
    };
    //Make a call to get all of the top clubs
    PrintList.getTopClubs = function () {
        var generatedId = window.localStorage.getItem("id");
        $.ajax({
            type: 'GET',
            url: backendUrl2 + '/clubs/' + generatedId,
            dataType: 'JSON',
            success: function (data) {
                console.log("Here");
                if (data.mStatus === "ok") {
                    $("#" + PrintList.Club).html(Handlebars.templates[PrintList.Club + ".hb"](data));
                    $('#exampleModalCenter3').modal('show');
                }
            }
        });
    };
    // private static returnClubs(data: any) {
    //     console.log("Here");
    //     if (data.mStatus === "ok") {
    //         $("#"+PrintList.Club).html(Handlebars.templates[PrintList.Club+".hb"](data))
    //         $('#exampleModalCenter3').modal('show')
    //     }
    // }
    PrintList.successUpdate = function (data) {
        if (data.mStatus !== "ok") {
            window.alert("Error updating element, please try at a different time");
        }
        else {
            window.alert("Update Successful");
            $('#exampleModalCenter').modal('hide');
            location.reload();
        }
    };
    PrintList.Name = "PrintList";
    PrintList.Item = "EntryItem";
    PrintList.Graphic = "GraphicList";
    PrintList.GrahicItem = "GraphicItem";
    PrintList.Request = "RequestList";
    PrintList.Club = "MonthClub";
    PrintList.isInit = false;
    return PrintList;
}());
$(document).ready(function () {
    var userName = window.localStorage.getItem("userName");
    $("p:first").html(userName);
    alljobform = new PrintList();
    alljobform.refreshPrintJob();
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var curTab = e.target; // newly activated tab
        var curPanel = curTab.getAttribute("href").substring(1);
        switch (curPanel) {
            case PrintList.Name:
                alljobform.refreshPrintJob();
                break;
            case PrintList.Graphic:
                alljobform.refreshGraphicWork();
                break;
            case PrintList.Request:
                alljobform.refreshRequests();
                break;
        }
    });
});
