// Função para aplicar o tema e alterar a imagem do ícone
function aplicarTema(tema) {
    const body = document.body;
    const imagem = document.getElementById('imagem');
    
    if (tema === 'claro') {
        body.classList.add('tema-claro');
        imagem.src = "src/imagens/logos/lua.svg"; // Muda para o ícone da lua
    } else {
        body.classList.remove('tema-claro');
        imagem.src = "src/imagens/logos/sol.svg"; // Muda para o ícone do sol
    }
}

// Obtém as referências para os links do menu
const linkModoClaro = document.getElementById('modo-claro');
const linkModoEscuro = document.getElementById('modo-escuro');
const linkModoSistema = document.getElementById('modo-sistema');

// Adiciona um evento de clique para o Modo Claro
if (linkModoClaro) {
    linkModoClaro.addEventListener('click', (e) => {
        e.preventDefault();
        aplicarTema('claro');
        localStorage.setItem('tema', 'claro');
    });
}

// Adiciona um evento de clique para o Modo Escuro
if (linkModoEscuro) {
    linkModoEscuro.addEventListener('click', (e) => {
        e.preventDefault();
        aplicarTema('escuro');
        localStorage.setItem('tema', 'escuro');
    });
}

// Adiciona um evento de clique para o Modo Sistema
if (linkModoSistema) {
    linkModoSistema.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('tema'); // Remove a preferência salva
        // Chama a função novamente para que ela verifique a preferência do sistema
        verificaTemaSalvoOuSistema();
    });
}

// Função para verificar e aplicar o tema ao carregar a página
function verificaTemaSalvoOuSistema() {
    const temaSalvo = localStorage.getItem('tema');
    
    if (temaSalvo) {
        aplicarTema(temaSalvo);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        // Se não houver tema salvo, usa a preferência do sistema
        aplicarTema('claro');
    } else {
        // Se não houver preferência, assume o tema escuro padrão
        aplicarTema('escuro');
    }
}

// Ao carregar a página, verifica o tema
document.addEventListener('DOMContentLoaded', verificaTemaSalvoOuSistema);

// Opcional: ouvir mudanças na preferência do sistema
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', event => {
    // Só atualiza se o usuário estiver no modo "Sistema"
    if (!localStorage.getItem('tema')) {
        event.matches ? aplicarTema('claro') : aplicarTema('escuro');
    }
});

// Código para a máscara de telefone (mantido como estava)
const phoneInput = document.getElementById('floatingTel');
phoneInput.addEventListener('input', (event) => {
    let value = event.target.value;
    let cleanedValue = value.replace(/\D/g, '');
    if (cleanedValue.length > 11) {
        cleanedValue = cleanedValue.substring(0, 11);
    }
    let formattedValue = '';
    if (cleanedValue.length > 0) {
        formattedValue += `(${cleanedValue.substring(0, 2)}`;
    }
    if (cleanedValue.length > 2) {
        formattedValue += `) ${cleanedValue.substring(2, 3)}`;
    }
    if (cleanedValue.length > 3) {
        formattedValue += `${cleanedValue.substring(3, 7)}`;
    }
    if (cleanedValue.length > 7) {
        formattedValue += `-${cleanedValue.substring(7, 11)}`;
    }
    event.target.value = formattedValue;
});