$(document).ready(() => {
  $(".profileLink").click(event => {
    window.location.href = "/profile";
  });
  $("#addEffort").click(event => {
    event.preventDefault();
    let headline = $("#headlineInput").val();
    let description = $("#descriptionInput").val();
    let categories = $("#categoriesInput").val();

    if (
      headline.trim() === "" ||
      description.trim() === "" ||
      categories.length === 0
    ) {
      alert("There is an empty field. Try again");
    } else {
      $("#headlineInput").val("");
      $("#descriptionInput").val("");
      $("#categoriesInput").val([]);
      addEffort(headline, description, categories);
    }
  });

  function addEffort(headline, description, categories) {
    $.post(
      "/efforts/create",
      {
        header: headline,
        description: description,
        category: categories.join(", ")
      },
      response => {
        if (response === "Success") {
          console.log("Effort added!");
          $("#addEffortModal").modal("hide");
        } else {
          alert("Something went wrong: " + response);
        }
      }
    );
  }
});
