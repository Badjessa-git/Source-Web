//Takes care of the google sign in
function onSignIn(googleUser) {
    $(".loader").hide();
    var res= googleUser.getAuthResponse();
    var posName = googleUser.getBasicProfile().getName()
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
            window.localStorage.setItem("userName", posName)
            $(location).attr('href', './print.html');
        }
        $(".loader").hide();
    };
}