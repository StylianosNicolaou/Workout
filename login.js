fetch('/api/firebase-config') // ✅ Fetch config from Vercel API route
  .then(response => response.json())
  .then(config => {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
      console.log("🔥 Firebase initialized securely!");
    } else {
      firebase.app();
    }

    // ✅ Define `auth` only after Firebase is initialized
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
  })
  .catch(error => console.error("❌ Error loading Firebase config:", error));
