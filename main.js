function addCart(id, nome, preco) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    const produtoSistema = carrinho.find(produto => produto.id === id);

    if (produtoSistema) {
        produtoSistema.quantidade++;
    } else {
        carrinho.push({
            id: id,
            nome: nome,
            preco: preco,
            quantidade: 1
        });
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    alert(`${nome} foi adicionado ao carrinho. id: ${id}`);
}

