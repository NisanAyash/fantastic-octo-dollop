const ME = window.location.pathname.split("/")[2].split(".html")[0];

document.addEventListener("DOMContentLoaded", () => {
  const chatBox = document.getElementById("chat-box");
  const messageInput = document.getElementById("message-input");
  const sendButton = document.getElementById("send-button");
  const socket = new WebSocket("ws://localhost:3000");

  socket.addEventListener("open", () => {
    console.log("Connected to server");
  });

  socket.addEventListener("message", async (event) => {
    try {
      const data = await event.data.text();
      const message = await JSON.parse(data);
      displayMessage(message.sender, message.text);
    } catch (error) {
      alert(error.message);
    }
  });

  sendButton.addEventListener("click", () => {
    const message = messageInput.value.trim();
    if (message !== "") {
      const messageObj = { sender: ME, text: message };
      displayMessage(messageObj.sender, messageObj.text);
      socket.send(JSON.stringify(messageObj));
      messageInput.value = "";
    }
  });

  function displayMessage(sender, message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.innerHTML = `<strong>${
      sender === ME ? "Me" : sender
    }:</strong> ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
});
