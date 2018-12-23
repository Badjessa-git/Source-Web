"use strict";
var backendUrl = "https://source-web.herokuapp.com";
var $;
var graphicReqFrom;
var GraphicReqForm = /** @class */ (function () {
    function GraphicReqForm() {
        $('#submit').click(this.submitForm);
    }
    GraphicReqForm.prototype.submitForm = function () {
        var firstName = $('#firstname').val();
        var lastName = $('#lastname').val();
        var email = $('#email').val();
        var club = $('#club_orgs').val();
        var event_name = $('#event_name').val();
        var event_date = $('#event_date').val();
        var poster_date = $('#poster_date').val();
        var notes = $('#notes').val();
        //This contains all the information we need about our pdf
        var file_data = {};
        var file = $('#file_upload')[0].files;
        //Make hte Ajax call with all the information we got from earlier
        $.ajax({
            type: 'POST',
            url: backendUrl + "/submit/g_req",
            processData: false,
            contentType: false,
            dataType: "json",
            data: JSON.stringify({
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "club": club,
                "event_name": event_name,
                "event_date": event_date,
                "poster_date": poster_date,
                "notes": notes,
                "file_data": file
            }),
            success: function (data) {
                if (data.mStatus === "ok") {
                    window.alert("Your submission has been received, you will receive an email confirmation"
                        + "and we will contact you if we need more information\nThank you for using the source");
                    $(location).attr('href', './index.html');
                }
                else {
                    window.alert("Error with the submisssion, please try again later");
                }
            }
        });
    };
    return GraphicReqForm;
}());
$(document).ready(function () {
    graphicReqFrom = new GraphicReqForm();
});
