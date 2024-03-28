function enableEdit() {
  const editbutton = document.getElementById("edit-profile");
  const savebutton = document.getElementById("save-profile");
  const profileForm = document.getElementById("profile-form");

  Array.from(profileForm.elements).forEach((input) => {
    if (input.type == "text") {
      input.removeAttribute("readOnly");
    }
  });

  editbutton.style.display = "none";
  savebutton.style.display = "block";
}

function saveAndDisableEdit() {
  const editbutton = document.getElementById("edit-profile");
  const savebutton = document.getElementById("save-profile");
  const profileForm = document.getElementById("profile-form");

  Array.from(profileForm.elements).forEach((input) => {
    if (input.type == "text") {
      input.setAttribute("readOnly", true);
    }
  });

  editbutton.style.display = "block";
  savebutton.style.display = "none";
}
