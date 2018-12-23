$(document).ready(function() {
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
//Takes car of the google sign in
function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://source-web.herokuapp.com/oauth/callback');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('idtoken=' + id_token);
    window.sessionStorage.setItem("idtoken", id_token);
    window.sessionStorage.setItem("user", JSON.stringify(googleUser));
    xhr.onload = function () {
        console.log('Signed in as: ' + xhr.responseText);
        $(location).attr('href', './employee.html');
    };
}