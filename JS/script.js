document.addEventListener('DOMContentLoaded', function() {
    // Cria elementos para mensagem e overlay
    const body = document.body;
    
    const overlay = document.createElement('div');
    overlay.id = 'form-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        backdrop-filter: blur(5px);
        z-index: 1000;
        display: none;
    `;
    body.appendChild(overlay);

    const messageBox = document.createElement('div');
    messageBox.id = 'form-message';
    messageBox.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0,0,0,0.3);
        z-index: 1001;
        display: none;
        max-width: 80%;
        text-align: center;
    `;
    body.appendChild(messageBox);

    // Função para mostrar mensagem
    function showMessage(message) {
        messageBox.innerHTML = `
            <p style="color: #d32f2f; margin: 0 0 15px 0;">${message}</p>
            <button onclick="closeMessage()" style="
                padding: 8px 16px;
                background-color: #d32f2f;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            ">OK</button>
        `;
        messageBox.style.display = 'block';
        overlay.style.display = 'block';
    }

    // Função para fechar mensagem (agora global)
    window.closeMessage = function() {
        messageBox.style.display = 'none';
        overlay.style.display = 'none';
    }

    // Validação do formulário
    const form = document.getElementById('form-contato');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensagem = document.getElementById('mensagem').value.trim();
            const telefone = document.getElementById('telefone').value.trim();

            // Validações
            if (!nome) {
                showMessage('Por favor, preencha seu nome.');
                document.getElementById('nome').focus();
                return false;
            }

            if (!email) {
                showMessage('Por favor, preencha seu e-mail.');
                document.getElementById('email').focus();
                return false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showMessage('Por favor, insira um e-mail válido.');
                document.getElementById('email').focus();
                return false;
            }

            if (telefone && !/^[0-9]{11}$/.test(telefone)) {
                showMessage('O telefone deve conter 11 dígitos numéricos.');
                document.getElementById('telefone').focus();
                return false;
            }

            if (!mensagem) {
                showMessage('Por favor, escreva sua mensagem.');
                document.getElementById('mensagem').focus();
                return false;
            }

            // Se tudo estiver ok, pode enviar
            alert('Formulário válido! Enviando...'); // Substitua por AJAX ou form.submit()
            // form.submit(); // Descomente para enviar realmente
            return true;
        });
    }
});
