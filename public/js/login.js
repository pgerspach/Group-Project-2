let initSignOut = false;

let docReadyPromise = new Promise((resolve, reject) => {
  $(document).ready(() => {
    $("#signInIfData").click(event => {
      event.preventDefault();
      console.log("Hello!");
      if ($("#login-email").val() !== "" && $("#login-password").val() !== "") {
        signInEmail();
      }
    });
    $("#signUpButt").click(event => {
      event.preventDefault();
      signUpEmail();
    });
    resolve(token => {
      $.post("/auth/google", { token: token }, response => {
        console.log("Response from google sign in" + response);

        if (response === "Success") {
          sendHome();
        } else {
          alert(response + " Something went wrong. Try again");
        }
      });
    });
  });
});

function onSignIn(googleUser) {
  let token = googleUser.getAuthResponse().id_token;
  if (!initSignOut) {
    gapi.auth2.getAuthInstance().disconnect();
    initSignOut = true;
  }
  $("#google_token").val(token); //hidden form value
  $("#google-oauth").submit(); //hidden form
  docReadyPromise.then(signIn => {
    signIn(token);
  });
}

function sendHome() {
  window.location.href = "/home";
}

function signInEmail() {
  $.post(
    "/auth/email",
    {
      email: $("#login-email").val(),
      password: $("#login-password").val()
    },
    response => {
      console.log("Response from email sign in: " + response);
      if (response === "Success") {
        sendHome();
        $("#login-email").val("");
        $("#login-password").val("");
      } else {
        alert(response + " Something went wrong. Try again");
      }
    }
  );
}

function signUpEmail() {
  $.post(
    "/auth/email/create",
    {
      first_name: $("#signupFname").val(),
      last_name: $("#signupLname").val(),
      email: $("#signup-email").val(),
      password: $("#signup-password").val()
    },
    response => {
      console.log("Response from email sign up: " + response);
      if (response === "Success") {
        sendHome();
        $("#signupFname").val("");
        $("#signupLname").val("");
        $("#signup-email").val("");
        $("#signup-password").val("");
      } else {
        alert(response + " Something went wrong. Try again");
      }
    }
  );
}
