<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags($_POST['name']);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $subject = strip_tags($_POST['subject']);
    $message = strip_tags($_POST['message']);

    $mail = new PHPMailer(true);
    try {
        // Konfigurasi SMTP Gmail
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'emailkamu@gmail.com'; // Ganti dengan email kamu
        $mail->Password = 'passwordaplikasi'; // Gunakan Password Aplikasi Gmail
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        // Pengirim & Penerima
        $mail->setFrom($email, $name);
        $mail->addAddress('muhammad.fahmi42840@smp.belajar.id'); // Email tujuan

        // Konten Email
        $mail->Subject = "Pesan dari Formulir Kontak: " . $subject;
        $mail->Body = "Nama: $name\nEmail: $email\nSubjek: $subject\nPesan:\n$message";

        // Kirim Email
        $mail->send();
        echo "Pesan berhasil terkirim!";
    } catch (Exception $e) {
        echo "Terjadi kesalahan: {$mail->ErrorInfo}";
    }
} else {
    echo "Akses tidak valid.";
}
?>