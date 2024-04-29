const header = document.querySelector(".header");
const navBar = document.querySelector(".header__list");
const backTop = document.querySelector(".back-top");

window.addEventListener("scroll", function () {
    showBackTop();
    showHeaderShrink();
});


function showBackTop() {
    if (scrollY > 100) {
        backTop.classList.add("show__back-top");
    } else {
        backTop.classList.remove("show__back-top");
    }
}
function showHeaderShrink() {
    if (scrollY > 0) {
        header.classList.add("show__header__shrink");
    } else {
        header.classList.remove("show__header__shrink");
    }
}

