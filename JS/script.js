// Função principal que espera o carregamento da página
document.addEventListener('DOMContentLoaded', function() {
    // Animação dos botões do menu
    const menuButtons = document.querySelectorAll('#menu div');
    
    menuButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 4px 8px rgba(214, 51, 108, 0.2)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });

    // Máscara para telefone
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.substring(0, 11);
            
            // Formatação: (00) 00000-0000
            if (value.length > 0) {
                value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
                value = value.length > 10 ? 
                    value.replace(/(\d)(\d{4})$/, '$1-$2') : 
                    value.replace(/(\d)(\d{3})$/, '$1-$2');
            }
            e.target.value = value;
        });
    }

    // Validação do formulário
    const formContato = document.getElementById('form-contato');
    if (formContato) {
        formContato.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btnEnviar = document.querySelector('.btn-enviar');
            btnEnviar.disabled = true;
            btnEnviar.textContent = 'Enviando...';
            
            // Simulação de envio (substitua por código real se necessário)
            setTimeout(() => {
                btnEnviar.textContent = '✓ Enviado!';
                alert('Obrigada por sua mensagem! Responderei em breve 💖');
                formContato.reset();
                
                setTimeout(() => {
                    btnEnviar.textContent = 'Enviar Mensagem';
                    btnEnviar.disabled = false;
                }, 2000);
            }, 1500);
        });
    }
});