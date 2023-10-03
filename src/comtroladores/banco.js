const { format } = require('date-fns')
const { banco, contas, saques, depositos, transferencias } = require('../dados/bancodedados');
let numeroContaUnic = 1;

function verificarCamposObrigatorios(req, resp, campos) {
    for (const campo of campos) {
        if (!req.body[campo] && !req.query[campo]) {
            return resp.status(400).json({ mensagem: `O(a) ${campo} deve ser informado(a)!` });
        }
    }
};

const lstarContasBancarias = async (req, resp) =>{
    const { senha_banco } = req.query;

    if(senha_banco !== banco.senha) {
        return resp.status(400).json({ mensagem: 'A senha do banco informada é inválida!' });
    }

    return resp.json(contas);  
};

const cadastrarContaBancaria = async (req, resp) =>{
    const { nome, email, senha, cpf, data_nascimento, telefone } = req.body;

    const camposObrigatorios = ["nome", "email", "senha", "cpf", "data_nascimento", "telefone"];
    verificarCamposObrigatorios(req, resp, camposObrigatorios);

    const cpfExixtente = contas.some(numero => numero.usuario.cpf === cpf);
    const emailExistente = contas.some(texto => texto.usuario.email === email);

    if(cpfExixtente){
        return resp.status(400).json({ mensagem: 'Já existe uma conta com o cpf informado!' })
    }

    if(emailExistente){
        return resp.status(400).json({ mensagem: 'Já existe uma conta com o e-mail informado!' })
    }

    contas.push({
        numero: numeroContaUnic,
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha,
        }
    });

    numeroContaUnic++

    return resp.status(201).send();
};

const atualizarUsuario = async (req, resp) =>{
    const numeroConta = Number(req.params.numeroConta);
    const { nome, email, senha, cpf, data_nascimento, telefone } = req.body;

    const camposObrigatorios = ["nome", "email", "senha", "cpf", "data_nascimento", "telefone"];
    verificarCamposObrigatorios(req, resp, camposObrigatorios);

    if(isNaN(numeroConta)){
        return resp.status(400).json({ mensagem: 'O número da conta informado não é válido!' });
    }

    const contaEncontrada = contas.find(conta => conta.numero === Number(numeroConta));

    if(!contaEncontrada){
        return resp.status(404).json({ mensagem: 'Conta bancaria não encontrada!' });
    }

    const cpfExixtente = contas.some(numero => numero.usuario.cpf === cpf);
    const emailExistente = contas.some(texto => texto.usuario.email === email);

    if(cpfExixtente || emailExistente){
        return resp.status(400).json({ mensagem: 'Já existe uma conta com o cpf e/ou e-mail informado!' })
    }

    contaEncontrada.usuario = { nome, cpf, data_nascimento, telefone, email, senha};

    return resp.status(204).send();
};

const excluirContaBancaria = async (req, resp) =>{
    const numeroConta = Number(req.params.numeroConta);

    if(isNaN(numeroConta)){
        return resp.status(400).json({ mensagem: 'O número da conta informado não é válido!' });
    }

    const contaEncontrada = contas.findIndex(conta => conta.numero === Number(numeroConta));

    if(contaEncontrada < 0){
        return resp.status(404).json({ mensagem: 'Conta bancaria não encontrada!' });
    }

    if(contas.saldo > 0){
        return resp.status(400).json({ mensagem: 'A conta só pode ser removida se o saldo for zero(0)!' })
    }

    contas.splice(contaEncontrada, 1);

    return resp.status(204).send();
};

const realizarDeposito = async (req, resp) =>{
    const { numero_conta, valor } = req.body;

    const camposObrigatorios = ["numero_conta", "valor"];
    verificarCamposObrigatorios(req, resp, camposObrigatorios);

    if(valor < 1){
        return resp.status(400).json({ mensagem: 'O valor que deseja sacar deve ser maior que zero(0)!' });
    }

    const contaExistente = contas.find(conta => conta.numero === Number(numero_conta));

    if(!contaExistente){
        return resp.status(404).json({ mensagem: 'Conta bancaria não encontrada!' });
    }

    contaExistente.saldo += valor;

    const dataUTC = new Date();
    const dataFormatada = format(dataUTC, "yyyy-MM-dd HH:mm:ss");

    depositos.push({
        data: dataFormatada,
        numero_conta,
        valor
    });

    return resp.status(204).send();
};

const realizarSaque = async (req, resp) =>{
    const { numero_conta, valor, senha } = req.body;

    const camposObrigatorios = ["numero_conta", "valor", "senha"];
    verificarCamposObrigatorios(req, resp, camposObrigatorios);

    if(valor < 1){
        return resp.status(400).json({ mensagem: 'O valor que deseja sacar deve ser maior que zero(0)!' });
    }

    const contaExistente = contas.find(conta => conta.numero === Number(numero_conta));

    if(!contaExistente){
        return resp.status(404).json({ mensagem: 'Conta bancaria não encontrada!' });
    }

    if(senha !== contaExistente.usuario.senha){
        return resp.status(400).json({ mensagem: 'A senha da conta bancaria informada é inválida!' });
    }

    if(valor > contaExistente.saldo){
        return resp.status(400).json({ mensagem: 'O valor de saque não pode ser maior que o saldo da conta!' });
    };
    
    const dataUTC = new Date();
    const dataFormatada = format(dataUTC, "yyyy-MM-dd HH:mm:ss");

    contaExistente.saldo -= valor;
    saques.push({
        data: dataFormatada,
        numero_conta,
        valor
    });

    return resp.status(204).send();
};

const realizarTranferencia = async (req, resp) =>{
    const { numero_conta, numero_conta_destino, senha, valor } = req.body;

    const camposObrigatorios = ["numero_conta", "numero_conta_destino", "valor", "senha"];
    verificarCamposObrigatorios(req, resp, camposObrigatorios);

    const contaOrigemExistente = contas.find(conta => conta.numero === Number(numero_conta));
    const contaDestinoExistente = contas.find(conta => conta.numero === Number(numero_conta_destino));

    if(!contaOrigemExistente || !contaDestinoExistente){
        return resp.status(404).json({ mensagem: 'Conta bancaria de origem ou destino não encontrada!' });
    }

    if(senha !== contaOrigemExistente.usuario.senha){
        return resp.status(400).json({ mensagem: 'A senha da conta bancaria informada é inválida!' });
    }

    if(valor > contaOrigemExistente.saldo && valor < 1){
        return resp.status(400).json({ mensagem: 'O valor da transferência tem que ser maior que zero(0) e ter como limite o saldo da conta!' });
    }

    contaOrigemExistente.saldo -= valor;
    contaDestinoExistente.saldo += valor;

    const dataUTC = new Date();
    const dataFormatada = format(dataUTC, "yyyy-MM-dd HH:mm:ss");

    transferencias.push({
        data: dataFormatada,
        numero_conta_origem: numero_conta,
        numero_conta_destino,
        valor
    });

    return resp.status(204).send();
};

const emitirSaldo = async (req, resp) =>{
    const { numero_conta, senha } = req.query;

    const camposObrigatorios = ["numero_conta", "senha"];
    verificarCamposObrigatorios(req, resp, camposObrigatorios);

    const contaExistente = contas.find(conta => conta.numero === Number(numero_conta));

    if(!contaExistente){
        return resp.status(404).json({ mensagem: 'Conta bancaria não encontrada!' });
    }

    if(senha !== contaExistente.usuario.senha){
        return resp.status(400).json({ mensagem: 'A senha da conta bancaria informada é inválida!' });
    }

    const exibirSaldo = {
        saldo: contaExistente.saldo
    };

    return resp.json(exibirSaldo);
};

const emitirExtrato = async (req, resp) =>{
    const { numero_conta, senha } = req.query;

    const camposObrigatorios = ["numero_conta", "senha"];
    verificarCamposObrigatorios(req, resp, camposObrigatorios);

    const contaExistente = contas.find(conta => conta.numero === Number(numero_conta));

    if(!contaExistente){
        return resp.status(404).json({ mensagem: 'Conta bancaria não encontrada!' });
    }

    if(senha !== contaExistente.usuario.senha){
        return resp.status(400).json({ mensagem: 'A senha da conta bancaria informada é inválida!' });
    }

    const exibirDepositos = depositos.filter(deposito => deposito.numero_conta === Number(numero_conta));
    const exibirSaques = saques.filter(saque => saque.numero_conta === Number(numero_conta));  
    const exibirTransferenciasFeitas = transferencias.filter(transferencia => transferencia.numero_conta_origem === Number(numero_conta));    
    const exibirTransferenciasRecebidas = transferencias.filter(transferencia => transferencia.numero_conta_destino === Number(numero_conta));

    const exibirExtrato = {
        depositos: exibirDepositos,
        saques: exibirSaques,
        transferenciasEnviadas: exibirTransferenciasFeitas,
        transferenciasRecebidas: exibirTransferenciasRecebidas
    }

    return resp.json(exibirExtrato);
};

module.exports = {
    lstarContasBancarias,
    cadastrarContaBancaria,
    atualizarUsuario,
    excluirContaBancaria,
    realizarDeposito,
    realizarSaque,
    realizarTranferencia,
    emitirSaldo,
    emitirExtrato
}