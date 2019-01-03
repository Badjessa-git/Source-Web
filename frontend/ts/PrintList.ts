const backendUrl2 = "https://source-web.herokuapp.com";
var $ : any;
var alljobform : PrintList;
let Handlebars: any;

class PrintList {

    private static readonly Name = "PrintList"
    private static isInit = false;

    /**
     * This will create the table that we will use in the table
     */
    private static init() {
        this.refresh();
        PrintList.isInit = true;
    } 

    public static refresh(): any {
        $.ajax({
            type: 'GET',
            url: backendUrl2 + '/getJobs',
            dataType: 'json',
            success: PrintList.update
        })
    }
    
    private static update(data: any) {
        $("#"+PrintList.Name).html(Handlebars.templates[PrintList.Name+".hb"])
    }
}
