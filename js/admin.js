document.addEventListener("DOMContentLoaded", function () {
  const adminForm = document.getElementById("adminForm");
  const listaUsuarios = document.getElementById("listaUsuarios");
  const pesquisaInput = document.getElementById("pesquisa");
  const limparCamposBtn = document.getElementById("limparCampos");
  const limparTudoBtn = document.getElementById("limparTudo");

  function carregarUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    renderizarLista(usuarios);
  }

  function renderizarLista(usuarios) {
    listaUsuarios.innerHTML = "";
    usuarios.forEach((usuario, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
                Data: ${usuario.data} | Nome: ${usuario.nome} | Email: ${usuario.email}
                <button onclick="excluirUsuario(${index})">Excluir</button>
            `;
      listaUsuarios.appendChild(li);
    });
  }

  adminForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const data = new Date().toLocaleString();

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push({ nome, email, data });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    carregarUsuarios();
    adminForm.reset();
  });

  pesquisaInput.addEventListener("input", function () {
    const termo = this.value.toLowerCase();
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuariosFiltrados = usuarios.filter(
      (usuario) =>
        usuario.nome.toLowerCase().includes(termo) ||
        usuario.email.toLowerCase().includes(termo)
    );
    renderizarLista(usuariosFiltrados);
  });

  limparCamposBtn.addEventListener("click", function () {
    adminForm.reset();
  });

  limparTudoBtn.addEventListener("click", function () {
    localStorage.removeItem("usuarios");
    carregarUsuarios();
  });

  window.excluirUsuario = function (index) {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.splice(index, 1);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    carregarUsuarios();
  };

  carregarUsuarios();
});
