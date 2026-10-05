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
  inputField.classList.add("invalid-input");
  inputField.after(errorMsg);
};

const clearErrors = () => {
  document.querySelectorAll(".error-message").forEach((el) => el.remove());
  document
    .querySelectorAll(".invalid-input")
    .forEach((el) => el.classList.remove("invalid-input"));
};

const input = {
  day: document.getElementById("day"),
  month: document.getElementById("month"),
  year: document.getElementById("year"),
};

const validateField = (day, month, year) => {
  clearErrors();

  const currentYear = new Date().getFullYear();

  // Matag field naay kaugalingong rule
  const rules = [
    {
      el: input.day,
      value: day,
      min: 1,
      max: 31,
      message: "Must be a valid day",
    },
    {
      el: input.month,
      value: month,
      min: 1,
      max: 12,
      message: "Must be a valid month",
    },
    {
      el: input.year,
      value: year,
      min: 1000,
      max: currentYear,
      message: "Must be a valid year",
    },
  ];

  let hasError = false;

  // Stage 1: i-check ang matag field usag usa, apan walay return sa tunga
  rules.forEach(({ el, value, min, max, message }) => {
    if (!el.value.trim()) {
      showError(el, "This field is required");
      hasError = true;
    } else if (!Number.isInteger(value) || value < min || value > max) {
      showError(el, message);
      hasError = true;
    }
  });

  if (hasError) return "Please fix the errors";

  // Stage 2: kini nagkinahanglan sa tanan nga tulo, mao nang human ra mo-run
  const date = new Date(year, month - 1, day);

  // Catch sa 31/04, 30/02, ug uban pa
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    showError(input.day, "Must be a valid date");
    return "Invalid date";
  }

  if (date > new Date()) {
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
