document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  const cpfInput = document.getElementById("cpf");
  const senhaInput = document.getElementById("senha");
  const form = document.getElementById("login-form");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    if (!this.checkValidity()) {
      this.classList.add("was-validated");
      return;
    }

    const cpf = cpfInput.value;
    const senha = senhaInput.value;
    const url = `http://localhost:8080/funcionarios/${cpf}/${senha}`;

    try {
      const response = await fetch(url, { method: "GET" });
      if (response.ok) {
        const user = await response.json();
        sessionStorage.setItem("loggedInUser", JSON.stringify(user)); // Salvar o usuário no sessionStorage
        const redirectUrl =
          "/client/src/pages/funcionario/PedidosEmAberto/PedidosEmAberto.html";
        window.location.href = redirectUrl;
      } else {
        senhaInput.classList.add("is-invalid");
        senhaInput.nextElementSibling.textContent =
          "Senha ou CPF incorreto(a).";
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert(
        "Erro ao tentar fazer login. Por favor, tente novamente mais tarde."
      );
    }
  });
});
