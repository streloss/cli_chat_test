const form = document.getElementById("chatForm");
const input = document.getElementById("input");
const output = document.getElementById("output");

function addLine(text, className) {
    const div = document.createElement("div");
    div.className = `line ${className}`;
    div.textContent = text;
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const message = input.value.trim();
    if (!message) return;

    addLine(`> ${message}`, "user");
    input.value = "";

    addLine("Бот печатает...", "system");

    try {
        const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message })
        });

        const data = await res.json();

        // удалить "Бот печатает..."
        output.lastChild.remove();

        addLine(`Бот: ${data.reply}`, "bot");
    } catch {
        addLine("Ошибка сервера", "system");
    }
});
