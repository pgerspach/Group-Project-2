let docReadyPromise = new Promise((resolve, reject)=>{
    $(document).ready(()=>{
    resolve((token)=>{
        $.post("/auth/google", { token: token }, response => {
        if(response === "OK"){
            window.location.href = "/home";
        }
        });
    })
    })
});

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    // console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log("Name: " + profile.getName());
    // console.log("Image URL: " + profile.getImageUrl());
    // console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
    // var id_token = googleUser.getAuthResponse().id_token
    let token = googleUser.getAuthResponse().id_token;

    // signIn(token);
    docReadyPromise.then(signIn=>{
    signIn(token);
    })
}