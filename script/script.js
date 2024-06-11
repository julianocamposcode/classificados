let nav = document.querySelector(".links");
let drop = document.querySelector(".dropMenu");
let menu = document.querySelector(".menu");
let back = document.querySelector(".back");
let banner = document.querySelector(".banner");
let news = document.querySelector(".new");

menu.addEventListener("click", () => {
    nav.classList.add("show");
    if (banner && news) { none(banner); none(news); }

    back.classList.add("blur");

    let close = document.querySelector(".close");

    close.addEventListener("click", () => {
        nav.classList.remove("show");
        if (banner && news) { block(banner); block(news); }
        back.classList.remove("blur");
    });

    block = (el) => {
        el.style.display = "block";
    };
});

none = (el) => {
    el.style.display = "none";
};

function scroll() {
    if (scrollY > 0) {
        nav.classList.add("style_nav");
        drop.classList.add("style_nav");
    } else {
        nav.classList.remove("style_nav");
        drop.classList.remove("style_nav");
    }
}
