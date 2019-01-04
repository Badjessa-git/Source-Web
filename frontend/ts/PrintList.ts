const backendUrl2 = "https://source-web.herokuapp.com";
var $ : any;
var alljobform : PrintList;
let Handlebars: any;

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
            url: backendUrl2 + '/getJobs/' + generatedId,
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
            let curEntry = values.mData[id-1];
            $("#"+PrintList.Item).html(Handlebars.templates[PrintList.Item+".hb"](curEntry))
        } else {
            console.log("Error getting the values")
        }
    }
}

$(document).ready(function() {
    alljobform = new PrintList()
    alljobform.refresh()
})