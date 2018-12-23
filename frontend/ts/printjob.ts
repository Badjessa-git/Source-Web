const backendUrl1 = "https://source-web.herokuapp.com";
var $ : any;
var jobRequestForm : JobRequestForm;

/**
 * Encapsulate the job request form
 */
class JobRequestForm {

    constructor() {
        $('#submit').click(this.submitForm);
    }
    
    //Form Submission
    submitForm() {
        let firstName = $('#firstname').val()
        let lastName = $('#lastname').val()
        let email = $('#email').val()
        let club = $('#club_orgs').val()
        let color = $('#options option:selected').val()
        let num_copies = 0
        let col = 0;
        if (color == "Black") {
           num_copies = $('#num_copies option:selected').val()
        } else {
            num_copies = $('#num_copies1 option:selected').val()
            col = 1
        }
        //This contains all the information we need about our pdf
        let file_data = {}
        let files = $('#file_upload')[0].files[0];
        let file = JSON.stringify(files);
        //Make hte Ajax call with all the information we got from earlier
        $.ajax({
            type: 'POST',
            url: backendUrl1 + "/submit/n_req",
            dataType: "json",
            data: JSON.stringify({ 
                    "firstName" : firstName,
                    "lastName" : lastName,
                    "club" : club,
                    "file_data": file,
                    "email" : email,
                    "color" : col,
                    "num_copies": num_copies,
                  }),
            success: function(data: any) {
                if (data.mStatus === "ok") {
                    window.alert("Your submission has been successful, you can pick up your request in the next 10-15 mins");
                    $(location).attr('href', './index.html');
                } else {
                    window.alert("There was an error with the server, please verify your information or try again later")
                }
            },
            
        });
    }
}
$(document).ready(function() { 
    jobRequestForm = new JobRequestForm();
});