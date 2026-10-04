const calculateAge = (day, month, year) => {
  const today = new Date();

  const currentDay = today.getDate();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  let days = currentDay - day;
  let months = currentMonth - month;
  let years = currentYear - year;

  // Kung negative ang days, "manghulam" og 1 month
  if (days < 0) {
    months--;
    const prevMonth = new Date(currentYear, currentMonth - 1, 0); // last day sa PREVIOUS month
    days += prevMonth.getDate();
  }

  // Kung negative ang months, "manghulam" og 1 year
  if (months < 0) {
    years--;
    months += 12;
  }

  return { days, months, years };
};

const showError = (inputField, message) => {
  const errorMsg = document.createElement("p");
  errorMsg.textContent = message;
  errorMsg.className = "error-message poppins-light-italic";
  inputField.className = "invalid-input";
  inputField.after(errorMsg);
};

const clearErrors = () => {
  document.querySelectorAll(".error-message").forEach((el) => el.remove());
};

const validateField = (day, month, year) => {
  clearErrors();

  const input = {
    day: document.getElementById("day"),
    month: document.getElementById("month"),
    year: document.getElementById("year"),
  };

  let hasError = false;

  if (!day) {
    showError(input.day, "This field is required");
    hasError = true;
  }

  if (!month) {
    showError(input.month, "This field is required");
    hasError = true;
  }

  if (!year) {
    showError(input.year, "This field is required");
    hasError = true;
  }

  if (hasError) {
    return "Please fill in all fields";
  }

  // Human ma-check nga TANAN naay value, i-validate pa ang format
  const today = new Date();
  const inputDate = new Date(year, month - 1, day);

  if (day < 1 || day > 31) {
    showError(input.day, "Must be a valid day");
    return "Invalid day";
  }

  if (month < 1 || month > 12) {
    showError(input.month, "Must be a valid month");
    return "Invalid month";
  }

  if (inputDate > today) {
    showError(input.year, "Must be in the past");
    return "Date must be in the past";
  }

  return null;
};

const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const day = Number(document.getElementById("day").value);
  const month = Number(document.getElementById("month").value);
  const year = Number(document.getElementById("year").value);

  const error = validateField(day, month, year);

  if (error) {
    return; // dili na padayon
  }

  const result = calculateAge(day, month, year);

  const { years, months, days } = result;
  document.getElementById("year-result").textContent = years;
  document.getElementById("month-result").textContent = months;
  document.getElementById("days-result").textContent = days;
});
