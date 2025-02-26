const {Ticket} = require('../models');

// Função para exibir a página de vendas
exports.showSalesPage = async (req, res) => {
  const tickets = await Ticket.findAll()
  res.render('vendas', {tickets });
};

// Função para exibir a confirmação da compra
exports.showPurchaseConfirmation = (req, res) => {
  const { vip, normal } = req.body;
  
  // Preços definidos novamente
  const prices = {
    VIP: 150,  
    Normal: 50  
  };

  // Array para armazenar os detalhes dos ingressos
  const ticketDetails = [];
  let totalVIP = 0;
  let totalNormal = 0;

  // Verifica se o usuário selecionou ingressos VIP e calcula o total
  if (vip && vip > 0) {
    ticketDetails.push({
      nome: 'VIP',
      preco: prices.VIP,
      quantidade: vip,
      total: prices.VIP * vip
    });
    totalVIP = prices.VIP * vip; 
  }

  // Verifica se o usuário selecionou ingressos Normais e calcula o total
  if (normal && normal > 0) {
    ticketDetails.push({
      nome: 'Normal',
      preco: prices.Normal,
      quantidade: normal,
      total: prices.Normal * normal
    });
    totalNormal = prices.Normal * normal;  
  }

  const total = totalVIP + totalNormal;

  res.render('confirmacaoCompra', { ticketDetails, total });
};

// Função para confirmar a compra
exports.confirmPurchase = (req, res) => {
  res.redirect('/vendas');  // Após a confirmação, redireciona o usuário para a página de vendas
};

// Função para cancelar a compra
exports.cancelPurchase = (req, res) => {
  // Cancela a compra e redireciona o usuário para a página de vendas
  res.redirect('/vendas');
};

exports.createTicket = async (req, res) => {
  try{
  const {nome, preco, quantidade} = req.body

    if(!nome || !preco || !quantidade) res.status(400).json({ message: 'Dados não validados!' })

    await Ticket.create({nome, preco, quantidadeDisponivel: quantidade})

    return res.status(201).json({ message: 'Ticket criado com sucesso!' })
  }
  catch(error){
    res.status(500).json({message: error?.message})
  }
}

exports.updateTicket = async (req, res) => {
  try{
  console.log(req.params)
  const id = req.params.id;
  const {nome, preco, quantidade} = req.body

    if(!nome || !preco || !quantidade || !id) res.status(400).json({ message: 'Dados não validados!' })
    
    const ticket = await Ticket.findOne({where: {id: parseInt(id)}})
    if (!ticket) res.status(404).json({message: 'Ticket não existe!'})

    await ticket.update({nome, preco, quantidadeDisponivel: quantidade})

    return res.status(200).json({ message: 'Ticket atualizado com sucesso!' })
  }
  catch(error){
    res.status(500).json({message: error?.message})
  }
}

exports.deleteTicket = async (req, res) => {
  try{
  console.log(req.params)
  const id = req.params.id;
    if(!id) res.status(400).json({ message: 'Dados não validados!' })
    
    const ticket = await Ticket.findOne({where: {id: parseInt(id)}})
    if (!ticket) res.status(404).json({message: 'Ticket não existe!'})

    await ticket.destroy()

    return res.status(200).json({ message: 'Ticket foi apagado com sucesso!' })
  }
  catch(error){
    res.status(500).json({message: error?.message})
  }
}

exports.getTicket = async (req, res) => {
  try{
    if(req.query.nome){
      const ticket = await Ticket.findOne({where: {nome: req.query.nome}})
      return res.status(200).json({ticket})
    }
    const tickets = await Ticket.findAll()
    return res.status(200).json({tickets})
  }
  catch(error){
    res.status(500).json({message: error?.message})
  }
}