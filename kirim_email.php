<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags($_POST['name']); // Sanitasi input
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL); // Validasi dan sanitasi email
    $subject = strip_tags($_POST['subject']); // Sanitasi input
    $message = strip_tags($_POST['message']); // Sanitasi input

    $to = "muhammad.fahmi42840@smp.belajar.id"; // Ganti dengan email Anda
    $email_subject = "Pesan dari Formulir Kontak: " . $subject;
    $email_body = "Nama: " . $name . "\nEmail: " . $email . "\nSubjek: " . $subject . "\nPesan:\n" . $message;
    $headers = "From: " . $email . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";

    if (mail($to, $email_subject, $email_body, $headers)) {
        echo "Pesan berhasil terkirim!"; // Tampilkan pesan sukses
    } else {
        echo "Terjadi kesalahan saat mengirim pesan."; // Tampilkan pesan kesalahan
    }
} else {
    echo "Akses tidak valid."; // Jika bukan metode POST
}

?>
