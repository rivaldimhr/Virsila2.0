<?php
    include 'koneksi.php';

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

        $email = mysqli_real_escape_string($conn, $_POST['email']);
        $password = mysqli_real_escape_string($conn, $_POST['password']);

        $query = "SELECT * FROM account WHERE BINARY email='$email' AND password='$password'"; 
        $result = mysqli_query($conn, $query);

        if (mysqli_num_rows($result) > 0) {
            header("Location: main.html");
            exit();
        } else {
            echo "<script>alert('email atau password salah');</script>";
        }
    }
?>

<!DOCTYPE html>
<html lang="en">




<head>
    <meta charset="UTF-8">
    <title>Login - HTML & CSS</title>
    <link rel="stylesheet" href="https://fonts.gstatic.com">
    <link rel="stylesheet" href="font-awesome-4.7.0\css\font-awesome.min.css">
    <link href="https://fonts.googleapis.com/css?family=Poppins:wght@300;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css\styleslog.css">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>


</head>

<body>
    <div class="wrapper" id="loginForm">
        <form action="login.php" method="POST">
            <h1>Login</h1>
            <div class="input-box">
                <input type="text" name="email" placeholder="email" required >
                <i class='bx bx-user'></i>
            </div>
            <div class="input-box">
                <input type="password" name="password" placeholder="password" required >
                <i class='bx bxs-lock-alt'></i>
            </div>
          
            <button type="submit" class="btn">Login</button>

            <div class="register-link">
                <p>Don't have account?
                    <a href="Register.php">Register</a>
                </p>
            </div>
        </form>
    </div>

    <script src="js\app.js"></script>
</body>
</html>