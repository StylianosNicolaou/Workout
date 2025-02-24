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
  }

  // ✅ Attach event listeners to checkboxes
  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      updateWorkoutProgress(this);
    });
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
        }
      });
    }
  });
});
