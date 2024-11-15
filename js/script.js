const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});
function toggleVideo() {
    const trailer = document.querySelector('.trailer');
    trailer.classList.toggle('active');
    const video = document.querySelector('video');
    video.pause();
}

function changeBg(bgImage, title) {
    // Change background image
    const banner = document.getElementById('banner');
    banner.style.backgroundImage = `url('images/${bgImage}')`;
    banner.style.backgroundSize = 'cover';
    banner.style.backgroundPosition = 'center';

    // Update active content
    const allContents = document.querySelectorAll('.content');
    allContents.forEach(content => {
        content.classList.remove('active');
        if (content.classList.contains(title)) {
            content.classList.add('active');
        }
    });
}

// Unified function to change both background and content
function updateContentAndBackground(index) {
    const banners = [
        {
            title: "Hari Lahir Pancasila",
            image: "images/img-pancasila.png",
            year: "1945",
            rating: "agustus",
            duration: "18",
            genre: "Romance",
            description: "Pancasila adalah dasar ideologi negara Indonesia yang diresmikan sebagai dasar negara pada 18 Agustus 1945. Kata (Pancasila) berasal dari bahasa Sanskerta, di mana panca berarti lima dan sila berarti prinsip atau asas. Dengan demikian, Pancasila memiliki lima prinsip atau nilai dasar yang menjadi landasan dalam kehidupan berbangsa dan bernegara bagi seluruh rakyat Indonesia. Pancasila dirumuskan oleh para pendiri bangsa sebagai panduan ideologi yang mengikat seluruh elemen masyarakat, tanpa memandang perbedaan suku, agama, ras, atau golongan.",
            bgImage: "Poster Hari Lahir Pancasila.jpg",  
            className: "Poster-Hari-Lahir-Pancasila",
            videoSrc: "videos/video pancasila.mp4"
        },
        {
            title: "Sumpah Pemuda",
            image: "images/sumpah pemuda.png",
            year: "1928",
            rating: "Oktober",
            duration: "28",
            genre: "Romance",
            description: `"Isi ikrar tersebut dikenal sebagai Sumpah Pemuda, yang berbunyi:

                1. Kami putra dan putri Indonesia mengaku bertumpah darah yang satu, tanah Indonesia.
                2. Kami putra dan putri Indonesia mengaku berbangsa yang satu, bangsa Indonesia.
                3. Kami putra dan putri Indonesia menjunjung bahasa persatuan, bahasa Indonesia. "`,
            bgImage: "sumpah pemuda.jpg",
            videoSrc: "videos/sumpah pemuda.mp4",   // Background image for this content
            className: "sumpah-pemuda"
        },
        {
            title: "Upacara Peringatan Kemerdekaan Indonesia",
            image: "images/kemerdekaan.png",
            year: "1945",
            rating: "Agustus",
            duration: "17",
            genre: "Drama",
            description: `Kemerdekaan Indonesia adalah momen bersejarah yang menandai berakhirnya penjajahan di nusantara dan awal berdirinya Republik Indonesia sebagai negara yang berdaulat. 
            Kemerdekaan Indonesia diproklamasikan oleh Soekarno dan Mohammad Hatta atas nama bangsa Indonesia pada tanggal 17 Agustus 1945 di Jakarta. 
            
            Proklamasi tersebut menjadi puncak dari perjuangan panjang rakyat Indonesia melawan penjajahan Belanda dan Jepang, 
            serta simbol dari tekad bangsa Indonesia untuk menentukan nasibnya sendiri. 
            Teks Proklamasi dibacakan oleh Soekarno, yang berbunyi:
            
              "Kami bangsa Indonesia dengan ini menyatakan Kemerdekaan Indonesia.
               Hal-hal yang mengenai pemindahan kekuasaan dan lain-lain diselenggarakan dengan cara seksama 
               dan dalam tempo yang sesingkat-singkatnya."`,

            bgImage: "UPACARA PERINGATAN KEMERDEKAAN INDONESIA.jpg",  
            videoSrc: "videos/video pancasila.mp4", // Background image for this content
            className: "UPACARA PERINGATAN KEMERDEKAAN INDONESIA"
        },
        {
            title: "Film Tema Korupsi",
            image: "images/korupsi.png",
            year: "-",
            rating: "-",
            duration: "-",
            genre: "Documentary",
            description: `"Korupsi adalah tindakan penyalahgunaan kekuasaan atau jabatan untuk memperoleh keuntungan pribadi atau kelompok secara tidak sah. 
                Korupsi dapat terjadi dalam berbagai bentuk, seperti suap, penggelapan, nepotisme, gratifikasi, atau penyalahgunaan anggaran.

                Tindakan korupsi memiliki dampak yang sangat merugikan, tidak hanya bagi keuangan negara, tetapi juga bagi masyarakat secara luas. 
                Korupsi dapat menghambat pembangunan, memperburuk pelayanan publik, meningkatkan kesenjangan sosial, dan menurunkan kepercayaan masyarakat terhadap institusi pemerintah.

                Penyebab korupsi biasanya melibatkan kombinasi faktor, termasuk lemahnya sistem pengawasan, budaya permisif, kurangnya integritas pejabat, 
                dan ketidakpedulian masyarakat terhadap penegakan hukum."`,
            bgImage: "Poster Film tema korupsi.jpg", 
            videoSrc: "videos/video pancasila.mp4", // Background image for this content
            className: "Poster Film tema korupsi"
        },
        {
            title: "Keberagaman",
            image: "images/keberagaman.png",
            year: "2020",
            rating: "All Ages",
            duration: "2h",
            genre: "Educational",
            description: `"Keberagaman Indonesia adalah salah satu kekayaan terbesar bangsa yang mencakup perbedaan suku, agama, ras, bahasa, budaya, dan adat istiadat. 
                Indonesia terdiri dari lebih dari 17.000 pulau yang dihuni oleh ratusan suku bangsa, seperti Jawa, Sunda, Minangkabau, Batak, Dayak, Papua, dan masih banyak lagi. 
                Setiap suku memiliki tradisi, pakaian adat, tarian, serta kearifan lokal yang unik."`,
            bgImage: "poster keberagaman.jpg", 
            videoSrc: "videos/video pancasila.mp4",  // Background image for this content
            className: "poster keberagaman"
        }
    ];

    const content = banners[index];

    // Change background using changeBg
    changeBg(content.bgImage, content.className);
    // Update the content dynamically
    document.querySelector('.content').querySelector('.movie-title').src = content.image;
    document.querySelector('.content').querySelector('h4').innerHTML = `<span>${content.year}</span><span><i>${content.rating}</i></span><span>${content.duration}</span><span>${content.genre}</span>`;
    document.querySelector('.content').querySelector('p').textContent = content.description;

    const trailerVideo = document.getElementById("trailer-video");
        trailerVideo.src = content.videoSrc;
        trailerVideo.load();

}

