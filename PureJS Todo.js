const body = document.body;
const title = document.createElement("h1");
title.textContent = "Todo List";
const input = document.createElement("input");
input.placeholder = "Add a task";
const button = document.createElement("button");
button.textContent = "Add";
const list = document.createElement("ul");

body.append(title, input, button, list);

button.onclick = () => {
  const text = input.value.trim();
  if (!text) return;
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = text;
  const del = document.createElement("button");
  del.textContent = "✕";
  del.onclick = () => li.remove();
  li.append(span, del);
  list.appendChild(li);
  input.value = "";
};
