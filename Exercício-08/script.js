document.addEventListener("DOMContentLoaded", () => {
  const comentarioInput = document.getElementById("comentarioInput");
  const adicionarBtn = document.getElementById("adicionarBtn");
  const listaComentarios = document.getElementById("listaComentarios");

  adicionarBtn.addEventListener("click", () => {
    const texto = comentarioInput.value.trim();
    if (texto === "") {
      alert("Digite um comentário antes de adicionar.");
      return;
    }

    const li = document.createElement("li");
    const textoComentario = document.createElement("span");
    textoComentario.textContent = texto;

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.onclick = () => {
      const novoTexto = prompt("Edite o comentário:", textoComentario.textContent);
      if (novoTexto !== null && novoTexto.trim() !== "") {
        textoComentario.textContent = novoTexto.trim();
      }
    };

    const btnRemover = document.createElement("button");
    btnRemover.textContent = "Remover";
    btnRemover.onclick = () => {
      li.remove();
    };

    li.appendChild(textoComentario);
    li.appendChild(btnEditar);
    li.appendChild(btnRemover);

    listaComentarios.appendChild(li);

    comentarioInput.value = "";
    comentarioInput.focus();
  });
});
