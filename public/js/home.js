$(document).ready(()=>{
    $(".profileLink").click((event)=>{
        window.location.href = "/profile";
    })
    $("#signoutButt").click(event=>{
        event.preventDefault();
        $.post("/signout", {},response=>{
          if(response==="Success"){
            window.location.href = "/login";
          }
        })
      })
})