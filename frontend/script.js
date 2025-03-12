let chatBox = document.getElementById("chat-box");
let userInput = document.getElementById("user-input");

// Update this to your local backend URL
const API_URL = "http://localhost:8000/chat/";

async function sendMessage() {
    let userText = userInput.value.trim();
    if (!userText) return;

    appendMessage("You: " + userText, "user");
    userInput.value = "";

    appendMessage("AI is typing...", "bot");

    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userText }),
    });

    const data = await response.json();
    chatBox.lastChild.remove();  // Remove "AI is typing..."
    appendMessage("AI: " + data.response, "bot");
}

function appendMessage(text, sender) {
    let msg = document.createElement("p");
    msg.textContent = text;
    msg.className = sender;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}
