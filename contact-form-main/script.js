const form = document.querySelector("form");
const modalContainer = document.querySelector(".modal-container");

function validateField(field) {
  const errorSpan =
    field.type === "radio"
      ? field.closest("fieldset").querySelector(".error-message")
      : field.parentElement.querySelector(".error-message");
  if (!field.validity.valid) {
    errorSpan.textContent = field.dataset.error || "This field is required";
    return false;
  }
  errorSpan.textContent = "";
  return true;
}

form.querySelectorAll("input, textarea").forEach((input) => {
  input.addEventListener("blur", () => {
    validateField(input);
  });
  input.addEventListener("input", () => {
    validateField(input);
  });
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isValid = true;

  const fields = form.querySelectorAll("input, textarea");

  fields.forEach((field) => {
    console.log(`Checking ${field.name}`);
    const fieldValid = validateField(field);

    if (!fieldValid) {
      isValid = false;
    }
  });

  if (isValid) {
    form.reset();
    modalContainer.classList.add("show");

    setTimeout(() => {
      modalContainer.classList.remove("show");
    }, 3000);
  } else {
    form.querySelector(":invalid").focus();
  }
});
