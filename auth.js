// Konfigurasi Firebase
const firebaseConfig = {
    apiKey: "API_KEY_KAMU",
    authDomain: "PROJECT_ID.firebaseapp.com",
    databaseURL: "https://PROJECT_ID.firebaseio.com",
    projectId: "PROJECT_ID",
    storageBucket: "PROJECT_ID.appspot.com",
    messagingSenderId: "SENDER_ID",
    appId: "APP_ID"
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Fungsi Kirim Form ke Firebase
document.getElementById("contact").addEventListener("submit", function(event) {
    event.preventDefault(); // Mencegah reload halaman

    // Ambil nilai dari form
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let subject = document.getElementById("subject").value;
    let message = document.getElementById("message").value;

    // Simpan ke Firebase Database
    database.ref("messages").push({
        name: name,
        email: email,
        subject: subject,
        message: message,
        timestamp: new Date().toISOString()
    }).then(() => {
        alert("Pesan terkirim!");
        document.getElementById("contact").reset(); // Reset form setelah terkirim
    }).catch((error) => {
        console.error("Gagal mengirim pesan:", error);
    });
    const socket = io();

socket.on("play-audio", () => {
    document.getElementById("music").play();
});

socket.on("pause-audio", () => {
    document.getElementById("music").pause();
});
const handleSubmit = event => {
  event.preventDefault();

  const myForm = event.target;
  const formData = new FormData(myForm);

  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString()
  })
    .then(() => console.log("Form successfully submitted"))
    .catch(error => alert(error));
};

document.querySelector("form").addEventListener("submit", handleSubmit);
});