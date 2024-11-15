
<?php
include 'koneksi.php'; 

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = mysqli_real_escape_string($conn, trim($_POST['email']));
    $password = mysqli_real_escape_string($conn, trim($_POST['password']));
    $confirm_password = mysqli_real_escape_string($conn, trim($_POST['confirm_password']));

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "<script>alert('Format email tidak valid!');</script>";
    } else {
        if ($password === $confirm_password) {
            $check_user_query = "SELECT * FROM account WHERE email='$email'";
            $check_result = mysqli_query($conn, $check_user_query);
            
            if (mysqli_num_rows($check_result) > 0) {
                echo "<script>alert('email sudah digunakan, pilih email lain!');</script>";
            } else {
                $query = "INSERT INTO account (email, password) VALUES ('$email', '$password')";

                if (mysqli_query($conn, $query)) {
                    echo "<script>alert('Akun berhasil dibuat!'); window.location.href = 'login.php';</script>";
                    exit();
                } else {
                    echo "<script>alert('Pendaftaran gagal, coba lagi.');</script>";
                }
            }
        } else {
            echo "<script>alert('Password dan Konfirmasi Password tidak cocok!');</script>";
        }
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
                <input type="text" placeholder="Enter your Email" name="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" >
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
