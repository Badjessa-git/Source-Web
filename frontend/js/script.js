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

$('#file_upload').change(function() {
    var i = $('#file_label').clone();
    var file = $('#file_upload')[0].files[0].name;
    $("#file_label").text(file);
  })
)});

$("#num_copies1").hide();

$("#options").change(function() {
    var option = $("#options option:selected").val();
    if (option == "Black") {
        $("#num_copies1").hide()
        $("#num_copies").show()
    } else {
        $("#num_copies1").show()
        $("#num_copies").hide()
    }
})
