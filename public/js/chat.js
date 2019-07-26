const socket = io();

let input = document.getElementById("input-msg"),
  usuario = document.getElementById("usuario"),
  botao = document.getElementById("enviar"),
  output = document.getElementById("output-msg"),
  info = document.getElementById("info");

usuario.addEventListener("change", () => {
  if (usuario.value.length > 3) {
    usuario.disabled = true;
    botao.disabled = false;
  } else {
    alert("Informe um nome com ao menos 3 caracteres");
    botao.disabled = true;
  }
});

botao.addEventListener("click", () => {
  socket.emit("chat", {
    msg: input.value,
    usuario: usuario.value
  });

  input.value = "";
});

input.addEventListener("keyup", function() {
  console.log(input.value.length);
  if (input.value.length > 0) {
    socket.emit("digitando", usuario.value);
  } else {
    console.log("saiu");
    socket.emit("nao-digitando");
  }
});

socket.on("chat", data => {
  info.innerHTML = "";
  // if (data.usuario === usuario.value) {
    output.innerHTML += `<p>${data.usuario}: ${data.msg}</p>`;
  // }
});

socket.on("digitando", data => {
  info.innerHTML = `<p><em>${data} está digitando...</em></p>`;
});

//retira a mensagem de digitando quando o campo input está vazio
socket.on("nao-digitando", () => {
  info.innerHTML = "";
});
