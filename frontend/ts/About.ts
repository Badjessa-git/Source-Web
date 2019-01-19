const backendUrl2 = "https://source-web.herokuapp.com";
var $ : any;
let Handlebars : any;
var team : About;

class About {
    public static readonly Name = "Employee"
    //public static readonly Sec = "cards"
    constructor() {
    }

    public getTeam() {
        $.ajax({
            type: 'GET',
            url: backendUrl2 + '/team',
            dataType: 'json',
            success: this.update,
        })
    }

    private update(data: any) {
        if (data.mStatus === "ok") {
            $("#"+About.Name).html(Handlebars.templates[About.Name+".hb"](data))
        }
    }
}

$(document).ready(function () {
    team = new About();
    team.getTeam();
})


