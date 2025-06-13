document.addEventListener('DOMContentLoaded', function() {
    // Cria elementos para a mensagem e overlay
    const overlay = document.createElement('div');
    overlay.id = 'overlay';
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
    
    const messageBox = document.createElement('div');
    messageBox.id = 'error-message';
    messageBox.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #ffebee;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        z-index: 1001;
        display: none;
        max-width: 80%;
        text-align: center;
    `;
    
    document.body.appendChild(overlay);
    document.body.appendChild(messageBox);

    // Função para mostrar mensagem de erro
    function showError(message) {
        messageBox.innerHTML = `<p style="color: #d32f2f; margin: 0;">${message}</p>
                               <button id="close-message" style="margin-top: 15px; padding: 8px 16px; 
                               background-color: #d32f2f; color: white; border: none; border-radius: 4px; 
                               cursor: pointer;">OK</button>`;
        
        messageBox.style.display = 'block';
        overlay.style.display = 'block';
        
        document.getElementById('close-message').addEventListener('click', function() {
            messageBox.style.display = 'none';
            overlay.style.display = 'none';
        });
    }

    // Validação do formulário
    document.getElementById('form-contato').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();
        
        // Verifica campos obrigatórios
        if (!nome) {
            showError('Por favor, preencha seu nome.');
            document.getElementById('nome').focus();
            return;
        }
        
        if (!email) {
            showError('Por favor, preencha seu e-mail.');
            document.getElementById('email').focus();
            return;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showError('Por favor, insira um e-mail válido.');
            document.getElementById('email').focus();
            return;
        }
        
        if (!mensagem) {
            showError('Por favor, escreva sua mensagem.');
            document.getElementById('mensagem').focus();
            return;
        }
        
        // Se tudo estiver preenchido corretamente, pode enviar o formulário
        this.submit();
    });

    // Validação do telefone (opcional, mas se preenchido, deve estar correto)
    document.getElementById('telefone').addEventListener('blur', function() {
        const telefone = this.value.trim();
        if (telefone && !/^[0-9]{11}$/.test(telefone)) {
            showError('Por favor, insira um telefone válido (apenas números, 11 dígitos).');
            this.focus();
        }
    });
});
