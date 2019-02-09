$(document).ready(() => {
  $("#signoutButt").click(event => {
    event.preventDefault();
    $.post("/signout", {}, response => {
      if (response === "Success") {
        window.location.href = "/login";
      }
    });
  });
});
