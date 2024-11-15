<?php
include 'koneksi.php'; 

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Ambil data dari form
    $username = mysqli_real_escape_string($conn, trim($_POST['username']));
    $password = mysqli_real_escape_string($conn, trim($_POST['password']));
    $confirm_password = mysqli_real_escape_string($conn, trim($_POST['confirm_password']));

    if ($password === $confirm_password) {
        // Periksa apakah username sudah ada di database
        $check_user_query = "SELECT * FROM akun WHERE username='$username'";
        $check_result = mysqli_query($conn, $check_user_query);
        
        if (mysqli_num_rows($check_result) > 0) {
            echo "<script>alert('Username sudah digunakan, pilih username lain');</script>";
        } else {
            $query = "INSERT INTO akun (username, password) VALUES ('$username', '$password')";

            if (mysqli_query($conn, $query)) {
                header("Location: login.php");
                exit();
            } else {
                echo "<script>alert('Pendaftaran gagal, coba lagi');</script>";
            }
        }
    } else {
        echo "<script>alert('Password dan Konfirmasi Password tidak cocok');</script>";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Register</title>
    <link rel="stylesheet" href="https://fonts.gstatic.com">
    <link rel="stylesheet" href="font-awesome-4.7.0/css/font-awesome.min.css">
    <link href="https://fonts.googleapis.com/css?family=Poppins:wght@300;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/styleslog.css">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
</head>
<body>
    <div class="wrapper">
        <form action="Register.php" method="POST"> 
            <h1>Signup</h1>
            <div class="input-box">
                <input type="text" placeholder="Enter your Username" name="username" required>
                <i class='bx bx-user'></i>
            </div>
            <div class="input-box">
                <input type="password" placeholder="Create a password" name="password" required>
                <i class='bx bxs-lock-alt'></i>
            </div>
            <div class="input-box">
                <input type="password" placeholder="Confirm a password" name="confirm_password" required>
                <i class='bx bxs-lock-alt'></i>
            </div>
            <button type="submit" class="btn">Create Account</button>
            <div class="register-link">
                <p>Already have an account?
                    <a href="login.php">Login</a>
                </p>
            </div>
        </form>
    </div>
</body>
</html>
