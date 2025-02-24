// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, onValue } from "firebase/database";

// ✅ Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyZRt0Q3bkg-tno6GNUabRnsieMYPecmM",
  authDomain: "liveworkouttracker.firebaseapp.com",
  databaseURL:
    "https://liveworkouttracker-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "liveworkouttracker",
  storageBucket: "liveworkouttracker.firebasestorage.app",
  messagingSenderId: "608217186734",
  appId: "1:608217186734:web:c1eb261b47b0a9a163483f",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const workoutRef = ref(db, "workoutProgress");

// ✅ Function to update Firebase when checkbox is clicked
function saveExerciseState(exerciseId, isChecked) {
  set(ref(db, `workoutProgress/${exerciseId}`), isChecked);
}

// ✅ Function to update strike-through when all checkboxes in a section are checked
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

// ✅ Attach event listeners to checkboxes
document.querySelectorAll(".exercise-item").forEach((section) => {
  section.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    const exerciseId = checkbox.id;

    checkbox.addEventListener("change", () => {
      saveExerciseState(exerciseId, checkbox.checked);
      updateStrikeThrough(section);
    });
  });
});

// ✅ Load saved checkbox states from Firebase
onValue(workoutRef, (snapshot) => {
  const data = snapshot.val();
  if (data) {
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      const exerciseId = checkbox.id;
      if (data[exerciseId] !== undefined) {
        checkbox.checked = data[exerciseId];
      }
    });

    // ✅ Update strike-through after loading Firebase data
    document
      .querySelectorAll(".exercise-item")
      .forEach((section) => updateStrikeThrough(section));
  }
});
