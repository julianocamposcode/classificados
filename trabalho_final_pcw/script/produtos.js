let form = document.getElementById("dataForm");
let ul = document.getElementById("imageList");
let center = document.querySelector(".center");

if (form) {

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        saveProduct();
    });
}

let db;

// Abrir (ou criar) o banco de dados
const request = indexedDB.open("productDB", 1);

request.onupgradeneeded = (event) => {
    db = event.target.result;
    // Cria um objeto de armazenamento para produtos
    const objectStore = db.createObjectStore("products", {
        keyPath: "id",
        autoIncrement: true,
    });
    objectStore.createIndex("textData", "textData", { unique: false });
    objectStore.createIndex("priceData", "priceData", { unique: false });
    objectStore.createIndex("imageData", "imageData", { unique: false });
};

request.onsuccess = (event) => {
    db = event.target.result;
    loadProducts();
};

request.onerror = (event) => {
    console.error("Erro ao abrir o IndexedDB", event);
};

const fileInput = document.getElementById("file-input");
const textInput = document.getElementById("textInput");
const priceInput = document.getElementById("priceInput");
const image = document.getElementById("image");

if (image) {

    const defaultImageURL = "https://camo.githubusercontent.com/70937ab1109ce0ebdfc41538a3064ae7ee51592867f08e4ce5c4b4a920f3fc20/68747470733a2f2f7a7562652e696f2f66696c65732f706f722d756d612d626f612d63617573612f33363664616462316461323032353338616531333332396261333464393030362d696d6167652e706e67";

    if (!image.getAttribute("src")) {
        image.setAttribute("src", defaultImageURL);
    }
}

if (fileInput) {

    fileInput.addEventListener("change", (event) => {
        const fileName = document.querySelector('.file-name');

        if (fileInput.files.length > 0) {
            fileName.textContent = fileInput.files[0].name;
        } else {
            fileName.textContent = 'Nenhum arquivo escolhido';
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

function saveProduct() {
    const textData = textInput.value;
    const priceData = priceInput.value;
    const imageData = image.src;

    const transaction = db.transaction(["products"], "readwrite");
    const objectStore = transaction.objectStore("products");
    const request = objectStore.add({
        textData: textData,
        priceData: priceData,
        imageData: imageData,
    });

    request.onsuccess = () => {
        loadProducts(); // Carregar os produtos novamente após salvar
        window.location.href = './produtos.html'
    };

    request.onerror = (event) => {
        console.error("Erro ao salvar o produto no IndexedDB", event);
    };
}

function loadProducts() {
    const transaction = db.transaction(["products"], "readonly");
    const objectStore = transaction.objectStore("products");
    const request = objectStore.getAll();

    request.onsuccess = (event) => {
        if (ul) {
            ul.innerHTML = ""; // Limpa a lista antes de adicionar os itens
        }
        const products = event.target.result;
        if (products.length > 0) {
            products.forEach((item) => {
                let card = document.createElement("div")
                card.classList.add('card');
                let img = document.createElement("img");
                img.classList.add('img')
                let text = document.createElement("p");
                text.classList.add('titulo')
                let price = document.createElement("p");
                price.classList.add('valor')

                img.src = item.imageData;
                text.textContent = item.textData;
                price.textContent = `Preço: R$ ${item.priceData}`;

                let deleteButton = document.createElement("img");
                deleteButton.classList.add('option')
                deleteButton.src = '../img/option.png';
                deleteButton.onclick = () => deleteProduct(item.id);

                card.appendChild(img);
                card.appendChild(text);
                card.appendChild(price);
                card.appendChild(deleteButton);
                ul.appendChild(card);
            });
        }
    };

    request.onerror = (event) => {
        console.error("Erro ao carregar os produtos do IndexedDB", event);
    };
}

function deleteProduct(id) {
    const transaction = db.transaction(["products"], "readwrite");
    const objectStore = transaction.objectStore("products");
    const request = objectStore.delete(id);

    request.onsuccess = () => {
        loadProducts(); // Carregar os produtos novamente após excluir
    };

    request.onerror = (event) => {
        console.error("Erro ao excluir o produto do IndexedDB", event);
    };
}

// Carregar os produtos ao iniciar a página
window.onload = loadProducts;
