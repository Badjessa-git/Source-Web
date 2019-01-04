$(document).ready(function() {
    $(".loader").hide();
    $('#file_upload').on("change", function(data) {
        var i = $('#file_label').clone();
        var file = $('#file_upload')[0].files[0];
        console.log(file.name)
        $("#file_label").text(file.name);
    }),

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


});

//Takes care of the google sign in
function onSignIn(googleUser) {
    $(".loader").hide();
    console.log(googleUser)
    var res= googleUser.getAuthResponse();
    var id_token =res.id_token;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://source-web.herokuapp.com/oauth/callback');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.responseType = "json"
    xhr.send('idtoken=' + id_token);

    xhr.onload = function () {
        $(".modal").dismiss
        if (xhr.response.mStatus === "not allowed") {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                console.log('User signed out.');
            });   
            window.alert("There was an error with the Login, please try again");
        } else {
            window.localStorage.setItem("id", xhr.response.mData);
            $(location).attr('href', './print.html');
        }
        $(".loader").hide();
    };
}
