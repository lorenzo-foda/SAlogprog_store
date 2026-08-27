let carrinho = [];
let descontoAtual = 0;

let tenis1 = {
    id: 1,
    nome: "tenis 1",
    preco: 200.00,
    quantidade: 1
};

let tenis2 = {
    id: 2,
    nome: "tenis 2",
    preco: 220.00,
    quantidade: 1
}

let tenis3 = {
    id: 3,
    nome: "tenis 3",
    preco: 301.00,
    quantidade: 1
}

function atualizarCarrinho() {

    const divCarrinho = document.getElementById("carrinho");

    divCarrinho.innerHTML = "";

    let subtotal = 0;

    carrinho.forEach(produto => {

        const valorProduto = produto.preco * produto.quantidade;

        subtotal += valorProduto;

        const div = document.createElement("div");

        div.innerHTML = `
            <p>
                ${produto.nome} -
                R$ ${produto.preco.toFixed(2)}
                x ${produto.quantidade}

                <button onclick="alterarQuantidade(${produto.id}, 1)">
                    +
                </button>

                <button onclick="alterarQuantidade(${produto.id}, -1)">
                    -
                </button>

                <button onclick="removerProduto(${produto.id})">
                    Excluir
                </button>
            </p>
        `;

        divCarrinho.appendChild(div);
    });

    const valorDesconto = subtotal * descontoAtual;
    const total = subtotal - valorDesconto;

    document.getElementById("subtotal").innerText =
        `Subtotal: R$ ${subtotal.toFixed(2)}`;

    document.getElementById("desconto").innerText =
        `Desconto: R$ ${valorDesconto.toFixed(2)}`;

    document.getElementById("total").innerText =
        `Total: R$ ${total.toFixed(2)}`;
}

function adicionarProduto(produto) {
    const item = carrinho.find(p => p.id === produto.id);

    if (item) {
        item.quantidade++;
    } else {
        carrinho.push({
            ...produto,
            quantidade: 1
        });
    }
    atualizarCarrinho();
}



function removerProduto(id) {
    carrinho = carrinho.filter(produto => produto.id !== id);

    atualizarCarrinho();
}



function alterarQuantidade(id, quantidade) {
    const produto = carrinho.find(p => p.id === id);

    if (!produto) return;

    produto.quantidade += quantidade;

    if (produto.quantidade <= 0) {
        removerProduto(id);
    }

    atualizarCarrinho();
}


function calcularSubtotal() {
    return carrinho.reduce(
        (total, produto) =>
            total + produto.preco * produto.quantidade,
        0
    );
}

const cupons = {
    "TENIS10": 0.10,
    "TENIS90": 0.90,
    "CHINELO10": 0.10
};

function aplicarCupom(codigo) {
    const desconto = cupons[codigo.toUpperCase()];

    if (!desconto) {
        return "Cupom inválido";
    }

    const subtotal = calcularSubtotal();
    const valorDesconto = subtotal * desconto;
    const total = subtotal - valorDesconto;

    return {
        desconto: valorDesconto,
        total: total
    };
}

function aplicarCupom() {

    const input = document.getElementById("codigoCupom");

    const codigo = input.value.toUpperCase();

    const desconto = cupons[codigo];

    if (desconto === undefined) {

        descontoAtual = 0;

        document.getElementById("mensagemCupom").innerText =
            "Cupom inválido.";

        atualizarCarrinho();

        return;
    }

    descontoAtual = desconto;

    document.getElementById("mensagemCupom").innerText =
        `Cupom aplicado! ${desconto * 100}% de desconto.`;

    atualizarCarrinho();
}
