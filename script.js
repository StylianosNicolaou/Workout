// document.addEventListener("DOMContentLoaded", function () {
//   const dayButtons = document.querySelectorAll(".day-title");

//   dayButtons.forEach((button) => {
//     button.addEventListener("click", function () {
//       console.log("Toggling:", this.textContent);

//       const parent = this.parentElement;
//       const content = this.nextElementSibling;

//       if (!content || !content.classList.contains("day-content")) {
//         console.error("No .day-content element found!");
//         return;
//       }

//       const isExpanded = getComputedStyle(content).maxHeight !== "0px";

//       if (isExpanded) {
//         console.log(this.textContent, "is now collapsed");
//         content.style.maxHeight = "0px"; // Collapse
//         content.style.opacity = "0"; // Fade out
//         this.setAttribute("aria-expanded", "false");
//       } else {
//         console.log(this.textContent, "is now expanded");
//         content.style.maxHeight = content.scrollHeight + "px"; // Expand
//         content.style.opacity = "1"; // Fade in
//         this.setAttribute("aria-expanded", "true");
//       }
//     });
//   });

//   // ✅ Initialize Firebase (if needed)
//   const firebaseConfig = {
//     apiKey: "AIzaSyCyZRt0Q3bkg-tno6GNUabRnsieMYPecmM",
//     authDomain: "liveworkouttracker.firebaseapp.com",
//     databaseURL:
//       "https://liveworkouttracker-default-rtdb.europe-west1.firebasedatabase.app",
//     projectId: "liveworkouttracker",
//     storageBucket: "liveworkouttracker.appspot.com",
//     messagingSenderId: "608217186734",
//     appId: "1:608217186734:web:c1eb261b47b0a9a163483f",
//   };

//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   const db = firebase.database();
//   const workoutProgressRef = db.ref("workoutProgress");

//   // Function to create workouts dynamically
//   function generateWorkoutSections() {
//     Object.keys(workouts).forEach((day) => {
//       // Create button for workout day
//       const dayButton = document.createElement("button");
//       dayButton.className = "day-title";
//       dayButton.textContent = day;

//       // Create content section
//       const dayContent = document.createElement("div");
//       dayContent.className = "day-content";

//       // Create VV and KK sections
//       Object.keys(workouts[day]).forEach((section) => {
//         const sectionDiv = document.createElement("div");
//         sectionDiv.className = "section";
//         sectionDiv.id = section;

//         const sectionTitle = document.createElement("h2");
//         sectionTitle.textContent = section;
//         sectionDiv.appendChild(sectionTitle);

//         const exerciseList = document.createElement("ul");
//         exerciseList.className = "exercise-list";

//         workouts[day][section].forEach((exercise) => {
//           const exerciseItem = document.createElement("li");
//           exerciseItem.className = "exercise-item";

//           const exerciseTitle = document.createElement("h2");
//           exerciseTitle.textContent = exercise.name;
//           exerciseItem.appendChild(exerciseTitle);

//           const subList = document.createElement("ul");
//           subList.className = "sub-exercise-list";

//           exercise.sets.forEach((set, index) => {
//             const listItem = document.createElement("li");
//             listItem.className = "sub-exercise-item";

//             const checkbox = document.createElement("input");
//             checkbox.type = "checkbox";
//             checkbox.id = `${day}-${section}-${exercise.name
//               .replace(/\s+/g, "-")
//               .toLowerCase()}-set-${index}`;
//             checkbox.addEventListener("change", () =>
//               updateWorkoutProgress(checkbox)
//             );

//             const label = document.createElement("span");
//             label.textContent = set.reps;

//             listItem.appendChild(checkbox);
//             listItem.appendChild(label);
//             subList.appendChild(listItem);
//           });

//           exerciseItem.appendChild(subList);
//           exerciseList.appendChild(exerciseItem);
//         });

//         sectionDiv.appendChild(exerciseList);
//         dayContent.appendChild(sectionDiv);
//       });

//       // Append to container
//       container.appendChild(dayButton);
//       container.appendChild(dayContent);

//       // Toggle functionality
//       dayButton.addEventListener("click", () => {
//         const isExpanded = dayContent.style.maxHeight !== "0px";
//         dayContent.style.maxHeight = isExpanded
//           ? "0px"
//           : dayContent.scrollHeight + "px";
//         dayContent.style.opacity = isExpanded ? "0" : "1";
//       });
//     });
//   }

//   // ✅ Update Firebase when a checkbox is clicked
//   function updateWorkoutProgress(checkbox) {
//     const checkboxId = checkbox.id;
//     const isChecked = checkbox.checked;

//     console.log(`🔥 Updating Firebase: ${checkboxId} -> ${isChecked}`);

//     // Update Firebase in real time
//     workoutProgressRef.child(checkboxId).set(isChecked);

//     // Apply strike-through effect to the individual set
//     const label = checkbox.nextElementSibling;
//     if (isChecked) {
//       label.classList.add("strike-through");
//     } else {
//       label.classList.remove("strike-through");
//     }

//     // Check if all checkboxes for the exercise are checked
//     const exerciseItem = checkbox.closest(".exercise-item");
//     updateExerciseStrikeThrough(exerciseItem);
//   }

//   // ✅ Check if all checkboxes of an exercise are checked and apply strike-through to exercise
//   function updateExerciseStrikeThrough(exerciseItem) {
//     const checkboxes = exerciseItem.querySelectorAll('input[type="checkbox"]');
//     const title = exerciseItem.querySelector("h2");

//     // Check if all checkboxes are checked
//     const allChecked = Array.from(checkboxes).every(
//       (checkbox) => checkbox.checked
//     );

//     // Toggle strike-through class on exercise title
//     if (allChecked) {
//       title.classList.add("strike-through");
//     } else {
//       title.classList.remove("strike-through");
//     }
//   }

//   // ✅ Attach event listeners to checkboxes
//   document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
//     checkbox.addEventListener("change", function () {
//       updateWorkoutProgress(this);
//     });

//     // Apply strike-through effect on page load for checked checkboxes
//     if (checkbox.checked) {
//       const label = checkbox.nextElementSibling;
//       label.classList.add("strike-through");
//     }

//     // Check if the exercise should be struck through on page load
//     const exerciseItem = checkbox.closest(".exercise-item");
//     updateExerciseStrikeThrough(exerciseItem);
//   });

//   // ✅ Listen for real-time updates from Firebase
//   workoutProgressRef.on("value", (snapshot) => {
//     const data = snapshot.val();
//     console.log("🔥 Firebase Data Updated:", data);

//     if (data) {
//       Object.keys(data).forEach((checkboxId) => {
//         const checkbox = document.getElementById(checkboxId);
//         if (checkbox) {
//           checkbox.checked = data[checkboxId];

//           // Apply or remove strike-through on individual set
//           const label = checkbox.nextElementSibling;
//           if (checkbox.checked) {
//             label.classList.add("strike-through");
//           } else {
//             label.classList.remove("strike-through");
//           }

//           // Check if exercise should be struck through
//           const exerciseItem = checkbox.closest(".exercise-item");
//           updateExerciseStrikeThrough(exerciseItem);
//         }
//       });
//     }
//   });

//   // ✅ Reset Workout Functionality (Including Modal HTML & Styling)
//   window.resetWorkout = function () {
//     // Check if modal already exists to prevent duplicates
//     if (!document.getElementById("resetModal")) {
//       // Create modal container
//       const modal = document.createElement("div");
//       modal.id = "resetModal";
//       modal.style.position = "fixed";
//       modal.style.top = "0";
//       modal.style.left = "0";
//       modal.style.width = "100%";
//       modal.style.height = "100%";
//       modal.style.background = "rgba(0, 0, 0, 0.6)";
//       modal.style.display = "flex";
//       modal.style.justifyContent = "center";
//       modal.style.alignItems = "center";
//       modal.style.zIndex = "1000";
//       modal.style.transition = "opacity 0.3s ease";

//       // Create modal content
//       modal.innerHTML = `
//       <div id="resetModalContent" style="
//         background: white;
//         padding: 20px;
//         border-radius: 10px;
//         text-align: center;
//         box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
//         width: 300px;
//         max-width: 90%;
//       ">
//         <h2 style="margin-bottom: 15px; font-size: 1.5rem; color: #333;">Reset Workouts?</h2>
//         <p style="margin-bottom: 20px; color: #666;">Are you sure you want to reset all workouts?</p>
//         <button id="confirmResetBtn" style="
//           background-color: #ff4d4d;
//           color: white;
//           padding: 10px 30px;
//           border: none;
//           border-radius: 5px;
//           font-size: 1rem;
//           cursor: pointer;
//           margin-right: 10px;
//           transition: background 0.3s;
//         ">Yes</button>
//         <button id="cancelResetBtn" style="
//           background-color: #ccc;
//           color: black;
//           padding: 10px 15px;
//           border: none;
//           border-radius: 5px;
//           font-size: 1rem;
//           cursor: pointer;
//           transition: background 0.3s;
//         ">Cancel</button>
//       </div>
//     `;

//       // Append modal to body
//       document.body.appendChild(modal);
//     }

//     // Get modal elements
//     const resetModal = document.getElementById("resetModal");
//     const confirmResetBtn = document.getElementById("confirmResetBtn");
//     const cancelResetBtn = document.getElementById("cancelResetBtn");

//     // Show the modal
//     resetModal.style.display = "flex";

//     // Remove existing event listeners before adding new ones
//     confirmResetBtn.replaceWith(confirmResetBtn.cloneNode(true));
//     cancelResetBtn.replaceWith(cancelResetBtn.cloneNode(true));

//     // Get new button references after cloning
//     const newConfirmResetBtn = document.getElementById("confirmResetBtn");
//     const newCancelResetBtn = document.getElementById("cancelResetBtn");

//     // Confirm reset action
//     newConfirmResetBtn.addEventListener("click", function () {
//       resetModal.style.display = "none"; // Hide modal

//       console.log("🧹 Resetting Workout...");

//       // Set all checkboxes to unchecked
//       document
//         .querySelectorAll('input[type="checkbox"]')
//         .forEach((checkbox) => {
//           checkbox.checked = false;

//           // Remove strike-through from text
//           const label = checkbox.nextElementSibling;
//           if (label) {
//             label.classList.remove("strike-through");
//           }

//           // Update Firebase (Set all values to false)
//           if (typeof workoutProgressRef !== "undefined") {
//             workoutProgressRef.child(checkbox.id).set(false);
//           }
//         });

//       // Remove strike-through from exercise titles
//       document.querySelectorAll(".exercise-item h2").forEach((title) => {
//         title.classList.remove("strike-through");
//       });

//       console.log("✅ Workout Reset Successful");
//     });

//     // Cancel reset action
//     newCancelResetBtn.addEventListener("click", function () {
//       resetModal.style.display = "none"; // Hide modal
//     });
//   };
//   generateWorkoutSections();
// });

document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("workout-container");

  // ✅ Initialize Firebase (if needed)
  const firebaseConfig = {
    apiKey: "AIzaSyCyZRt0Q3bkg-tno6GNUabRnsieMYPecmM",
    authDomain: "liveworkouttracker.firebaseapp.com",
    databaseURL:
      "https://liveworkouttracker-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "liveworkouttracker",
    storageBucket: "liveworkouttracker.appspot.com",
    messagingSenderId: "608217186734",
    appId: "1:608217186734:web:c1eb261b47b0a9a163483f",
  };

  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();
  const workoutProgressRef = db.ref("workoutProgress");

  // ✅ Generate workouts dynamically from workouts.js
  function generateWorkoutSections() {
    if (typeof workouts === "undefined") {
      console.error(
        "❌ Workouts data not found! Make sure workouts.js is loaded."
      );
      return;
    }

    const container = document.getElementById("workout-container");
    container.innerHTML = ""; // Clear previous content (if any)

    Object.keys(workouts).forEach((day) => {
      console.log(`📅 Processing Workout Day: ${day}`, workouts[day]); // Debugging log

      // ✅ Create button for each workout day
      const dayButton = document.createElement("button");
      dayButton.className = "day-title";
      dayButton.textContent = day;

      // ✅ Create workout day content
      const dayContent = document.createElement("div");
      dayContent.className = "day-content";

      // ✅ Ensure day contains VV/KK sections
      if (!workouts[day] || typeof workouts[day] !== "object") {
        console.warn(`⚠️ No valid sections found for workout day: ${day}`);
        return;
      }

      Object.keys(workouts[day]).forEach((section) => {
        if (!workouts[day][section] || !Array.isArray(workouts[day][section])) {
          console.warn(
            `⚠️ No exercises found for section: ${section} in ${day}`
          );
          return; // Skip empty or invalid sections
        }

        // ✅ Create section div
        const sectionDiv = document.createElement("div");
        sectionDiv.className = "section";
        sectionDiv.id = section;

        // ✅ Section Title (VV/KK)
        const sectionTitle = document.createElement("h2");
        sectionTitle.textContent = section;
        sectionDiv.appendChild(sectionTitle);

        // ✅ Exercise List
        const exerciseList = document.createElement("ul");
        exerciseList.className = "exercise-list";

        workouts[day][section].forEach((exercise) => {
          if (!exercise.sets || !Array.isArray(exercise.sets)) {
            console.warn(
              `⚠️ No sets found for exercise: ${exercise.name} in ${section} (${day})`
            );
            return; // Skip invalid exercises
          }

          // ✅ Create Exercise Item
          const exerciseItem = document.createElement("li");
          exerciseItem.className = "exercise-item";

          // ✅ Exercise Title
          const exerciseTitle = document.createElement("h2");
          exerciseTitle.textContent = exercise.name;
          exerciseItem.appendChild(exerciseTitle);

          // ✅ Sub Exercise List (Checkboxes)
          const subList = document.createElement("ul");
          subList.className = "sub-exercise-list";

          exercise.sets.forEach((set, index) => {
            // ✅ Create Set Item
            const listItem = document.createElement("li");
            listItem.className = "sub-exercise-item";

            // ✅ Create Checkbox
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = `${day}-${section}-${exercise.name
              .replace(/\s+/g, "-")
              .toLowerCase()}-set-${index}`;
            checkbox.addEventListener("change", function () {
              updateWorkoutProgress(this);
            });

            // ✅ Set Label
            const label = document.createElement("span");
            label.textContent = set.reps;

            listItem.appendChild(checkbox);
            listItem.appendChild(label);
            subList.appendChild(listItem);
          });

          exerciseItem.appendChild(subList);
          exerciseList.appendChild(exerciseItem);
        });

        sectionDiv.appendChild(exerciseList);
        dayContent.appendChild(sectionDiv);
      });

      // ✅ Append elements to container
      container.appendChild(dayButton);
      container.appendChild(dayContent);

      // ✅ Expand/Collapse Functionality
      dayButton.addEventListener("click", function () {
        console.log("Toggling:", this.textContent);

        const isExpanded = getComputedStyle(dayContent).maxHeight !== "0px";

        if (isExpanded) {
          console.log(this.textContent, "is now collapsed");
          dayContent.style.maxHeight = "0px";
          dayContent.style.opacity = "0";
          this.setAttribute("aria-expanded", "false");
        } else {
          console.log(this.textContent, "is now expanded");
          dayContent.style.maxHeight = dayContent.scrollHeight + "px";
          dayContent.style.opacity = "1";
          this.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  // ✅ Function to update Firebase when a checkbox is clicked
  function updateWorkoutProgress(checkbox) {
    const checkboxId = checkbox.id;
    const isChecked = checkbox.checked;

    console.log(`🔥 Updating Firebase: ${checkboxId} -> ${isChecked}`);

    // Update Firebase in real time
    workoutProgressRef.child(checkboxId).set(isChecked);

    // Apply strike-through effect to the individual set
    const label = checkbox.nextElementSibling;
    if (isChecked) {
      label.classList.add("strike-through");
    } else {
      label.classList.remove("strike-through");
    }

    // Check if all checkboxes for the exercise are checked
    const exerciseItem = checkbox.closest(".exercise-item");
    updateExerciseStrikeThrough(exerciseItem);
  }

  // ✅ Check if all checkboxes of an exercise are checked and apply strike-through to exercise
  function updateExerciseStrikeThrough(exerciseItem) {
    const checkboxes = exerciseItem.querySelectorAll('input[type="checkbox"]');
    const title = exerciseItem.querySelector("h2");

    // Check if all checkboxes are checked
    const allChecked = Array.from(checkboxes).every(
      (checkbox) => checkbox.checked
    );

    // Toggle strike-through class on exercise title
    if (allChecked) {
      title.classList.add("strike-through");
    } else {
      title.classList.remove("strike-through");
    }
  }

  // ✅ Attach event listeners to checkboxes and restore state from Firebase
  workoutProgressRef.on("value", (snapshot) => {
    const data = snapshot.val();
    console.log("🔥 Firebase Data Updated:", data);

    if (data) {
      Object.keys(data).forEach((checkboxId) => {
        const checkbox = document.getElementById(checkboxId);
        if (checkbox) {
          checkbox.checked = data[checkboxId];

          // Apply or remove strike-through on individual set
          const label = checkbox.nextElementSibling;
          if (checkbox.checked) {
            label.classList.add("strike-through");
          } else {
            label.classList.remove("strike-through");
          }

          // Check if exercise should be struck through
          const exerciseItem = checkbox.closest(".exercise-item");
          updateExerciseStrikeThrough(exerciseItem);
        }
      });
    }
  });

  // ✅ Reset Workout Functionality with Confirmation Modal
  window.resetWorkout = function () {
    // Check if modal already exists to prevent duplicates
    if (!document.getElementById("resetModal")) {
      // Create modal container
      const modal = document.createElement("div");
      modal.id = "resetModal";
      modal.style.position = "fixed";
      modal.style.top = "0";
      modal.style.left = "0";
      modal.style.width = "100%";
      modal.style.height = "100%";
      modal.style.background = "rgba(0, 0, 0, 0.6)";
      modal.style.display = "flex";
      modal.style.justifyContent = "center";
      modal.style.alignItems = "center";
      modal.style.zIndex = "1000";
      modal.style.transition = "opacity 0.3s ease";

      // Create modal content
      modal.innerHTML = `
        <div id="resetModalContent" style="
          background: white;
          padding: 20px;
          border-radius: 10px;
          text-align: center;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          width: 300px;
          max-width: 90%;
        ">
          <h2 style="margin-bottom: 15px; font-size: 1.5rem; color: #333;">Reset Workouts?</h2>
          <p style="margin-bottom: 20px; color: #666;">Are you sure you want to reset all workouts?</p>
          <button id="confirmResetBtn" style="
            background-color: #ff4d4d;
            color: white;
            padding: 10px 30px;
            border: none;
            border-radius: 5px;
            font-size: 1rem;
            cursor: pointer;
            margin-right: 10px;
            transition: background 0.3s;
          ">Yes</button>
          <button id="cancelResetBtn" style="
            background-color: #ccc;
            color: black;
            padding: 10px 15px;
            border: none;
            border-radius: 5px;
            font-size: 1rem;
            cursor: pointer;
            transition: background 0.3s;
          ">Cancel</button>
        </div>
      `;

      // Append modal to body
      document.body.appendChild(modal);
    }

    // Get modal elements
    const resetModal = document.getElementById("resetModal");
    const confirmResetBtn = document.getElementById("confirmResetBtn");
    const cancelResetBtn = document.getElementById("cancelResetBtn");

    // Show the modal
    resetModal.style.display = "flex";

    // Remove existing event listeners before adding new ones
    confirmResetBtn.replaceWith(confirmResetBtn.cloneNode(true));
    cancelResetBtn.replaceWith(cancelResetBtn.cloneNode(true));

    // Get new button references after cloning
    const newConfirmResetBtn = document.getElementById("confirmResetBtn");
    const newCancelResetBtn = document.getElementById("cancelResetBtn");

    // Confirm reset action
    newConfirmResetBtn.addEventListener("click", function () {
      resetModal.style.display = "none"; // Hide modal

      console.log("🧹 Resetting Workout...");

      // Set all checkboxes to unchecked
      document
        .querySelectorAll('input[type="checkbox"]')
        .forEach((checkbox) => {
          checkbox.checked = false;

          // Remove strike-through from text
          const label = checkbox.nextElementSibling;
          if (label) {
            label.classList.remove("strike-through");
          }

          // Update Firebase (Set all values to false)
          if (typeof workoutProgressRef !== "undefined") {
            workoutProgressRef.child(checkbox.id).set(false);
          }
        });

      // Remove strike-through from exercise titles
      document.querySelectorAll(".exercise-item h2").forEach((title) => {
        title.classList.remove("strike-through");
      });

      console.log("✅ Workout Reset Successful");
    });

    // Cancel reset action
    newCancelResetBtn.addEventListener("click", function () {
      resetModal.style.display = "none"; // Hide modal
    });
  };

  // ✅ Generate workouts dynamically
  generateWorkoutSections();
});
