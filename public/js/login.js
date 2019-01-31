let docReadyPromise = new Promise((resolve, reject)=>{
    $(document).ready(()=>{
    resolve((token)=>{
        $.post("/auth/google", { token: token }, response => {
          console.log("Here");

        if(response === "OK"){
            window.location.href = "/";
        }
        });
    })
    })
});

function onSignIn(googleUser) {

    let token = googleUser.getAuthResponse().id_token;

    // signIn(token);
    docReadyPromise.then(signIn=>{
    signIn(token);
    })
}
