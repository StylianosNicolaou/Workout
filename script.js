// Function to update strike-through
function updateStrikeThrough(exerciseSection) {
  // Get all checkboxes within the given section
  const checkboxes = exerciseSection.querySelectorAll('input[type="checkbox"]');
  const title = exerciseSection.querySelector("h2");

  // Check if all checkboxes are checked
  const allChecked = Array.from(checkboxes).every(
    (checkbox) => checkbox.checked
  );

  // Toggle strike-through class on title
  if (allChecked) {
    title.classList.add("strike-through");
  } else {
    title.classList.remove("strike-through");
  }
}

// Attach event listeners to checkboxes

document.querySelectorAll(".section").forEach((section) => {
  const checkboxes = section.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => updateStrikeThrough(section));
  });
});

// Function to update strike-through
function updateStrikeThrough(exerciseSection) {
  // Get all checkboxes within the given section
  const checkboxes = exerciseSection.querySelectorAll('input[type="checkbox"]');
  const title = exerciseSection.querySelector("h2");

  // Check if all checkboxes are checked
  const allChecked = Array.from(checkboxes).every(
    (checkbox) => checkbox.checked
  );

  // Toggle strike-through class on title
  if (allChecked) {
    title.classList.add("strike-through");
  } else {
    title.classList.remove("strike-through");
  }
}

// Attach event listeners to checkboxes
const sections = document.querySelectorAll(".section");

document.querySelectorAll(".section").forEach((section) => {
  const checkboxes = section.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => updateStrikeThrough(section));
  });
});
