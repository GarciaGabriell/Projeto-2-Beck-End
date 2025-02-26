const { Purchase, Ticket } = require('../models');

// Função para confirmar a compra
exports.createPurchase = async (req, res) => {
  try {
    const purchase = await Purchase.create({ usuarioId: req.user.id, status: 'pendente' });
    for await (const ingresso of Object.keys(req.body)) {
      if (+req.body[ingresso] > 0) {
        const ticket = await Ticket.findOne({where: { nome: ingresso}})
        if(ticket.quantidadeDisponivel < +req.body[ingresso]){
          const tickets = await Ticket.findAll()
          return res.redirect('/vendas');
        }
        if(ticket.quantidadeDisponivel >= +req.body[ingresso]) {
          await purchase.addTicket(ticket, { through: { quantidade: +req.body[ingresso] } });
          await ticket.update({ quantidadeDisponivel: ticket.quantidadeDisponivel - +req.body[ingresso] })
        }
      }
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
