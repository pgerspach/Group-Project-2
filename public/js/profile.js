$(document).ready(() => {
  $("#saveProfile").click(event => {
    let userName = $("#userNameInput").val();
    let proPic = $("#profilePhotoInput").val();
    let bio = $("#bioInput").val();
    $.post(
      "profile/edit",
      {
        userName: userName,
        proPic: proPic,
        bio: bio
      },
      response => {
        console.log(response);
        if (response === "Success") {
          $("#editProfileModal").modal("hide");
          $("#bioInput").val("");
          $("#profilePhotoInput").val("");
          $("#userNameInput").val("");
        } else {
          alert("Something went wrong");
        }
      }
    );
  });
  $("#addFriendButton").click(event => {
    $.post(
      "/profile/addfriend",
      {
        user: $("#userNameDisplay")
          .text()
          .trim()
      },
      response => {
        if (response === "Success") {
          console.log("Success");
        } else if (response === "Friends already") {
          alert("Friends already");
        } else {
          alert("Something went wrong");
        }
      }
    );
  });
});
