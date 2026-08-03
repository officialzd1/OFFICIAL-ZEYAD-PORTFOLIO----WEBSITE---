window.onscroll = function() {
let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
let scrolled = (winScroll / height) * 100;
document.querySelector(".scroll-progress").style.width = scrolled + "%";
};
window.onscroll = function() {
let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
let scrolled = (winScroll / height) * 100;
document.querySelector(".scroll-progress").style.width = scrolled + "%";
const backToTopButton = document.getElementById("backToTopBtn");
if (winScroll > 300) {
backToTopButton.classList.add("show");
} else {
backToTopButton.classList.remove("show");
}
};