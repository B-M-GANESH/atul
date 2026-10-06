const toggle = document.querySelector(".nav-toggle");
const menu = document.querySelector("#site-menu");
const links = [...document.querySelectorAll(".menu a")];

toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
});

function setCurrent(id) {
    links.forEach((link) => {
        const on = link.getAttribute("href") === "#" + id;
        link.classList.toggle("active", on);
        if (on) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
    });
}

links.forEach((link) => {
    link.addEventListener("click", () => {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        setCurrent(link.getAttribute("href").slice(1));
    });
});

const sections = links.map((link) => document.querySelector(link.getAttribute("href")));
const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) setCurrent(entry.target.id);
    });
}, { rootMargin: "-45% 0px -48% 0px" });
sections.forEach((section) => spy.observe(section));

document.querySelectorAll(".filter").forEach((button) => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".filter").forEach((item) => {
            item.classList.remove("is-on");
            item.setAttribute("aria-pressed", "false");
        });
        button.classList.add("is-on");
        button.setAttribute("aria-pressed", "true");
        const type = button.dataset.filter;
        document.querySelectorAll(".model").forEach((card) => {
            card.hidden = type !== "all" && card.dataset.type !== type;
        });
    });
});

document.querySelectorAll("[data-book]").forEach((button) => {
    button.addEventListener("click", () => {
        const select = document.querySelector("#model");
        select.value = button.dataset.book;
        document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
        document.querySelector("#name").focus({ preventScroll: true });
    });
});

document.querySelectorAll(".faq-q").forEach((button) => {
    button.addEventListener("click", () => {
        const open = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!open));
        button.nextElementSibling.hidden = open;
    });
});

const form = document.querySelector("#enquiry");
const thanks = document.querySelector("#thanks");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    document.querySelector("#thanks-name").textContent = document.querySelector("#name").value.trim();
    form.hidden = true;
    thanks.hidden = false;
});
document.querySelector("#again").addEventListener("click", () => {
    form.reset();
    thanks.hidden = true;
    form.hidden = false;
});
