const socket = io();
const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");

let username = localStorage.getItem("username");
if (!username) {
  username = prompt("Enter your name:");
  localStorage.setItem("username", username);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", { user: username, text: input.value });
    input.value = "";
  }
});

socket.on("chat message", function (msg) {
  const item = document.createElement("li");
  item.className = "flex items-end";
  const avatar = `<div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${msg.user === username ? 'bg-blue-500 ml-2' : 'bg-purple-400 mr-2'}">
    ${msg.user[0]?.toUpperCase() || "?"}
  </div>`;
  if (msg.user === username) {
    item.innerHTML = `
      <div class="flex flex-row-reverse items-end w-full">
        ${avatar}
        <div class="ml-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-2xl rounded-br-none max-w-[70%] shadow">
          <span class="block text-xs text-right opacity-70">${msg.user} (You)</span>
          <span class="break-words">${msg.text}</span>
        </div>
      </div>
    `;
  } else {
    item.innerHTML = `
      <div class="flex items-end w-full">
        ${avatar}
        <div class="mr-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-2xl rounded-bl-none max-w-[70%] shadow">
          <span class="block text-xs text-left opacity-70">${msg.user}</span>
          <span class="break-words">${msg.text}</span>
        </div>
      </div>
    `;
  }
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
});