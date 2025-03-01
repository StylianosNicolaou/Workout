document.addEventListener("DOMContentLoaded", function () {
    const firebaseConfig = {
      apiKey: "AIzaSyCyZRt0Q3bkg-tno6GNUabRnsieMYPecmM",
      authDomain: "liveworkouttracker.firebaseapp.com",
      databaseURL: "https://liveworkouttracker-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "liveworkouttracker",
      storageBucket: "liveworkouttracker.appspot.com",
      messagingSenderId: "608217186734",
      appId: "1:608217186734:web:c1eb261b47b0a9a163483f"
    };
  
    firebase.initializeApp(firebaseConfig);
  
    const loginForm = document.getElementById("loginForm");
    const loginError = document.getElementById("loginError");
  
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
  
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          console.log("Logged in! Redirecting...");
          localStorage.setItem("userUID", userCredential.user.uid);
          window.location.href = "index.html"; // Redirect to workout page
        })
        .catch((error) => {
          console.error("Login Error:", error.message);
          loginError.textContent = error.message;
        });
    });
  });
  