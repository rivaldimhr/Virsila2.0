import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { firebaseConfig } from "./Firebase.js";

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Fungsi untuk mengambil data profil dari server
async function fetchProfile() {
    const user = auth.currentUser;
    if (!user) {
        console.warn("No user logged in.");
        return;
    }

    try {
        const docRef = doc(db, "profiles", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const profileData = docSnap.data();
            document.getElementById("full-name").value = profileData.fullName || "";
            document.getElementById("email").value = profileData.email || "";
            document.getElementById("phone-number").value = profileData.phoneNumber || "";
        } else {
            console.log("Profile data not found.");
        }
    } catch (error) {
        console.error("Error fetching profile data:", error);
        alert("Failed to load profile data.");
    }
}

// Fungsi untuk menyimpan data profil
async function saveProfile(event) {
    event.preventDefault();

    const user = auth.currentUser;
    if (!user) {
        alert("No user logged in.");
        return;
    }

    const profileData = {
        fullName: document.getElementById("full-name").value.trim(),
        email: document.getElementById("email").value.trim(),
        phoneNumber: document.getElementById("phone-number").value.trim(),
        
    };

    try {
        // Ensure the profile document is created or updated with new data
        await setDoc(doc(db, "profiles", user.uid), profileData, { merge: true });
        alert("Profile saved successfully!");
    } catch (error) {
        console.error("Error saving profile:", error);
        alert("Failed to save profile.");
    }
}

// Menambahkan event listener ke form
const profileForm = document.querySelector(".register_form");
if (profileForm) {
    profileForm.addEventListener("submit", saveProfile);
}

// Event listener untuk autentikasi
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User logged in:", user.uid);
        fetchProfile();  // Fetch profile when user logs in
    } else {
        console.warn("No user logged in.");
    }
});

document.addEventListener("DOMContentLoaded", fetchProfile);
