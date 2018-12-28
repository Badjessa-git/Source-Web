const backendUrl2 = "https://source-web.herokuapp.com";
var $ : any;
var alljobform : AllJobForm;

class AllJobForm {

    constructor() {
        this.refresh();
    }

    refresh(): any {
        $.ajax({
            type: 'GET',
            url: backendUrl2 + '/getAll',
            dataType: 'json',
            success: function(data: any) {
                if (data.mStatus === "ok") {
                    var jobs = data.mData;
                }
            }
        })
    }
    
}
