$(document).ready(() => {
  $("#saveProfile").click((event)=>{
      let userName = $("#userNameInput").val();
      let proPic = $("#profilePhotoInput").val();
      let bio = $("#bioInput").val();
    $.post("profile/edit", {
        userName:userName,
        proPic:proPic,
        bio:bio
    }, response=>{
        console.log(response);
        if(response === "Success"){
            $("#editProfileModal").modal("hide");
            $("#bioInput").val("");
            $("#profilePhotoInput").val("");
            $("#userNameInput").val("");
        }else{
            alert("Something went wrong");
        }
    })
  })
});
