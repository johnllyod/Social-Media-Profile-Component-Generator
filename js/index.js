const pageRoot = document.querySelector(":root");
var inputIds = ["name", "facebook", "twitter", "instagram", "youtube"];
var currentView = "preview";

// Change the color of the form
function updateRootValue(elementVal, cssVar) {
  if (elementVal.type == "number") {
    pageRoot.style.setProperty(cssVar, elementVal.value + "px");
    if (currentView == "css") {
      encodeScript("css");
    }
  } else {
    pageRoot.style.setProperty(cssVar, elementVal.value);
    if (currentView == "css") {
      encodeScript("css");
    }
  }
}

// Assign css values at start
function initialValues() {
  //Color settings
  const pageColorPicker = document.getElementById("bg-color");
  const containerColorPicker = document.getElementById("container-color");
  const containerShadowColorPicker = document.getElementById(
    "container-shadow-color"
  );
  const inputColorPicker = document.getElementById("input-color");
  const inputBorderColorPicker = document.getElementById("input-border-color");

  //Content settings
  const containerShadowSize = document.getElementById("container-shadow-size");
  const containerPaddingSize = document.getElementById(
    "container-padding-size"
  );
  const imageSize = document.getElementById("image-size");
  const imageRadius = document.getElementById("image-radius");
  const textInputFontSize = document.getElementById("input-text-font-size");
  const textInputPaddingSize = document.getElementById(
    "input-text-padding-size"
  );

  pageRoot.style.setProperty("--bgColor", pageColorPicker.value);

  pageRoot.style.setProperty("--containerColor", containerColorPicker.value);

  pageRoot.style.setProperty(
    "--containerShadowColor",
    containerShadowColorPicker.value
  );

  pageRoot.style.setProperty("--inputColor", inputColorPicker.value);

  pageRoot.style.setProperty(
    "--inputBorderColor",
    inputBorderColorPicker.value
  );

  pageRoot.style.setProperty(
    "--containerShadowSize",
    containerShadowSize.value + "px"
  );
  pageRoot.style.setProperty(
    "--containerPadding",
    containerPaddingSize.value + "px"
  );

  pageRoot.style.setProperty("--imageSize", imageSize.value + "px");

  pageRoot.style.setProperty("--imageRadius", imageRadius.value + "px");

  pageRoot.style.setProperty(
    "--textInputFontSize",
    textInputFontSize.value + "px"
  );

  pageRoot.style.setProperty(
    "--textInputPaddingSize",
    textInputPaddingSize.value + "px"
  );
}
initialValues();

// Change view display
function changeView(viewName) {
  const preview = document.getElementById("profile");
  const codeView = document.getElementById("code-view");

  if (viewName == "preview") {
    preview.style.display = "block";
    codeView.style.display = "none";
    currentView = "preview";
  } else if (viewName == "html") {
    preview.style.display = "none";
    codeView.style.display = "block";
    currentView = "html";
    encodeScript("html");
  } else if (viewName == "css") {
    preview.style.display = "none";
    codeView.style.display = "block";
    currentView = "css";
    encodeScript("css");
  } else if (viewName == "javascript") {
    preview.style.display = "none";
    codeView.style.display = "block";
    currentView = "javascript";
    encodeScript("javascript");
  }
}

function changeSettingsView(viewName) {
  const contentSettings = document.getElementById("content-settings");
  const colorSettings = document.getElementById("color-settings");
  const sizeSettings = document.getElementById("size-settings");

  if (viewName == "color") {
    colorSettings.style.display = "flex";
    contentSettings.style.display = "none";
    sizeSettings.style.display = "none";
  } else if (viewName == "content") {
    colorSettings.style.display = "none";
    contentSettings.style.display = "block";
    sizeSettings.style.display = "none";
    populateContent();
  } else if (viewName == "size") {
    colorSettings.style.display = "none";
    contentSettings.style.display = "none";
    sizeSettings.style.display = "flex";
  }
}

// Encode htmp, css, and javascript codes
function encodeScript(viewType) {
  const codeContainer = document.getElementById("codeContainer");

  codeContainer.innerHTML = " ";
  if (viewType == "html") {
    let textCode = document.getElementById("profile-container").outerHTML;
    encodedStr = textCode.replace(/[\u00A0-\u9999<>\&]/g, function (i) {
      return "&#" + i.charCodeAt(0) + ";";
    });
    encodedStr = encodedStr.replace(/(\r\n|\n|\r)/gm, "");
    encodedStr = encodedStr.replace(/\s\s/g, "");
    encodedStr = encodedStr.replaceAll("&#62;&#60;", "&#62;\n&#60;");

    codeContainer.innerHTML = encodedStr;
  } else if (viewType == "css") {
    fetch(
      "https://raw.githubusercontent.com/johnllyod/Social-Media-Profile-Component-Generator/main/css/profile.css"
    )
      .then((response) => response.text())
      .then((data) => {
        codeContainer.innerHTML = replaceRootVarValue(data);
      });
  } else if (viewType == "javascript") {
    fetch(
      "https://raw.githubusercontent.com/johnllyod/Social-Media-Profile-Component-Generator/main/js/profile.js"
    )
      .then((response) => response.text())
      .then((data) => {
        codeContainer.innerHTML = data;
      });
  }
}

function replaceRootVarValue(scriptText) {
  let replaceValue = scriptText;
  const rootVars = [
    ["--bgColor", /--bgColor:.*/],
    ["--containerColor", /--containerColor:.*/],
    ["--containerShadowColor", /--containerShadowColor:.*/],
    ["--inputColor", /--inputColor:.*/],
    ["--inputBorderColor", /--inputBorderColor:.*/],
    ["--containerShadowSize", /--containerShadowSize:.*/],
    ["--containerPadding", /--containerPadding:.*/],
    ["--imageSize", /--imageSize:.*/],
    ["--imageRadius", /--imageRadius:.*/],
    ["--textInputFontSize", /--textInputFontSize:.*/],
    ["--textInputPaddingSize", /--textInputPaddingSize:.*/],
  ];

  for (let i = 0; i < rootVars.length; i++) {
    replaceValue = replaceValue.replace(
      rootVars[i][1],
      rootVars[i][0] +
        ": " +
        pageRoot.style.getPropertyValue(rootVars[i][0]) +
        ";"
    );
  }
  return replaceValue;
}

function copyCode() {
  const htmlCodes = document.getElementById("codeContainer").textContent;
  navigator.clipboard.writeText(htmlCodes);
}

function populateContent() {
  const inputSettings = document.getElementById("input-settings");
  const formInputs = document.getElementById("profile-form");
  inputSettings.innerHTML = "";
  Array.from(formInputs.elements).forEach((input) => {
    if (input.type == "text") {
      inputSettings.innerHTML +=
        `<span id="` +
        input.id +
        `Editor" class='sm-link-input'><input type="text" value="` +
        input.placeholder +
        `" onchange="updatePlaceholder(this)">
      <button class="add-subtract-content" onclick="removeContentInput(this, '` +
        input.id +
        `')">-</button></span>`;
    } else {
      inputSettings.innerHTML +=
        `<span class='sm-link-input'><input id="` +
        input.id +
        `Editor" type="text" value="` +
        input.value +
        `" onchange="updatePlaceholder(this)"></span>`;
    }
  });
}
populateContent();

function addContentInput() {
  const newPlaceholder = document.getElementById("new-placeholder");
  const newId = document.getElementById("new-id").value;
  const formInputs = document.getElementById("profile-form");
  const editProfile = document.getElementById("edit-profile");
  const errorMsg = document.getElementById("error-msg");
  const editbutton = document.getElementById("edit-profile");

  let idExist = false;
  Array.from(inputIds).forEach((item) => {
    if (item == newId) idExist = true;
    else return;
  });

  if (idExist) {
    errorMsg.style.display = "block";
    errorMsg.innerHTML = `Id "` + newId + `" already exist.`;
  } else {
    if (newId == "") {
      errorMsg.style.display = "block";
      errorMsg.innerHTML = `"Id" is blank.`;
    } else if (newId.indexOf(" ") >= 0) {
      errorMsg.style.display = "block";
      errorMsg.innerHTML = `"Id" cannot have white spaces.`;
    } else {
      let newLinkInput = document.createElement("input");
      newLinkInput.setAttribute("id", newId);
      newLinkInput.setAttribute("type", "text");
      newLinkInput.setAttribute("Placeholder", newPlaceholder.value);

      if (editbutton.style.display != "none") {
        newLinkInput.setAttribute("readOnly", true);
      }

      formInputs.insertBefore(newLinkInput, editProfile);
      inputIds.push(newId);
      inputIds[inputIds.length] = errorMsg.innerHTML = "";
      populateContent();
      if (currentView == "html") {
        encodeScript("html");
      }
    }
  }
}

function removeContentInput(thisBtn, idVal) {
  const formInput = document.getElementById(idVal);
  const formInputEditor = document.getElementById(idVal + "Editor");
  formInput.remove();
  formInputEditor.remove();
  thisBtn.remove();
  if (currentView == "html") {
    encodeScript("html");
  }
}

function updatePlaceholder(inputText) {
  let profileInputId = inputText.id.replace("Editor", "");
  const profileInput = document.getElementById(profileInputId);

  if (profileInput.type == "text") {
    profileInput.placeholder = inputText.value;
  } else if (profileInput.type == "button") {
    profileInput.value = inputText.value;
  }
}
