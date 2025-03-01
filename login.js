document.addEventListener("DOMContentLoaded", function () {
    const firebaseConfig = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
    };
  
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  
    const auth = firebase.auth();
  
    // ✅ Redirect Logged-In Users to `index.html`
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("✅ User already logged in, redirecting...");
        window.location.href = "index.html";
      }
    });
  
    // ✅ Handle Login Form Submission
    const loginForm = document.getElementById("loginForm");
    const loginError = document.getElementById("loginError");
  
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
  
      auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          console.log("✅ Logged in! Redirecting to index.html...");
          window.location.href = "index.html"; // Redirect after login
        })
        .catch((error) => {
          console.error("❌ Login Error:", error.message);
          loginError.textContent = error.message;
          loginError.style.color = "red";
        });
    });
  });
  