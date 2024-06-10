const btn = document.querySelector('.btn-plataforma')
const plataformas = document.querySelector('.btn-plataforma .plataformas')

btn.onclick = () => {
    plataformas.classList.toggle('ativo')
}

