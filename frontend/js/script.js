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
    }
)});