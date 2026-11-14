const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});


document.addEventListener("DOMContentLoaded", () => {
    const containers = document.querySelectorAll('.main__container, .services__container > div');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Hentikan observasi setelah terlihat
            }
        });
    });

    containers.forEach(container => {
        observer.observe(container);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const animatedTexts = document.querySelectorAll('.animated-text');

    animatedTexts.forEach((text, index) => {
        setTimeout(() => {
            text.classList.add('visible'); // Tambahkan kelas visible dengan delay
        }, index * 300); 
    });

    const animatedElements = document.querySelectorAll('.animated-image, .animated-video');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // kelas visible untuk gambar dan video
            } else {
                entry.target.classList.remove('visible'); // Hapus kelas visible jika elemen keluar dari viewport
            }
        });
    });

    animatedElements.forEach(element => {
        observer.observe(element); // Mulai mengamati setiap elemen
    });
});


//kuis
// Quiz Data
let quizData = []; // Array untuk menyimpan data soal yang diambil

// Mengambil data soal dari file JSON
fetch("json/quizData.json")
    .then(response => response.json())
    .then(data => {
        quizData = data;
        showStartScreen(); // Memanggil fungsi tampilan awal
    })
    .catch(error => console.error("Error loading quiz data:", error));

// Fungsi untuk memuat soal saat ini


const startScreen = document.getElementById('start-screen');
const startButton = document.getElementById('start-btn');
const quiz = document.getElementById('quiz');
const countQuestion = document.getElementById('count-question');
const totalNumberOfQuestions = document.getElementById('tol-num-que');
const questionNumber = document.getElementById('question-number');
const questionTitle = document.getElementById('question');
const answerLabels = document.querySelectorAll('.answer-label');
const nextQuestionBtn = document.getElementById('next-question-btn');
const allInputs = document.querySelectorAll("input[type='radio']");
const submitQuiz = document.getElementById('submite');
const resultE1 = document.getElementById("result");
const scoreE1 = document.getElementById("score");

let currentQtn = 0;
let answeredCorrectly = 0;

// Function to load a question
const loadQuiz = () => {
    if (quizData.length === 0) return; // Pastikan data soal sudah terisi

    countQuestion.innerHTML = `${currentQtn + 1}`;
    totalNumberOfQuestions.innerHTML = quizData.length;
    questionNumber.innerHTML = `${currentQtn + 1}`;
    questionTitle.innerHTML = quizData[currentQtn].question;
    
    // Mengisi opsi jawaban
    answerLabels[0].innerHTML = quizData[currentQtn].a;
    answerLabels[1].innerHTML = quizData[currentQtn].b;
    answerLabels[2].innerHTML = quizData[currentQtn].c;
    answerLabels[3].innerHTML = quizData[currentQtn].d;

    reset();

    // Menampilkan tombol yang sesuai
    if (currentQtn === quizData.length - 1) {
        nextQuestionBtn.style.display = "none";
        submitQuiz.style.display = "block";
    } else {
        nextQuestionBtn.style.display = "block";
        submitQuiz.style.display = "none";
    }
};

// Function to reset the selected radio buttons
const reset = () => {
    allInputs.forEach((input) => {
        input.checked = false;
    });
}

// Event listener for "Next Question" button
nextQuestionBtn.addEventListener("click", () => {
    let answer = getSelected();
    if (answer) {
        if (answer === quizData[currentQtn].correct) {
            answeredCorrectly++;
        }
        currentQtn++;
        if (currentQtn < quizData.length) {
            loadQuiz();
        }
    }
});

// Event listener for "Submit" button
submitQuiz.addEventListener("click", () => {
    let answer = getSelected();
    if (answer && answer === quizData[currentQtn].correct) {
        answeredCorrectly++;
    }

    // Display quiz result after submission
    quiz.style.display = "none";
    resultE1.style.display = "block";
    scoreE1.innerHTML = `Questions Answered Correctly: ${answeredCorrectly}/${quizData.length}`;
});

// Function to get the selected answer
const getSelected = () => {
    let answer;
    allInputs.forEach((input) => {
        if (input.checked) {
            answer = input.value;
        }
    });
    return answer;
}




// Show start screen, hide quiz
const showStartScreen = () => {
    startScreen.style.display = 'flex';
    quiz.style.display = 'none';
    resultE1.style.display = 'none';
}

// Event Listener for Start Button
startButton.addEventListener("click", () => {
    startScreen.style.display = 'none';
    quiz.style.display = 'block';
    loadQuiz();
});

// Initial display settings
showStartScreen();