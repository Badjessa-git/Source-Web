$(document).ready(function() {

   $("#test").click(function() { 
        $.ajax({
            type: "GET",
            url:"/test",
            dataType: "json",
            success: function(data) {
                alert("the call returned " + JSON.stringify(data));
            }
        });
    }
)});