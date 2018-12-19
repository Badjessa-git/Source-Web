let file_name = ""
let file = null
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

    $('').click(function() {

    }),
   
    $("#submit").click(function submit_print_job() {
        //Get all the values of the data
        let data = new FormData('printJob').val()
        let firstName = data.get('lastname').val()
        let lastName = data.get('lastname').val()
        let email = data.get('email').val()
        let club = data.get('club_orgs').val()
        let color = data.get('option').val()
        let num_copies = 0
        if (color == "Black") {
           num_copies = data.get('num_copies').val()
        } else {
            num_copies = data.get('num_copies1').val()
        }
        //This contains all the information we need about our pdf
        file_data = {
            "filename": file_name,
            "filetype": filetype,
            "filesize": file.size,
            "file" : file
        }
        //Make hte Ajax call with all the information we got from earlier
        $.ajax({
            type: "POST",
            url: "/submit_request",
            processData: false,
            contentType: false,
            dataType: "json",
            data: { 
                    "firstName" : firstName,
                    "lastName" : lastName,
                    "email" : email,
                    "club" : club,
                    "color" : color,
                    "num_copies": num_copies,
                    "file_data": file
                  },
            success: function(data) {
                console.log("Successfully parsed data")
            },
            
        })
    }),

    $('#file_upload').on("change", function(data) {
        var i = $('#file_label').clone();
        file = $('#file_upload')[0].files[0];
        file_name = file.name
        console.log(file.name)
        $("#file_label").text(file.name);
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