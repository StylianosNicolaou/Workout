document.addEventListener("DOMContentLoaded", function () {
  // ✅ Initialize Firebase
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

  // ✅ Update Firebase when a checkbox is clicked
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

  // ✅ Attach event listeners to checkboxes
  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      updateWorkoutProgress(this);
    });

    // Apply strike-through effect on page load for checked checkboxes
    if (checkbox.checked) {
      const label = checkbox.nextElementSibling;
      label.classList.add("strike-through");
    }

    // Check if the exercise should be struck through on page load
    const exerciseItem = checkbox.closest(".exercise-item");
    updateExerciseStrikeThrough(exerciseItem);
  });

  // ✅ Listen for real-time updates from Firebase
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

  window.resetWorkout = function () {
    const confirmReset = confirm("Are you sure you want to reset all workouts?");
    
    if (!confirmReset) {
      return; // If user cancels, do nothing
    }
  
    console.log("🧹 Resetting Workout...");
  
    // Set all checkboxes to unchecked
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      checkbox.checked = false;
  
      // Remove strike-through from text
      const label = checkbox.nextElementSibling;
      if (label) {
        label.classList.remove("strike-through");
      }
  
      // Update Firebase (Set all values to false)
      workoutProgressRef.child(checkbox.id).set(false);
    });
  
    // Remove strike-through from exercise titles
    document.querySelectorAll(".exercise-item h2").forEach((title) => {
      title.classList.remove("strike-through");
    });
  
    console.log("✅ Workout Reset Successful");
  };
});