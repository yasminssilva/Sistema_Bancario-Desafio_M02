const express = require('express');
const rotas = express();
const { lstarContasBancarias, cadastrarContaBancaria, atualizarUsuario, excluirContaBancaria, realizarDeposito, realizarSaque, realizarTranferencia, emitirSaldo, emitirExtrato } = require('./controladores/banco')

rotas.get('/contas', lstarContasBancarias);
rotas.post('/contas', cadastrarContaBancaria);
rotas.put('/contas/:numeroConta/usuario', atualizarUsuario);
rotas.delete('/contas/:numeroConta', excluirContaBancaria);

rotas.post('/transacoes/depositar', realizarDeposito);
rotas.post('/transacoes/sacar', realizarSaque);
rotas.post('/transacoes/tranferir', realizarTranferencia);

rotas.get('/contas/saldo', emitirSaldo);
rotas.get('/contas/extrato', emitirExtrato);


module.exports = rotas