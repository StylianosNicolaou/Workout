// Function to update strike-through
function updateStrikeThrough(exerciseSection) {
  const checkboxes = exerciseSection.querySelectorAll('input[type="checkbox"]');
  const title = exerciseSection.querySelector("h2");

  // Check if all checkboxes are checked
  const allChecked = Array.from(checkboxes).every(
    (checkbox) => checkbox.checked
  );

  // Toggle strike-through class on title
  title.classList.toggle("strike-through", allChecked);
}

// Attach event listeners to checkboxes
document.querySelectorAll(".exercise-item").forEach((section) => {
  section.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener("change", () => updateStrikeThrough(section));
  });
});
