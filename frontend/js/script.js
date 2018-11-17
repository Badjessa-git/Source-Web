var $ = require('jquery')

$(document).ready(function() {

   $("#jobs").click(function() { 
        $.ajax({
            type: "GET",
            url:"/jobs",
            dataType: "json",
            success: function(data) {
                alert("the call returned " + JSON.stringify(data));
            }
        });
    },

    function submit_print_job() {
        var formdata = document.querySelector('printJob');
        var form = new FormData(formdata);
        $.ajax({
            type: "POST",
            url: "/submit_request",
            data: formdata,
            success: function(data) {
                alert("Successful Submission, Go to the source in the next 5 to 10 min")
            },
            error: function(data) {
                alert("There was an error submitting your form please try again")
            }

        })
    }
)});