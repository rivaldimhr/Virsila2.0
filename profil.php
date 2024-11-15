<?php
include 'koneksi.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $email = $_POST['email'];
    $telpon = $_POST['telpon'];
    
    $id = 1;

    $sql = "UPDATE account SET username = ?, email = ?, telpon = ? WHERE id = ?";
    
    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("sssi", $username, $email, $telpon, $id);
        if ($stmt->execute()) {
            ;
        } else {
            echo "Error updating profile: " . $stmt->error;
        }

        $stmt->close();
    } else {
        echo "Error: " . $conn->error;
    }

    $sql = "SELECT * FROM account WHERE id = 1";  
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
    } else {
        echo "Data tidak ditemukan!";
    }
}

$sql = "SELECT * FROM account WHERE id = 1";  
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
} else {
    echo "Data tidak ditemukan!";
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profile with Photo Upload</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:wght@300;500;600&display=swap">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="css/stylespro.css">
</head>

<body>
    <nav class="navbar">
        <div class="navbar__container">
            <ul class="navbar__logo">
                <h1>VIRSILA</h1>
                <h2>Virtual Pancasila</h2>
            </ul>
            <div class="navbar__toggle" id="mobile-menu">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
            <ul class="navbar__menu">
                <li class="navbar__item">
                    <a href="login.php" class="navbar__links">Logout</a>
                </li>
                <li class="navbar__item">
                    <a href="main.html" class="navbar__links">Home</a>
                </li>
                <li class="navbar__item">
                    <a href="SejarahPancasila.html" class="navbar__links">Sejarah Pancasila</a>
                </li>
                <li class="navbar__item">
                    <a href="KUIS.html" class="navbar__links">KUIS</a>
                </li>
                <li class="navbar__btn">
                    <a href="profil.php" class="button">Profil</a>
                </li>
            </ul>
        </div>
    </nav>

    <div class="wrapper" id="profileForm">
        <form action="profil.php" method="POST" >
            <h1>Profile</h1>


            <div class="input-box">
                <input type="text" name="username" placeholder="Full Name" value="<?php echo $row['username']; ?>" required>
                <i class='bx bx-user'></i>
            </div>

            <div class="input-box">
                <input type="email" name="email" placeholder="Email Address" value="<?php echo $row['email']; ?>" required>
                <i class='bx bx-envelope'></i>
            </div>

            <div class="input-box">
                <input type="tel" name="telpon" placeholder="Phone Number" value="<?php echo $row['telpon']; ?>" required>
                <i class='bx bx-phone'></i>
            </div>

            <button type="submit" class="btn">Save Profile</button>
        </form>
    </div>

    <script>
        <?php if ($updateMessage != ''): ?>
            alert("<?php echo $updateMessage; ?>");
        <?php endif; ?>
    </script>
</body>
</html>