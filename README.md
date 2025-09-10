ALUNOS
DAVI GONÇALVES SILVA (RA 2505783)
GUSTAVO ZAIA PASTRO (2506964)






Sistema de Agendamento para Barbearia (CLI)
Este é um sistema simples, executado via terminal, para gerenciar agendamentos de uma barbearia. Os dados são salvos localmente em um arquivo agendamentos.txt.

Como Executar
Instalar as dependências:

Bash

npm install
Iniciar o sistema:

Bash

npm start
Funcionalidades do Menu
1. Novo Agendamento: Permite cadastrar um novo horário para um cliente, solicitando nome, data, hora e o serviço desejado.

2. Listar Agendamentos: Exibe todos os agendamentos cadastrados, ordenados por data e hora.

3. Cancelar Agendamento: Permite remover um agendamento existente com base no seu ID.

4. Sair: Encerra a aplicação.

Estrutura e Arquivos
Aqui está a função de cada arquivo principal do projeto:

agendamentos.txt

Função: É o "banco de dados" do sistema. Cada linha representa um agendamento no formato ID,Nome do Cliente,Data,Hora,Serviço.

src/index.ts

Função: É o coração do programa. Responsável por exibir o menu principal, capturar a escolha do usuário e chamar as funções correspondentes (criar, listar, cancelar).

src/fileManager.ts

Função: Cuida de toda a interação com o arquivo agendamentos.txt. Contém duas funções principais:

carregarAgendamentos(): Lê o arquivo e transforma as linhas de texto em uma lista de objetos.

salvarAgendamentos(): Pega a lista de objetos e a escreve de volta no arquivo, salvando as alterações.

src/types.ts

Função: Define a estrutura de um Agendamento. Garante que todos os agendamentos no código tenham os mesmos campos (id, nomeCliente, data, hora, servico).

package.json

Função: Arquivo de configuração do projeto Node.js. Ele define as dependências (bibliotecas) necessárias e os scripts, como o npm start.

tsconfig.json

Função: Arquivo de configuração do TypeScript. Ele diz ao compilador como transformar o código TypeScript (.ts) em JavaScript para que o Node.js possa executá-lo.