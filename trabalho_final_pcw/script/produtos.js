let form = document.getElementById("dataForm");
let ul = document.getElementById("imageList");
let center = document.querySelector(".center");

if (form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        let precoRegex = /^\d+(?:[\.,]\d{1,2})?/;
        if (nome.value == '' || preco.value == '' || !precoRegex.test(preco.value) || !inputFile.files.length > 0) {
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

    objectStore.transaction.oncomplete = () => {
        const produtosIniciais = [
            { nome: "Motorola Edge 50 Ultra 5G", preco: "5.399,10", imagem: "https://brmotorolanew.vtexassets.com/arquivos/ids/167748/frente-traseira-smartphone-motorola-edge-50-ultra-wood.png?v=638519142582370000" },
            { nome: "Apple Macbook Air 13 M3 Meia-Noite", preco: "12.499,00", imagem: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba13-midnight-select-202402?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1708367688034" },
            { nome: "Apple AirPods Max - azul-céu", preco: "6.590,00", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRharKPbMnXFiGzmdwKFTq9ZSan-h2cn8mKw&s" },
            { nome: "Apple Watch Series 9", preco: "9.545,00", imagem: "data:image/jpeg;base64,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" }
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
};

request.onerror = (event) => {
    console.error("Erro ao abrir o IndexedDB", event);
};


// -------------cadastro------------

const inputFile = document.getElementById("file-input");
const nome = document.getElementById("nome");
const preco = document.getElementById("preco");
const image = document.getElementById("image");
const loader = document.querySelector(".loader");
const submit = document.querySelector(".submit");


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

    verificarExistencia()
        .then(() => {
            const transaction = db.transaction(["produtos"], "readwrite");
            const objectStore = transaction.objectStore("produtos");

            const request = objectStore.add({
                nome: textoNome,
                preco: textoPreco,
                imagem: srcImg,
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
                        timer: 2500,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });
                    Toast.fire({
                        icon: "success",
                        title: "Anúncio Cadastrado com Sucesso"
                    });


                    loader.style.display = 'none';
                    submit.value = 'Cadastrar Anúncio'

                    setTimeout(() => {
                        window.location.href = './produtos.html';
                    }, 2500)
                }, 700)
            };

            request.onerror = () => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Erro ao cadastrar o produto!",
                });
            };
        })
        .catch((existente) => {
            if (existente.nomeExistente || existente.imagemExistente) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: 'Esse produto já esta cadastrado',
                });
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

                    let deleteButton = document.createElement("button");
                    deleteButton.classList.add('option');
                    deleteButton.innerHTML = '🗑️';
                    deleteButton.onclick = () => deletaProduto(produto.id);

                    let butonDetalhe = document.createElement('button');
                    butonDetalhe.classList.add('buton_detalhe');

                    let p_det = document.createElement('p');
                    p_det.innerText = '+ Detalhes';
                    butonDetalhe.appendChild(p_det);

                    card.appendChild(img);
                    card.appendChild(text);
                    card.appendChild(price);
                    card.appendChild(butonDetalhe);
                    // card.appendChild(deleteButton);
                    ul.appendChild(card);
                });
            }
        }
    };

    request.onerror = (event) => {
        console.error("Erro ao carregar os produtos do IndexedDB", event);
    };
}

function deletaProduto(id) {
    const transaction = db.transaction(["produtos"], "readwrite");
    const objectStore = transaction.objectStore("produtos");
    const request = objectStore.delete(id);

    request.onsuccess = () => {
        carregarProdutos();
    };

    request.onerror = (event) => {
        console.error("Erro ao excluir o produto do IndexedDB", event);
    };
}

window.onload = carregarProdutos