"use strict";
var backendUrl1 = "https://source-web.herokuapp.com";
var $;
var jobRequestForm;
/**
 * Encapsulate the job request form
 */
var JobRequestForm = /** @class */ (function () {
    function JobRequestForm() {
        $('#submit').click(this.submitForm);
    }
    //Form Submission
    JobRequestForm.prototype.submitForm = function () {
        var firstName = $('#firstname').val();
        var lastName = $('#lastname').val();
        var email = $('#email').val();
        var club = $('#club_orgs').val();
        var color = $('#options option:selected').val();
        var num_copies = 0;
        var col = 0;
        if (color == "Black") {
            num_copies = $('#num_copies option:selected').val();
        }
        else {
            num_copies = $('#num_copies1 option:selected').val();
            col = 1;
        }
        //This contains all the information we need about our pdf
        var file_data = {};
        var files = $('#file_upload')[0].files[0];
        var file = JSON.stringify(files);
        //Make hte Ajax call with all the information we got from earlier
        $.ajax({
            type: 'POST',
            url: backendUrl1 + "/submit/n_req",
            dataType: "json",
            data: JSON.stringify({
                "firstName": firstName,
                "lastName": lastName,
                "club": club,
                "file_data": file,
                "email": email,
                "color": col,
                "num_copies": num_copies
            }),
            success: function (data) {
                if (data.mStatus === "ok") {
                    window.alert("Your submission has been successful, you can pick up your request in the next 10-15 mins");
                    $(location).attr('href', './index.html');
                }
                else {
                    window.alert("There was an error with the server, please verify your information or try again later");
                }
            }
        });
    };
    return JobRequestForm;
}());
$(document).ready(function () {
    jobRequestForm = new JobRequestForm();
});
