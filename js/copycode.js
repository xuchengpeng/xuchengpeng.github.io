// based on https://www.roboleary.net/2022/01/13/copy-code-to-clipboard-blog.html
const copyLabel = 'Copy Code';

async function copyCode(block, button) {
    let code = block.querySelector('pre.src');
    let text = code.textContent; //code.innerText;
    await navigator.clipboard.writeText(text);
    button.innerText = 'Code Copied';
    setTimeout(() => {
        button.innerText = copyLabel;
    }, 700);
}

function addCopyCodeButtons() {
    if (!navigator.clipboard) return;
    let blocks = document.querySelectorAll('.org-src-container');
    blocks.forEach((block) => {
        let button = document.createElement('button');
        button.innerText = copyLabel;
        block.appendChild(button);
        button.addEventListener('click', async () => {
            await copyCode(block, button);
        });
    });
}

document.addEventListener("DOMContentLoaded", function (event) {
    addCopyCodeButtons();
});
