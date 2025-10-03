/* menu show and hidden */
const navMenu = document.getElementById('nav-menu'),
   toggleMenu = document.getElementById('nav-toggle'),
   closeMenu = document.getElementById('nav-close')

//    show menu
if(toggleMenu){
toggleMenu.addEventListener('click', ()=>{
    navMenu.classList.toggle('show')
})
}

//    hide menu
if(closeMenu){
closeMenu.addEventListener('click', ()=>{
    navMenu.classList.remove('show')
})
}

const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/* MOUSEMOVE HOME IMG */
document.addEventListener('mousemove', move);
function move(e){
    this.querySelectorAll('.move').forEach(layer =>{
        const speed = layer.getAttribute('data-speed')

        const x = (window.innerWidth - e.pageX*speed)/120
        const y = (window.innerHeight - e.pageY*speed)/120

        layer.style.transform = `translateX(${x}px) translateY(${y}px)`
    })
}

/* SWIPER DISCOVER */
let swiper = new Swiper(".discover__container", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    spaceBetween: 32,
    coverflowEffect: {
        rotate: 0,
    },
})

/* VIDEO */
const videoFile = document.getElementById('video-file'),
      videoButton = document.getElementById('video-button'),
      videoIcon = document.getElementById('video-icon')

function playPause(){ 
    if (videoFile.paused){
        // Play video
        videoFile.play()
        // We change the icon
        videoIcon.classList.add('bx-pause')
        videoIcon.classList.remove('bx-play')
    }
    else {
        // Pause video
        videoFile.pause(); 
        // We change the icon
        videoIcon.classList.remove('bx-pause')
        videoIcon.classList.add('bx-play')

    }
}
videoButton.addEventListener('click', playPause)

function finalVideo(){
    // Video ends, icon change
    videoIcon.classList.remove('bx-pause')
    videoIcon.classList.add('bx-play')
}
// ended, when the video ends
videoFile.addEventListener('ended', finalVideo)


/*===== GSAP ANIMATION =====*/
// NAV
gsap.from('.nav__logo, .nav__toggle', {opacity: 0, duration: 1, delay:1, y: 10})
gsap.from('.nav__item', {opacity: 0, duration: 1, delay: 1.2, y: 30, stagger: 0.2,})

// HOME
gsap.from('.home__title', {opacity: 0, duration: 1, delay:1.2, y: 30})
gsap.from('.home__description', {opacity: 0, duration: 1, delay:1.4, y: 30})
gsap.from('.home__button', {opacity: 0, duration: 1, delay:1.6, y: 30})
gsap.from('.home__img', {opacity: 0, duration: 1, delay:1, y: 30})