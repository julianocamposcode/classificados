let body = document.querySelector("body");
let menu = document.querySelector(".menu");
let back = document.querySelector(".back");
let banner = document.querySelector(".banner");
let news = document.querySelector(".new");
let destaques = document.querySelector(".destaques");


menu.addEventListener("click", () => {
    block = (el) => {
        el.style.display = "block";
    };

    none = (el) => {
        el.style.display = "none";
    };
    body.style.overflow = 'hidden';
    nav.classList.add("show");
    if (banner && news) { none(banner); none(news); }

    back.classList.add("blur");

    let close = document.querySelector(".close");

    close.style.display = 'block'

    function closeMenu(item) {
        item.addEventListener("click", () => {
            body.style.overflow = '';
            nav.classList.remove("show");
            if (banner && news) { block(banner); block(news); }
            back.classList.remove("blur");
            close.style.display = 'none'
        })
    }

    closeMenu(close)
    closeMenu(back)
});

