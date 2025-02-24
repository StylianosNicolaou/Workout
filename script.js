// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

// ✅ Firebase Configuration
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

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const workoutRef = ref(db, "workoutProgress");

// ✅ Function to update Firebase when a checkbox is clicked
function saveExerciseState(exerciseId, isChecked) {
  set(ref(db, `workoutProgress/${exerciseId}`), isChecked);
}

// ✅ Function to update UI based on checkbox states
function updateUI(snapshot) {
  const data = snapshot.val();
  if (!data) return;

  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    const exerciseId = checkbox.id;
    if (data.hasOwnProperty(exerciseId)) {
      checkbox.checked = data[exerciseId];
    }
  });

  // ✅ Update strike-through for all exercise sections
  document.querySelectorAll(".exercise-item").forEach(updateStrikeThrough);
}

// ✅ Function to update strike-through on section titles
function updateStrikeThrough(section) {
  const checkboxes = section.querySelectorAll('input[type="checkbox"]');
  const title = section.querySelector("h2");

  // Check if all checkboxes in a section are checked
  const allChecked = [...checkboxes].every((checkbox) => checkbox.checked);
  title.classList.toggle("strike-through", allChecked);
}

// ✅ Attach event listeners to checkboxes
document.querySelectorAll(".exercise-item").forEach((section) => {
  section.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    const exerciseId = checkbox.id;

    checkbox.addEventListener("change", () => {
      saveExerciseState(exerciseId, checkbox.checked);
    });
  });
});

// ✅ Listen for real-time changes from Firebase
onValue(workoutRef, updateUI);
