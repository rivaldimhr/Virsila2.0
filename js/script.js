function toggleVideo(){
    const trailer = document.querySelector('.trailer');
    trailer.classList.toggle('active');
    const video = document.querySelector('video');
    video.pause();
};