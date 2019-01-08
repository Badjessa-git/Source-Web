const backendUrl2 = "https://source-web.herokuapp.com";
var $ : any;
let curEntry: any;
var alljobform : PrintList;
let Handlebars: any;
let curId : any;
const typeList = ["Not Completed", "Completed"]

class PrintList {

    public static readonly Name = "PrintList"
    private static readonly Item = "EntryItem"
    public static readonly Graphic = "GraphicList"
    private static readonly GrahicItem = "GraphicItem"
    public static readonly Request = "RequestList"
    private static isInit = false;

    constructor() {
        this.init();
    }
    /**
     * This will create the table that we will use in the table
     */
    private init() {
        PrintList.isInit = true;
    } 

    public refreshPrintJob() {
        var generatedId = window.localStorage.getItem("id");
        var values2 = window.localStorage.getItem("values");
        if (values2) {
            window.localStorage.removeItem("values");
        }
        $.ajax({
            type: 'GET',
            url: backendUrl2 + '/getJobs/printrequest/' + generatedId,
            dataType: 'json',
            success: this.update,
        })
    }

    public refreshGraphicWork() {
        var generatedId = window.localStorage.getItem("id");
        var values2 = window.localStorage.getItem("values");
        if (values2) {
            window.localStorage.removeItem("values");
        }
        $.ajax({
            type: 'GET',
            url: backendUrl2 + '/getJobs/graphicrequest/' + generatedId,
            dataType: 'json',
            success: this.updateGraphic,
        })
    }
    
    public refreshRequests() {
        var generatedId = window.localStorage.getItem("id");
        var values2 = window.localStorage.getItem("values");
        if (values2) {
            window.localStorage.removeItem("values");
        }
        $.ajax({
            type: 'GET',
            url: backendUrl2 + '/getJobs/allrequest/' + generatedId,
            dataType: 'json',
            success: this.updateRequest,
        })
    }

    private updateRequest(data: any) {
        if (data.mStatus === "ok") {
            $("#"+PrintList.Request).html(Handlebars.templates[PrintList.Request+".hb"](data))
            window.localStorage.setItem("values", JSON.stringify(data));

        } else {
            window.localStorage.clear();
            window.alert("You are not logged in, please log in to use our services")
            $(location).attr('href', './index.html');
        }
    }
    private updateGraphic(data: any) {
        if (data.mStatus === "ok") {
            $("#"+PrintList.Graphic).html(Handlebars.templates[PrintList.Graphic+".hb"](data))
            $("." + PrintList.Graphic + "-editbtn").click(PrintList.editGraphic);
            window.localStorage.setItem("values", JSON.stringify(data));

        } else {
            window.localStorage.clear();
            window.alert("You are not logged in, please log in to use our services")
            $(location).attr('href', './index.html');
        }
    }
    private update(data: any) {
        /// If user is authenticated
        if (data.mStatus === "ok") {
            window.localStorage.setItem("values", JSON.stringify(data));
            $("#"+PrintList.Name).html(Handlebars.templates[PrintList.Name+".hb"](data))
            $("." + PrintList.Name + "-editbtn").click(PrintList.editPrintJob);
        } else {
            window.localStorage.clear();
            window.alert("You are not logged in, please log in to use our services")
            $(location).attr('href', './index.html');
        }
    }
    
    private static editGraphic() {
        let id = $(this).data("value");
        var values2 = window.localStorage.getItem("values");
        if (values2) {
            var values = JSON.parse(values2)
            curEntry = values.mData[id-1];
            $("#"+PrintList.GrahicItem).html(Handlebars.templates[PrintList.GrahicItem+".hb"](curEntry))
           //$("#options").val(typeList[curEntry.done])
            $("."+PrintList.GrahicItem+"-editbtn").click(PrintList.updateItem);
            window.localStorage.setItem("curItemId", id);
            $('#exampleModalCenter2').modal('show')
        } else {
            console.log("Error getting the values")
        }
    }

    private static editPrintJob() {
        let id = $(this).data("value");
        var values2 = window.localStorage.getItem("values");
        if (values2) {
            var values = JSON.parse(values2)
            curEntry = values.mData[id-1];
            $("#"+PrintList.Item).html(Handlebars.templates[PrintList.Item+".hb"](curEntry))
            $("#options").val(typeList[curEntry.done])
            $("."+PrintList.Item+"-editbtn").click(PrintList.updateItem);
            window.localStorage.setItem("curItemId", id);
            $('#exampleModalCenter').modal('show')
        } else {
            console.log("Error getting the values")
        }
    }

    private static updateItem() {
        var updatedval = $("#options").val();
        var value = typeList.indexOf(updatedval)
        curId = window.localStorage.getItem("curItemId");
        let values = JSON.parse(window.localStorage.getItem("values")).mData[curId-1];
        if (value != values.done) {
            $.ajax({
                type: 'POST',
                url: backendUrl2 + "/update/printrequest/" + value + ":" + curId,
                dataType: 'json',
                success: this.successUpdate,
                failure: function(e: any) {
                    console.log(e)
                }
            })
        } 
        
    }

    private static successUpdate(data: any) {
        if (data.mStatus !== "ok") {
            window.alert("Error updating element, please try at a different time");
        } else {
            window.alert("Update Successful")
            $('#exampleModalCenter').modal('hide')
        }
    }
}

$(document).ready(function() {
    const userName = window.localStorage.getItem("userName");
    $("p:first").html(userName);
    alljobform = new PrintList()
    alljobform.refreshPrintJob();
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e: any) {
        var curTab = e.target // newly activated tab
        let curPanel = curTab.getAttribute("href").substring(1);
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
    })
})