// Active link in sidebar
const links = document.querySelectorAll(".sidebar a");

links.forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add("active");
    }
});

// Copy command button
document.querySelectorAll("pre").forEach(block => {

    const btn = document.createElement("button");
    btn.innerText = "Copy";
    btn.className = "copy-btn";

    btn.onclick = () => {
        navigator.clipboard.writeText(block.innerText);
        btn.innerText = "Copied";
        setTimeout(() => btn.innerText = "Copy", 1500);
    };

    block.appendChild(btn);
});
