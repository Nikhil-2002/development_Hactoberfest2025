const logo = document.querySelector('.logo img')
const list = document.querySelector('nav ul')
const btn = document.getElementById('menu-btn')
const scrollToTop = document.querySelector('.scroll-to-top')
const faqClick = document.querySelectorAll('.faq-click')
const smallNav = document.querySelector('.small-nav')

window.addEventListener('scroll', function() {
    const navBar = document.getElementById('navbar');
    const sticky = navBar.offsetTop;
    
    if (window.pageYOffset > sticky) {
        navBar.classList.add("sticky");
      } else {
        navBar.classList.remove("sticky");
      }
    // === logo change
    if (navBar.classList.contains("sticky")) {
        logo.src = "./images/logo/logo.svg";
      } else {
        logo.src = "./images/logo/logo-white.svg";
      }
     
      // show scroll to top btn
      this.scrollY >= 1000 ? scrollToTop.classList.add("show") : scrollToTop.classList.remove("show");
  });


scrollToTop.onclick = function(){
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
btn.addEventListener('click', () => {
    btn.classList.toggle('open')
    smallNav.classList.toggle('show-nav')
    // nav.classList.toggle('flex')
    // nav.classList.toggle('hidden')
})  
  
// ===== wow js
AOS.init();

// faq click show content
faqClick.forEach((faq)=>{
  faq.addEventListener('click', (e) => {
    // console.log(faq.nextElementSibling);
    faq.nextElementSibling.classList.toggle('hidden')
  })
})