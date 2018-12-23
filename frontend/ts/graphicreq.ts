const backendUrl = "https://source-web.herokuapp.com";
var $ : any;
var graphicReqFrom : GraphicReqForm;

class GraphicReqForm {

    constructor() {
        $('#submit').click(this.submitForm);
    }

    submitForm() {
        let firstName = $('#firstname').val()
        let lastName = $('#lastname').val()
        let email = $('#email').val()
        let club = $('#club_orgs').val()
        let event_name = $('#event_name').val()
        let event_date = $('#event_date').val()
        let poster_date = $('#poster_date').val()
        let notes = $('#notes').val()
        //This contains all the information we need about our pdf
        let file_data = {}
        let file = $('#file_upload')[0].files;
        //Make hte Ajax call with all the information we got from earlier
        $.ajax({
            type: 'POST',
            url: backendUrl + "/submit/g_req",
            processData: false,
            contentType: false,
            dataType: "json",
            data: JSON.stringify({ 
                    "firstName" : firstName,
                    "lastName" : lastName,
                    "email" : email,
                    "club" : club,
                    "event_name" : event_name,
                    "event_date" : event_date,
                    "poster_date" : poster_date,
                    "notes" : notes,
                    "file_data": file
                  }),
            success: function(data: any) {
                if (data.mStatus === "ok") {
                    window.alert("Your submission has been received, you will receive an email confirmation"
                               + "and we will contact you if we need more information\nThank you for using the source");
                    $(location).attr('href', './index.html');
                } else {
                    window.alert("Error with the submisssion, please try again later");
                }
            }
            
        });
    }

}

$(document).ready(function() { 
    graphicReqFrom = new GraphicReqForm();
});