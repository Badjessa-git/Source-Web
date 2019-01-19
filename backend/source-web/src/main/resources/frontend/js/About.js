"use strict";
var backendUrl2 = "https://source-web.herokuapp.com";
var $;
var Handlebars;
var team;
var About = /** @class */ (function () {
    //public static readonly Sec = "cards"
    function About() {
    }
    About.prototype.getTeam = function () {
        $.ajax({
            type: 'GET',
            url: backendUrl2 + '/team',
            dataType: 'json',
            success: this.update
        });
    };
    About.prototype.update = function (data) {
        if (data.mStatus === "ok") {
            $("#" + About.Name).html(Handlebars.templates[About.Name + ".hb"](data));
        }
    };
    About.Name = "Employee";
    return About;
}());
$(document).ready(function () {
    team = new About();
    team.getTeam();
});
