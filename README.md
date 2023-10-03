<h1 align="center"> Sistema de Banco Digital - API </h1>

<p align="center">
<img loading="lazy" src="http://img.shields.io/static/v1?label=STATUS&message=COMCLUIDO&color=GREEN&style=for-the-badge"/>
</p>

O sistema é uma **API para um Banco Digital**, criada como parte de um desáfio de comclusão de módulo 02 do curso de desenvolvimento de sistemas - backEnd da escola Cubos Academy. 

#  Funcionalidades do projeto

- `Funcionalidade 1`: Criar conta bancária
- `Funcionalidade 2`: Listar contas bancárias
- `Funcionalidade 3`: Atualizar os dados do usuário da conta bancária
- `Funcionalidade 4`: Excluir uma conta bancária
- `Funcionalidade 5`: Depositar em uma conta bancária
- `Funcionalidade 6`: Sacar de uma conta bancária
- `Funcionalidade 3`: Transferir valores entre contas bancárias
- `Funcionalidade 7`: Consultar saldo da conta bancária
- `Funcionalidade 8`: Emitir extrato bancário

##  Instruções de Uso

*INSTALAÇÕES*

-Inicialização do projeto

![inicializar](https://github.com/yasminssilva/Sistema_Bancario-Desafio_M02/assets/141450814/1953cb66-2fa4-4a3b-b1bd-bf720511f1ce)

-Instalação do express

![express](https://github.com/yasminssilva/Sistema_Bancario-Desafio_M02/assets/141450814/9dd0c822-286e-4af2-b20c-6bee2f2a8dd8)

-Instalação do nodemon

![nodemon](https://github.com/yasminssilva/Sistema_Bancario-Desafio_M02/assets/141450814/3006b405-ae8a-45a1-8be3-d1450cfc88d7)

![script](https://github.com/yasminssilva/Sistema_Bancario-Desafio_M02/assets/141450814/56688f09-b042-4bdd-add8-facec8057f6f)

-Instalação do date-fns

![date-fns](https://github.com/yasminssilva/Sistema_Bancario-Desafio_M02/assets/141450814/34720697-afd9-4cdb-a770-d20e7bc64b1f)

### ⚠️ OBS: Caso ocorra algum erro com o projeto em sa máquina essas são todas as instalações que utilizei para a criação deste projeto. Tente reinstala-las ou tente: **npm install** para reinstala-las.

*RODANDO*

-Comando para rodar o sistema pelo terminal

![rodando](https://github.com/yasminssilva/Sistema_Bancario-Desafio_M02/assets/141450814/d3132bb5-d9c3-4ea6-87a5-0a9718f25949)


## Testes de API com Postman

Para garantir o correto funcionamento do sistema, foram realizados testes utilizando o [Postman](https://www.postman.com/). Esta seção descreve os casos de teste e os resultados obtidos.

### Caso de Teste 1: Cadastro de Conta Bancaria

**Cenário:**
- Um usuário tenta se cadastrar no sistema bancario.

**Passos:**
1. Realiza uma requisição POST para `localhost:3000/contas` com os seguintes dados no body: nome, cpf, data_nascimento, telefone, email, senha.
   
  ex:
![cadastrar](https://github.com/yasminssilva/Sistema_Bancario-Desafio_M02/assets/141450814/1b76115b-2b95-4872-88ad-1074bf896000)

2. Verifica a resposta.

**Resultado:**
- O sistema retornou um status code apropriado.

### Caso de Teste 2: Atualização de Usuário

**Cenário:**
- Um usuário tenta atualizar seus dados.

**Passos:**
1. Realiza uma requisição POST para `localhost:3000/contas/:numeroConta/usuario` com os seguintes dados no body: nome, cpf, data_nascimento, telefone, email, senha.

  ex:
![atualizar](https://github.com/yasminssilva/Sistema_Bancario-Desafio_M02/assets/141450814/e927ab75-b728-432d-a243-ffbddc43489b)

2. Verifica a resposta.

**Resultado:**
- O sistema retornou um status code apropriado.
- 

## Autor do Sistema

![34740](https://github.com/yasminssilva/Sistema_Bancario-Desafio_M02/assets/141450814/ae0c8de4-835d-4c17-bd03-5c0d8e0afd8f)
