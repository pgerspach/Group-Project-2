let docReadyPromise = new Promise((resolve, reject) => {
  $(document).ready(() => {
    resolve(token => {
      $.post("/auth/google", { token: token }, response => {
        console.log("Response from google sign in");

        if (response === "OK") {
          window.location.href = "/";
        }
      });
      $("#logButt").click(event => {
          
        event.preventDefault();
        $.post("/auth/email", {
          email: $("#login-email").val(),
          password: $("#login-password").val()
        }, response=>{
            console.log("Response from email sign in: "+response);
        });

        $("#login-email").val("");
        $("#login-password").val("");
      });
    });
  });
});

function onSignIn(googleUser) {
  let token = googleUser.getAuthResponse().id_token;

  // signIn(token);
  docReadyPromise.then(signIn => {
    signIn(token);
  });
}
