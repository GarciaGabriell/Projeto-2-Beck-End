const { Purchase, Ticket } = require('../models');

exports.showSalesPage = (req, res) => {
  const prices = {
    VIP: 150, 
    Normal: 50  
  };

  res.render('vendas', { prices });
};

// Função para confirmar a compra
exports.createPurchase = async (req, res) => {
  const { vip, normal } = req.body;  

  if (!vip && !normal) {
    return res.status(400).json({ message: 'Você não selecionou nenhum ingresso para a compra.' });
  }

  try {
    const purchase = await Purchase.create({ usuarioId: req.user.id, status: 'pendente' });

    // Se houver ingressos VIP
    if (vip > 0) {
      const ticketVIP = await Ticket.findOne({ where: { nome: 'VIP' } }); 
      const totalPriceVIP = ticketVIP.preco * vip;

      if (ticketVIP.quantidadeDisponivel < vip) {
        return res.status(400).json({ message: 'Desculpe, não há estoque suficiente para ingressos VIP.' });
      }

      await purchase.addTicket(ticketVIP, { through: { quantidade: vip } });
      await ticketVIP.update({ quantidadeDisponivel: ticketVIP.quantidadeDisponivel - vip });
    }

    // Se houver ingressos Normais
    if (normal > 0) {
      const ticketNormal = await Ticket.findOne({ where: { nome: 'Normal' } }); 
      const totalPriceNormal = ticketNormal.preco * normal;  

      // Verifica se há estoque suficiente para o ingresso Normal
      if (ticketNormal.quantidadeDisponivel < normal) {
        return res.status(400).json({ message: 'Desculpe, não há estoque suficiente para ingressos Normais.' });
      }

      // Associa o ingresso Normal à compra e atualiza o estoque
      await purchase.addTicket(ticketNormal, { through: { quantidade: normal } });
      await ticketNormal.update({ quantidadeDisponivel: ticketNormal.quantidadeDisponivel - normal });
    }

    // Após o processo de compra, redireciona para a página de confirmação
    res.redirect(`/confirmacaoCompra/${purchase.id}`);
  } catch (error) {
    console.error('Erro ao confirmar a compra:', error.message);  // Mostra a mensagem de erro para depuração
    res.status(500).json({ message: 'Ocorreu um erro ao tentar confirmar sua compra.' });
  }
};

// Função para listar as compras do usuário
exports.getPurchaseHistory = async (req, res) => {
  try {
    const purchases = await Purchase.findAll({
      where: { usuarioId: req.user.id },
      include: [{
        model: Ticket,
        through: { attributes: ['quantidade'] },
      }],
    });
    console.log(purchases[purchases.length - 1].Tickets[0]);

    // Renderiza a página de histórico de compras com as compras do usuário
    res.render('historico', { purchases });
  } catch (error) {
    console.error('Erro ao buscar histórico de compras:', error);
    res.status(500).json({ message: 'Não foi possível buscar o histórico de compras.' });
  }
};

// Função para confirmar a compra
exports.confirmPurchase = async (req, res) => {
  const { purchaseId } = req.params;  

  try {
    const purchase = await Purchase.findByPk(purchaseId); 

    if (!purchase) {
      return res.status(404).json({ message: 'Compra não encontrada, por favor tente novamente.' });
    }

    // Atualiza o status da compra para 'confirmada'
    purchase.status = 'confirmada';
    await purchase.save(); 

    // Redireciona para o histórico de compras após confirmar a compra
    res.redirect('/historico');
  } catch (error) {
    console.error('Erro ao confirmar a compra:', error);
    res.status(500).json({ message: 'Ocorreu um erro ao confirmar sua compra.' });
  }
};

// Função para cancelar a compra
exports.cancelPurchase = async (req, res) => {
  const { purchaseId } = req.params;  

  try {
    const purchase = await Purchase.findByPk(purchaseId);

    if (!purchase) {
      return res.status(404).json({ message: 'Compra não encontrada, não foi possível cancelar.' });
    }

    // Atualiza o status da compra para 'cancelada'
    purchase.status = 'cancelada';
    await purchase.save();

    // Redireciona para o histórico de compras após cancelar a compra
    res.redirect('/historico');
  } catch (error) {
    console.error('Erro ao cancelar a compra:', error);
    res.status(500).json({ message: 'Ocorreu um erro ao tentar cancelar sua compra.' });
  }
};

// Função para exibir os detalhes da compra confirmada
exports.showConfirmPurchase = async (req, res) => {
  const purchase = await Purchase.findOne({
    where: { id: req.params.purchaseId },
    include: [{
      model: Ticket,
      through: { attributes: ['quantidade'] },
    }]
  });

  const ticketDetails = purchase.Tickets.map(ticket => {
    return {
      nome: ticket.dataValues.nome,  
      preco: ticket.dataValues.preco,  
      quantidade: ticket.PurchaseTicket.dataValues.quantidade,  
      total: ticket.dataValues.preco * ticket.PurchaseTicket.dataValues.quantidade 
    };
  });

  const valorTotalIngressos = ticketDetails.reduce((accumulator, currentValue) => accumulator + currentValue.total, 0);

  res.render('confirmacaoCompra', { ticketDetails, valorTotalIngressos, purchaseId: req.params.purchaseId });
};
