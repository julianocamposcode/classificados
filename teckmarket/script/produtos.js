let form = document.getElementById("dataForm");
let ul = document.getElementById("imageList");
let center = document.querySelector(".center");
let textarea = document.querySelector("textarea");
let audiowide = document.querySelectorAll('.audiowide')

audiowide[3].onclick = () => {
    let url = new URL(window.location.href);
    url.searchParams.delete('editar');
    window.location.href = url.toString();
}

if (form) {
    if (localStorage.atualizar == 'false') {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            let precoRegex = /^\d+(?:[\.,]\d{1,2})?/;
            if (nome.value == '' || preco.value == '' || !precoRegex.test(preco.value) || !inputFile.files.length > 0 || textarea.value == '') {
                loader.style.display = 'flex';
                submit.value = ''
                setTimeout(() => {
                    loader.style.display = 'none';
                    submit.value = 'Cadastrar Anúncio'
                }, 500);
                setTimeout(() => {
                    Swal.fire({
                        icon: "error",
                        title: "Preencha os campos corretamente"
                    });
                }, 500)
            } else {
                salvarProduto();
            }
        });
    }
}

let db;

const request = indexedDB.open("banco-produtos", 1);


request.onupgradeneeded = (event) => {
    db = event.target.result;
    const objectStore = db.createObjectStore("produtos", {
        keyPath: "id",
        autoIncrement: true,
    });

    objectStore.createIndex("nome", "nome", { unique: false });
    objectStore.createIndex("preco", "preco", { unique: false });
    objectStore.createIndex("imagem", "imagem", { unique: false });
    objectStore.createIndex("descricao", "descricao", { unique: false });

    objectStore.transaction.oncomplete = () => {
        const produtosIniciais = [
            { nome: "Motorola Edge 50 Ultra 5G", preco: "5.399,10", imagem: "./img/motorola.png", descricao: "Motorola Edge 50 Ultra 5G O Motorola Edge 50 Ultra 5G é um smartphone topo de linha que combina tecnologia avançada, design elegante e desempenho robusto. Aqui está uma descrição detalhada do aparelho: Design e Construção Elegância e Sofisticação: O Motorola Edge 50 Ultra 5G apresenta um design moderno com bordas curvas e um acabamento premium em vidro e metal. Disponível em várias cores sofisticadas, o dispositivo é tanto bonito quanto ergonômico. Tela Infinita: Equipado com uma tela OLED de 6,8 polegadas, o Edge 50 Ultra oferece uma experiência visual imersiva com cores vibrantes e pretos profundos. A resolução FHD+ (2400 x 1080 pixels) garante nitidez e clareza excepcionais. Desempenho e Tecnologia Processador de Última Geração: Alimentado pelo Snapdragon 8 Gen 2, o Edge 50 Ultra 5G oferece desempenho excepcional em todas as tarefas, desde jogos intensivos até multitarefa sem esforço. Memória e Armazenamento: Com até 12 GB de RAM e opções de armazenamento interno de até 512 GB, o dispositivo proporciona velocidade e capacidade de armazenamento amplas para todos os seus aplicativos, fotos e vídeos. Tecnologia 5G: Compatível com redes 5G, o Edge 50 Ultra oferece velocidades de download e upload extremamente rápidas, permitindo streaming de alta qualidade e navegação sem interrupções. Câmera e Fotografia Sistema de Câmera Tripla: O Motorola Edge 50 Ultra vem com um sistema de câmera tripla, incluindo um sensor principal de 108 MP, uma lente ultra-wide de 16 MP e uma lente telefoto de 8 MP. Essa configuração permite capturar fotos detalhadas e vibrantes em qualquer condição de iluminação. Câmera Frontal: A câmera frontal de 32 MP é perfeita para selfies nítidas e chamadas de vídeo em alta definição. Recursos Avançados: Equipado com recursos de inteligência artificial (IA), como detecção de cena e modo noturno, o Edge 50 Ultra garante que suas fotos fiquem sempre incríveis. Bateria e Carregamento Bateria de Longa Duração: Com uma bateria de 5000 mAh, o dispositivo oferece energia suficiente para um dia inteiro de uso intenso. Carregamento Rápido: Suporta carregamento rápido de 65W, permitindo que você recarregue a bateria rapidamente e volte a usar o aparelho em pouco tempo. Carregamento Sem Fio: Compatível com carregamento sem fio, proporcionando conveniência adicional. Conectividade e Portas Portas e Conexões: Equipado com uma porta USB-C para carregamento e transferência de dados, além de suporte para Bluetooth 5.3 e Wi-Fi 6E, garantindo conexões rápidas e estáveis. Dual SIM: Suporte para dual SIM, permitindo a utilização de duas linhas telefônicas no mesmo aparelho. Funcionalidades Adicionais Sensor de Impressão Digital: Sensor de impressão digital sob a tela para desbloqueio rápido e seguro. Resistência à Água e Poeira: Certificação IP68 para resistência a água e poeira, oferecendo durabilidade adicional. Áudio de Alta Qualidade: Alto-falantes estéreo com tecnologia Dolby Atmos, proporcionando uma experiência sonora imersiva. Software e Segurança Sistema Operacional: Rodando o Android 13, o Edge 50 Ultra oferece uma interface limpa e intuitiva, além de acesso a todos os aplicativos e serviços do Google. Segurança: Inclui atualizações de segurança regulares e recursos de proteção de privacidade para manter seus dados seguros. O Motorola Edge 50 Ultra 5G é a escolha perfeita para quem busca um smartphone com desempenho superior, recursos avançados de fotografia e conectividade de última geração. Seja para uso profissional ou pessoal, este dispositivo oferece uma experiência de usuário excepcional." },
            { nome: "Apple Macbook Air 13 M3 Meia-Noite", preco: "12.499,00", imagem: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba13-midnight-select-202402?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1708367688034", descricao: 'Apple MacBook Air 13" M3 - Cor Meia-Noite O Apple MacBook Air 13" M3 é uma obra-prima de design e engenharia, oferecendo uma combinação perfeita de desempenho, portabilidade e estilo. A seguir, uma descrição detalhada deste modelo em cor Meia-Noite: Design e Construção Elegância e Durabilidade: O MacBook Air 13" M3 na cor Meia-Noite apresenta um acabamento premium, elegante e discreto. Sua construção em alumínio reciclado é robusta, leve e ecologicamente responsável. Perfil Ultra Fino: Com apenas 1,15 kg e uma espessura de 1,13 cm, este laptop é incrivelmente portátil, ideal para profissionais em movimento e estudantes. Tela Retina de 13,6 polegadas: A tela Liquid Retina oferece resolução nítida e cores vibrantes, suportando tecnologia True Tone para ajustes automáticos de brilho e temperatura de cor. Desempenho e Tecnologia Chip M3: Equipado com o revolucionário chip M3 da Apple, o MacBook Air oferece desempenho excepcional e eficiência energética. Este processador de última geração combina CPU, GPU e Neural Engine para tarefas intensivas e aprendizado de máquina. Memória e Armazenamento: Disponível com até 16 GB de memória unificada e opções de armazenamento SSD de até 2 TB, garantindo velocidades de leitura e gravação rápidas para multitarefa e grandes volumes de dados. Resfriamento Silencioso: Sem ventiladores, o MacBook Air M3 opera silenciosamente mesmo sob cargas de trabalho intensas, graças à eficiência térmica do chip M3. Bateria e Autonomia Bateria de Longa Duração: Oferece até 18 horas de autonomia com uma única carga, permitindo um dia inteiro de trabalho, estudo ou entretenimento sem precisar de uma tomada. Carregamento Rápido: Através da porta MagSafe 3, o carregamento rápido garante que você volte rapidamente à sua produtividade. Conectividade e Portas Portas Versáteis: Equipado com duas portas Thunderbolt/USB 4, uma porta MagSafe 3 para carregamento e um conector de fone de ouvido de 3,5 mm, permitindo conexões rápidas e seguras com dispositivos periféricos. Wi-Fi 6E: Conectividade sem fio avançada para maior velocidade e desempenho em redes congestionadas. Bluetooth 5.2: Para conexão estável com acessórios sem fio como fones de ouvido e teclados. Funcionalidades Adicionais Teclado Magic Keyboard: Teclado retroiluminado com mecanismo de tesoura, proporcionando uma experiência de digitação confortável e precisa. Inclui Touch ID para login seguro e pagamentos via Apple Pay. Trackpad Force Touch: Grande e responsivo, oferece controle preciso e gestos multi-touch. Câmera FaceTime HD 1080p: Melhoria na qualidade de vídeo para chamadas mais nítidas, combinada com um conjunto de microfones com qualidade de estúdio para áudio claro. Software e Segurança macOS: Vem com o sistema operacional macOS Ventura, que oferece uma experiência de usuário refinada, integrações com o ecossistema Apple e uma vasta gama de aplicativos produtivos e criativos. Privacidade e Segurança: Integra recursos avançados de segurança, como o Secure Enclave no chip M3, garantindo que seus dados e informações pessoais estejam sempre protegidos. O Apple MacBook Air 13" M3 na cor Meia-Noite é uma escolha ideal para quem busca um laptop que combine design sofisticado com desempenho de ponta. Seja para trabalho, estudo ou uso diário, este dispositivo oferece a qualidade e a inovação que só a Apple pode proporcionar.' },
            { nome: "Apple AirPods Max - azul-céu", preco: "6.590,00", imagem: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-skyblue-202011?wid=940&hei=1112&fmt=png-alpha&.v=1604022365000", descricao: "Os Apple AirPods Max em azul-céu representam a mais recente inovação em tecnologia de áudio da Apple, oferecendo uma experiência auditiva de alta fidelidade com um design sofisticado e confortável. A seguir estão as principais características deste modelo: Design e Conforto Construção Premium: Os AirPods Max possuem uma estrutura de aço inoxidável e uma tiara de malha respirável, proporcionando durabilidade e conforto. Ajuste Personalizado: As almofadas auriculares de espuma viscoelástica criam uma vedação perfeita para um ajuste confortável e isolamento acústico eficaz. Estética Elegante: A cor azul-céu oferece um visual moderno e atraente, combinando com o estilo refinado dos produtos Apple. Qualidade de Som Áudio de Alta Fidelidade: Equipados com drivers dinâmicos projetados pela Apple, os AirPods Max entregam som de alta fidelidade com distorção ultrabaixa em todo o espectro audível. Cancelamento Ativo de Ruído: A tecnologia de cancelamento ativo de ruído utiliza seis microfones voltados para fora e dois microfones voltados para dentro para detectar e cancelar o ruído externo, proporcionando uma experiência auditiva imersiva. Modo Transparência: Permite que você ouça e interaja com o mundo ao seu redor enquanto ainda desfruta da sua música, permitindo que o som externo passe pelos fones. Tecnologia e Funcionalidades Áudio Espacial: Utiliza giroscópios e acelerômetros para rastrear o movimento da sua cabeça e criar uma experiência sonora tridimensional, ideal para assistir filmes e programas de TV. Equalização Adaptativa: Ajusta automaticamente as frequências baixas e médias da música conforme a forma dos seus ouvidos, proporcionando um som personalizado. Chip H1 da Apple: O chip H1 presente em cada lado dos AirPods Max garante uma conexão sem fio rápida e estável e facilita o pareamento com dispositivos Apple. Bateria e Carregamento Autonomia: Oferece até 20 horas de reprodução de áudio, tempo de conversa ou reprodução de filmes com cancelamento ativo de ruído e áudio espacial habilitados. Carregamento Rápido: Com uma carga rápida de 5 minutos, você obtém aproximadamente 1,5 horas de uso. Smart Case: Acompanha uma case inteligente que coloca os AirPods Max em um estado de consumo de energia ultrabaixo para preservar a carga da bateria quando não estão em uso. Conectividade Compatibilidade Ampla: Facilmente conectável a dispositivos Apple, incluindo iPhone, iPad, Mac e Apple Watch, utilizando o chip H1 para um pareamento rápido e eficiente. Controles Integrados: Possui controles físicos intuitivos na parte superior do fone de ouvido direito para ajustar o volume, trocar de música, atender chamadas e ativar a Siri. Os Apple AirPods Max em azul-céu são ideais para aqueles que buscam uma combinação de design sofisticado, conforto excepcional e som de alta fidelidade, oferecendo uma experiência auditiva incomparável em qualquer lugar." },
            { nome: "Apple Watch Series 9", preco: "9.545,00", imagem: "https://www.fastshop.com.br//wcsstore/FastShopCAS/images/catalog/3005598118_PRD/3005598118_PRD_1500_1.jpeg", descricao: "O Apple Watch Series 9 é a mais recente adição à linha de smartwatches da Apple, combinando inovação tecnológica com um design elegante. Este modelo aprimora a funcionalidade e a experiência do usuário com novos recursos e melhorias. A seguir, uma descrição detalhada do Apple Watch Series 9: Design e Construção Materiais Premium: Disponível em alumínio reciclado, aço inoxidável e titânio, o Apple Watch Series 9 oferece durabilidade e um acabamento de alta qualidade. Tamanhos e Cores: Vem em tamanhos de 41 mm e 45 mm, com uma variedade de cores e opções de pulseiras, permitindo uma personalização total. Display Always-On: O display Retina sempre ativo é mais brilhante e eficiente, proporcionando uma melhor visibilidade sob luz solar direta. Funcionalidades de Saúde e Bem-Estar Monitoramento de Saúde: Inclui sensores avançados para monitorar frequência cardíaca, níveis de oxigênio no sangue (SpO2), ECG, sono e muito mais. Detecção de Queda: Equipado com um acelerômetro e giroscópio aprimorados, o Apple Watch Series 9 pode detectar quedas graves e automaticamente ligar para os serviços de emergência. Mindfulness e Respirar: Novos aplicativos e funcionalidades para ajudar na redução do estresse e melhorar o bem-estar mental. Desempenho e Tecnologia Processador S9: O chip S9 oferece um desempenho mais rápido e eficiente, melhorando a resposta do dispositivo e prolongando a duração da bateria. watchOS 10: A última versão do sistema operacional da Apple para smartwatches, com novas interfaces de usuário, aplicativos e recursos. Siri Melhorada: Integração mais profunda com Siri, permitindo comandos de voz mais rápidos e precisos. Conectividade e Funcionalidades Inteligentes Conectividade Celular: Modelos com suporte a LTE permitem fazer e receber chamadas, enviar mensagens e usar aplicativos sem a necessidade de um iPhone por perto. Aplicativos e Widgets: Acesso a uma vasta gama de aplicativos através da App Store e widgets para personalizar a experiência do usuário. Apple Pay: Pagamentos sem contato diretamente do seu pulso, com segurança e conveniência. Fitness e Atividade Rastreamento de Atividades: Monitoramento detalhado de diferentes tipos de exercícios, incluindo corrida, ciclismo, natação e muito mais. Treinador Pessoal: Funcionalidades como metas de atividade, desafios mensais e orientação em tempo real para manter você motivado e em forma. Conectividade com Equipamentos de Academia: Compatível com diversos equipamentos de academia para uma experiência de treino integrada. Autonomia e Carregamento Bateria de Longa Duração: Oferece até 18 horas de uso com uma única carga, suportando um dia inteiro de atividades. Carregamento Rápido: A função de carregamento rápido permite carregar até 80% da bateria em cerca de 45 minutos. Segurança e Privacidade Dados Seguros: A Apple prioriza a segurança e a privacidade, com criptografia ponta a ponta para dados de saúde e um sistema operacional seguro. O Apple Watch Series 9 é o companheiro perfeito para quem busca melhorar sua saúde, fitness e conectividade, com uma gama de funcionalidades inteligentes e um design que se adapta a qualquer estilo." }
        ];

        const transaction = db.transaction(["produtos"], "readwrite");
        const objectStore = transaction.objectStore("produtos");
        produtosIniciais.forEach((produto) => {
            objectStore.add(produto);
        });
    };
};

request.onsuccess = (event) => {
    db = event.target.result;
    carregarProdutos();
    carregarProdutosIndex();
};

// -------------cadastro------------

const inputFile = document.getElementById("file-input");
const nome = document.getElementById("nome");
const preco = document.getElementById("preco");
const image = document.getElementById("image");
const loader = document.querySelector(".loader");
const submit = document.querySelector(".submit")

if (image) {
    const defaultImageURL = "https://camo.githubusercontent.com/70937ab1109ce0ebdfc41538a3064ae7ee51592867f08e4ce5c4b4a920f3fc20/68747470733a2f2f7a7562652e696f2f66696c65732f706f722d756d612d626f612d63617573612f33363664616462316461323032353338616531333332396261333464393030362d696d6167652e706e67";

    if (!image.getAttribute("src")) {
        image.setAttribute("src", defaultImageURL);
    }
}

if (inputFile) {
    inputFile.addEventListener("change", (event) => {
        const nomeFile = document.querySelector('.file-name');
        if (inputFile.files.length > 0) {
            nomeFile.textContent = inputFile.files[0].name;
            console.log(inputFile.files[0].name)
        } else {
            nomeFile.textContent = 'Nenhum arquivo escolhido';
        }
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            image.src = reader.result;
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    });
}

function salvarProduto() {
    const textoNome = nome.value;
    const textoPreco = preco.value;
    const srcImg = image.src;

    function verificarExistencia() {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(["produtos"], "readonly");
            const objectStore = transaction.objectStore("produtos");

            const requestNome = objectStore.index("nome").get(textoNome);
            const requestImagem = objectStore.index("imagem").get(srcImg);

            let nomeExistente = false;
            let imagemExistente = false;

            requestNome.onsuccess = () => {
                if (requestNome.result) {
                    nomeExistente = true;
                }
                checkCompletion();
            };

            requestImagem.onsuccess = () => {
                if (requestImagem.result) {
                    imagemExistente = true;
                }
                checkCompletion();
            };

            requestNome.onerror = requestImagem.onerror = (event) => {
                reject(event);
            };

            function checkCompletion() {
                if (requestNome.readyState === "done" && requestImagem.readyState === "done") {
                    if (nomeExistente || imagemExistente) {
                        reject({ nomeExistente, imagemExistente });
                    } else {
                        resolve();
                    }
                }
            }
        });
    }
    verificarExistencia().then(() => {
        const transaction = db.transaction(["produtos"], "readwrite");
        const objectStore = transaction.objectStore("produtos");

        const request = objectStore.add({
            nome: textoNome,
            preco: textoPreco,
            imagem: srcImg,
            descricao: textarea.value
        });

        request.onsuccess = () => {
            carregarProdutos();
            loader.style.display = 'flex';
            submit.value = ''
            setTimeout(() => {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: "Anúncio Cadastrado com Sucesso"
                }).then(() => {
                    window.location.href = './produtos.html';
                })
                loader.style.display = 'none';
                submit.value = 'Cadastrar Anúncio'
            }, 700)
        };

        request.onerror = () => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Erro ao cadastrar o produto!",
            });
        };
    }).catch((existente) => {
        if (existente.nomeExistente || existente.imagemExistente) {
            loader.style.display = 'flex';
            submit.value = ''
            setTimeout(() => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: 'Esse produto já esta cadastrado',

                });
                loader.style.display = 'none';
                submit.value = 'Cadastrar Anúncio'
            }, 500);
        }
    });
}


// --------------------produtos-------------

function carregarProdutos() {
    const transacao = db.transaction(["produtos"], "readonly");
    const objectStore = transacao.objectStore("produtos");
    const request = objectStore.getAll();

    request.onsuccess = (event) => {
        if (ul) {
            ul.innerHTML = "";
            const produtos = event.target.result;

            if (produtos.length == 0) {
                let main = document.querySelector('.main')
                let p = document.createElement('h1')
                p.innerText = 'Nenhum anúncio cadastrado...'
                p.classList = 'sem_anuncio'
                main.appendChild(p)
                ul.style.marginBlock = '5rem'
            }
            if (produtos.length > 0) {
                produtos.forEach((produto) => {
                    let card = document.createElement("div");
                    card.classList.add('card');
                    let img = document.createElement("img");
                    img.classList.add('img');
                    let text = document.createElement("p");
                    text.classList.add('titulo');
                    let price = document.createElement("p");
                    price.classList.add('valor');

                    img.src = produto.imagem;
                    text.textContent = produto.nome;
                    price.textContent = `R$ ${produto.preco}`;

                    let butonDetalhe = document.createElement('button');
                    butonDetalhe.classList.add('buton_detalhe');

                    let p_det = document.createElement('p');
                    p_det.innerText = '+ Detalhes';
                    butonDetalhe.appendChild(p_det);

                    card.appendChild(img);
                    card.appendChild(text);
                    card.appendChild(price);
                    card.appendChild(butonDetalhe);
                    card.onclick = () => detalheProduto(produto)
                    ul.appendChild(card);
                });
            }
        }
    };
}


function carregarProdutosIndex() {
    const destaques = document.querySelector('.destaques')
    const transacao = db.transaction(["produtos"], "readonly");
    const objectStore = transacao.objectStore("produtos");
    const request = objectStore.getAll();
    request.onsuccess = (event) => {


        if (destaques) {
            destaques.innerHTML = "";
            const produtos = event.target.result;

            if (produtos.length == 0) {
                let p = document.createElement('h1')
                p.innerText = 'Nenhum anúncio cadastrado...'
                destaques.appendChild(p)
            }


            if (produtos.length > 0) {
                produtos.slice(-3).forEach((produto) => {
                    let card = document.createElement("div");
                    card.classList.add("card");
                    let img = document.createElement("img");
                    img.classList.add("img");
                    let text = document.createElement("p");
                    text.classList.add("titulo");
                    let price = document.createElement("p");
                    price.classList.add("valor");

                    img.src = produto.imagem;
                    text.textContent = produto.nome;
                    price.textContent = `R$ ${produto.preco}`;

                    let butonDetalhe = document.createElement("button");
                    butonDetalhe.classList.add("buton_detalhe");

                    let p_det = document.createElement("p");
                    p_det.innerText = "+ Detalhes";
                    butonDetalhe.appendChild(p_det);

                    card.appendChild(img);
                    card.appendChild(text);
                    card.appendChild(price);
                    card.appendChild(butonDetalhe);
                    card.onclick = () => detalheProduto(produto);

                    destaques.appendChild(card);
                });
            }
        }
    };

    if (ul || destaques) {
        localStorage.atualizar = false
    }
}



function detalheProduto(produto) {
    localStorage.setItem('produtoDetalhe', JSON.stringify(produto));
    window.location.href = './detalhes.html'
}

// ---------------detalhes---------------
const produto = JSON.parse(localStorage.getItem('produtoDetalhe'));


let descricao = document.querySelector('.descricao')
if (descricao) {

    function converterPreco(precoFormatado) {
        return Number(precoFormatado.replace(/\./g, '').replace(',', '.'));
    }

    let verMais = document.querySelector('.verMais')

    document.querySelector('.nome_produto').innerText = produto.nome;
    document.querySelector('.valor').innerText = `R$ ${produto.preco}`;
    document.querySelector('.img_produto_detalhe').src = produto.imagem;

    if (produto.descricao.substring().length > 1080) {
        document.querySelector('.descricao_content').innerHTML = produto.descricao.substring(0, 1000);
    } else {
        verMais.style.display = 'none'
        descricao.classList.add('none')
        document.querySelector('.descricao_content').innerHTML = produto.descricao;
    }

    produto.preco = converterPreco(produto.preco);

    let valorSemFormatar = (produto.preco / 11) * 1.11;

    function formatarMoeda(numero) {
        let numeroFormatado = numero.toFixed(2).replace('.', ',');
        numeroFormatado = numeroFormatado.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return numeroFormatado;
    }

    document.querySelector('.cartao').innerText = `R$ ${formatarMoeda(valorSemFormatar)}`
    document.querySelector('.valor_prazo').innerText = `R$ ${formatarMoeda(valorSemFormatar * 11)}`
    document.querySelector('.valor_riscado').innerText = ` R$ ${formatarMoeda(produto.preco * 1.25)}`

    document.getElementById('incrementar').addEventListener('click', function () {
        let quantidade = document.getElementById('quantidade');
        quantidade.value = parseInt(quantidade.value) + 1;
    });

    document.getElementById('decrementar').addEventListener('click', function () {
        let quantidade = document.getElementById('quantidade');
        if (parseInt(quantidade.value) > 1) {
            quantidade.value = parseInt(quantidade.value) - 1;
        }
    });

    verMais.onclick = () => {
        document.querySelector('.descricao_content').innerHTML = produto.descricao;
        descricao.classList.add('none')
        verMais.style.display = 'none'
    }

    if (window.matchMedia("(max-width: 600px)").matches) {
        if (produto.descricao.substring().length >= 200) {
            document.querySelector('.descricao_content').innerHTML = produto.descricao.substring(0, 200);
            verMais.style.display = 'flex'
        } else {
            descricao.classList.add('none')
            document.querySelector('.descricao_content').innerHTML = produto.descricao;
        }
    }

    function scrollDet() {
        if (descricao) {
            let buton = document.querySelector('.button_initial')
            if (scrollY >= 1141 && buton) {
                buton.style.display = 'flex'
            } else {
                buton.style.display = 'none'
            }
        }
    }

    let buy = document.querySelector('.comprar')

    buy.onclick = () => {
        loader.style.display = 'flex';
        buy.childNodes[1].textContent = ''
        setTimeout(() => {
            loader.style.display = 'none';
            buy.childNodes[1].textContent = 'Comprar'
        }, 1000);

    }
}

function deletarProduto(id) {
    const transaction = db.transaction(["produtos"], "readwrite");
    const objectStore = transaction.objectStore("produtos");
    const request = objectStore.delete(id);

    request.onsuccess = () => {
        carregarProdutos();
    };
}

function menuOptions() {
    const menu = document.getElementById('optionsMenu');

    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
}

function deletaProduto() {
    Swal.fire({
        title: "Você deseja mesmo deletar esse anúncio? ",
        text: "Essa ação não poderá ser desfeita!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, deletar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                title: "Seu anúncio foi deletado!.",
                icon: "success",
            }).then(() => {
                const transacao = db.transaction(["produtos"], "readonly");
                const objectStore = transacao.objectStore("produtos");
                const request = objectStore.getAll();

                request.onsuccess = (event) => {
                    const produtos = event.target.result;
                    let produtosJSONParse = JSON.parse(localStorage.produtoDetalhe)

                    if (produtos.length > 0) {
                        produtos.forEach((produto) => {
                            if (produtosJSONParse.id == produto.id) {
                                deletarProduto(produto.id)
                            }
                        });
                    }
                };
                window.location.href = './produtos.html'
            })
        }
    });
}


window.onclick = function (event) {
    if (!event.target.matches('.icone_img')) {
        const menu = document.getElementById('optionsMenu');
        if (menu) {
            if (menu.style.display === 'block') {
                menu.style.display = 'none';
            }
        }
    }
}

function atualizarProduto() {
    window.location.href = `./cad_anuncio.html?editar`;
    localStorage.atualizar = true
}

const params = new URLSearchParams(window.location.search);

if (params.has('editar')) {
    if (localStorage.atualizar == 'true') {
        const produto = JSON.parse(localStorage.getItem('produtoDetalhe'));
        let cd = document.querySelector('.cd')
        if (submit) submit.value = 'Editar Anúncio'
        cd.textContent = 'Editar Anúncio'

        nome.value = produto.nome;
        preco.value = produto.preco;
        image.src = produto.imagem;
        textarea.value = produto.descricao;

        // const nomeFile = document.querySelector('.file-name');

        // nomeFile.textContent = '...'

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            let precoRegex = /^\d+(?:[\.,]\d{1,2})?/;
            if (nome.value == '' || preco.value == '' || !precoRegex.test(preco.value) || textarea.value == '') {
                loader.style.display = 'flex';
                submit.value = ''
                setTimeout(() => {
                    loader.style.display = 'none';
                    submit.value = 'Editar Anúncio'
                }, 500);
                setTimeout(() => {
                    Swal.fire({
                        icon: "error",
                        title: "Preencha os campos corretamente"
                    });
                }, 500)
            } else {
                const transacao = db.transaction(["produtos"], "readonly");
                const objectStore = transacao.objectStore("produtos");
                const request = objectStore.getAll();
                request.onsuccess = (event) => {
                    const produtos = event.target.result;
                    let idJson = JSON.parse(localStorage.getItem('produtoDetalhe'))
                    produtos.forEach((produto) => {
                        if (produto.id == idJson.id) {
                            produto.nome = nome.value;
                            produto.preco = preco.value;
                            produto.imagem = image.src;
                            produto.descricao = textarea.value;
                            const transacao = db.transaction(["produtos"], "readwrite");
                            const objectStore = transacao.objectStore("produtos");
                            const request = objectStore.put(produto);
                            request.onsuccess = () => {
                                loader.style.display = 'flex';
                                submit.value = ''
                                setTimeout(() => {
                                    const Toast = Swal.mixin({
                                        toast: true,
                                        position: "top-end",
                                        showConfirmButton: false,
                                        timer: 1500,
                                        timerProgressBar: true,
                                        didOpen: (toast) => {
                                            toast.onmouseenter = Swal.stopTimer;
                                            toast.onmouseleave = Swal.resumeTimer;
                                        }
                                    });
                                    Toast.fire({
                                        icon: "success",
                                        title: "Anúncio Editado com Sucesso"
                                    }).then(() => {
                                        window.location.href = './produtos.html';
                                    })
                                    loader.style.display = 'none';
                                    submit.value = 'Editar Anúncio'
                                }, 700)
                            }
                        }
                    })
                }
            }
        });
    }
}



// ---------------find--------------

let search = document.querySelector(".search");
let campo = document.createElement('input')
let aside = document.createElement('aside')
let nav = document.querySelector(".links");
let drop = document.querySelector(".dropMenu");

campo.type = 'text'

let list = document.createElement('ul')
list.classList.add('ul_search')

let listagem = document.createElement('div')
listagem.classList.add('listagem')


aside.classList.add('grupo_top')
campo.classList.add('campo_find');

aside.appendChild(search)
nav.appendChild(aside)

search.onclick = () => {
    campo.classList.toggle('blocke');
    nav.appendChild(aside);
    aside.appendChild(campo)
    campo.addEventListener('input', debounce(function () {
        const termoBusca = this.value.trim();
        list.innerHTML = '';
        drop.appendChild(listagem);
        if (termoBusca) {
            buscarProdutos(termoBusca, function (resultados) {
                resultados.forEach(function (produto) {

                    let li = document.createElement('li');
                    li.classList.add('products');
                    li.textContent = produto.nome;
                    li.onclick = () => {
                        detalheProduto(produto)
                    }
                    list.appendChild(li);
                    listagem.appendChild(list)
                    nav.appendChild(listagem)
                });
            });
        }
    }, 300));
};

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

function buscarProdutos(termoBusca, callback) {
    const transaction = db.transaction(['produtos'], 'readonly');
    const objectStore = transaction.objectStore('produtos');
    const index = objectStore.index('nome');

    const request = index.openCursor();
    const resultados = [];

    request.onsuccess = function (event) {
        const cursor = event.target.result;
        if (cursor) {
            if (cursor.value.nome.toLowerCase().includes(termoBusca.toLowerCase())) {
                resultados.push(cursor.value);
            }
            cursor.continue();
        } else {
            callback(resultados);
        }
    };

    request.onerror = function (event) {
        console.error('Erro ao buscar produtos:', event.target.error);
    };
}



if (window.matchMedia("(max-width: 600px)").matches) {
    drop.appendChild(search)
    drop.appendChild(campo)
    search.onclick = () => {
        campo.classList.toggle('blocke');
        drop.appendChild(campo)
        campo.addEventListener('input', debounce(function () {
            const termoBusca = this.value.trim();
            list.innerHTML = '';
            drop.appendChild(listagem);
            if (termoBusca) {
                buscarProdutos(termoBusca, function (resultados) {
                    resultados.forEach(function (produto) {

                        let li = document.createElement('li');
                        li.classList.add('products');
                        li.textContent = produto.nome;
                        li.onclick = () => {
                            detalheProduto(produto)
                        }
                        list.appendChild(li);
                        listagem.appendChild(list)
                        drop.appendChild(listagem)
                    });
                });
            }
        }, 300));
    };
}
function scroll() {
    if (scrollY > 0) {
        nav.classList.add("style_nav");
        drop.classList.add("style_nav");
    } else {
        nav.classList.remove("style_nav");
        drop.classList.remove("style_nav");
    }
}
