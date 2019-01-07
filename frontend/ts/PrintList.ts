const backendUrl2 = "https://source-web.herokuapp.com";
var $ : any;
let curEntry: any;
var alljobform : PrintList;
let Handlebars: any;
let curId : any;
const typeList = ["Not Completed", "Completed"]

class PrintList {

    private static readonly Name = "PrintList"
    private static readonly Item = "EntryItem"
    private static isInit = false;

    constructor() {
        this.init();
    }
    /**
     * This will create the table that we will use in the table
     */
    private init() {
        this.refresh();
        PrintList.isInit = true;
    } 

    public refresh() {
        var generatedId = window.localStorage.getItem("id");
        $.ajax({
            type: 'GET',
            url: backendUrl2 + '/getJobs/printrequest/' + generatedId,
            dataType: 'json',
            success: this.update,
        })
    }
    
    private update(data: any) {
        /// If user is authenticated
        if (data.mStatus === "ok") {
            window.localStorage.setItem("values", JSON.stringify(data));
            $("#"+PrintList.Name).html(Handlebars.templates[PrintList.Name+".hb"](data))
            $("." + PrintList.Name + "-editbtn").click(PrintList.clickEdit);
        } else {
            window.localStorage.clear();
            window.alert("You are not logged in, please log in to use our services")
            $(location).attr('href', './index.html');
        }
    }

    private static clickEdit() {
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
        const values = JSON.parse(window.localStorage.getItem("values")).mData[curId-1]
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
    alljobform.refresh()
})