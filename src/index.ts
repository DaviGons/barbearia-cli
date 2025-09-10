// src/index.ts

// --- Importações ---
// Importa as ferramentas necessárias para o nosso programa funcionar.
import promptSync from 'prompt-sync'; // Ferramenta para ler o que o usuário digita no terminal.
import { Agendamento } from './types'; // A estrutura (o "molde") de como um agendamento deve ser.
import { carregarAgendamentos, salvarAgendamentos } from './fileManager'; // Funções para ler e escrever no nosso arquivo .txt.

// --- Inicialização ---
const prompt = promptSync({ sigint: true }); // Cria a função 'prompt' que vamos usar para fazer perguntas ao usuário.
let agendamentos: Agendamento[] = carregarAgendamentos(); // Carrega todos os agendamentos do arquivo .txt para a memória assim que o programa inicia.

/**
 * Esta função apenas mostra as opções do menu principal na tela.
 */
function exibirMenu(): void {
  console.log('\n--- Sistema de Agendamento da Barbearia ---');
  console.log('1. Novo Agendamento');
  console.log('2. Listar Agendamentos');
  console.log('3. Cancelar Agendamento');
  console.log('4. Sair');
}

/**
 * Função responsável por criar um novo agendamento.
 */
function novoAgendamento(): void {
  console.log('\n--- Novo Agendamento ---');
  // Pede e armazena cada informação necessária para o agendamento.
  const nomeCliente = prompt('Nome do Cliente: ');
  const data = prompt('Data (DD/MM/AAAA): ');
  const hora = prompt('Hora (HH:MM): ');
  const servico = prompt('Serviço (Corte, Barba, etc.): ');

  // Calcula o ID do novo agendamento. Ele pega o maior ID que já existe e soma 1.
  // Se não houver nenhum agendamento, o primeiro ID será 1.
  const novoId = agendamentos.length > 0 ? Math.max(...agendamentos.map(a => a.id)) + 1 : 1;

  // Cria um novo objeto de agendamento com todas as informações coletadas.
  const novo: Agendamento = {
    id: novoId,
    nomeCliente,
    data,
    hora,
    servico
  };

  agendamentos.push(novo); // Adiciona o novo agendamento na lista que está na memória.
  salvarAgendamentos(agendamentos); // Salva a lista atualizada de volta no arquivo .txt.
  console.log('✅ Agendamento criado com sucesso!');
}

/**
 * Função que exibe todos os agendamentos salvos na tela.
 */
function listarAgendamentos(): void {
  console.log('\n--- Lista de Agendamentos ---');
  // Se a lista de agendamentos estiver vazia, avisa o usuário e encerra a função.
  if (agendamentos.length === 0) {
    console.log('Nenhum agendamento encontrado.');
    return;
  }

  // Organiza a lista de agendamentos em ordem de data e hora para facilitar a visualização.
  agendamentos.sort((a, b) => {
    // Inverte a data (de DD/MM/AAAA para AAAA-MM-DD) para que a ordenação de texto funcione corretamente.
    const dataA = a.data.split('/').reverse().join('-');
    const dataB = b.data.split('/').reverse().join('-');
    // Compara a data e a hora juntas para ordenar.
    return (`${dataA} ${a.hora}`).localeCompare(`${dataB} ${b.hora}`);
  });

  // Passa por cada agendamento da lista e o exibe de forma organizada.
  for (const ag of agendamentos) {
    console.log(
      `ID: ${ag.id} | Cliente: ${ag.nomeCliente} | Serviço: ${ag.servico} | Data: ${ag.data} às ${ag.hora}`
    );
  }
}

/**
 * Função para remover um agendamento existente.
 */
function cancelarAgendamento(): void {
  console.log('\n--- Cancelar Agendamento ---');
  listarAgendamentos(); // Mostra a lista primeiro, para que o usuário saiba qual ID ele quer cancelar.
  
  // Se não houver agendamentos, não há nada para cancelar.
  if (agendamentos.length === 0) {
    return;
  }

  // Pergunta ao usuário o ID do agendamento que ele quer remover e converte para número.
  const idParaCancelar = parseInt(prompt('Digite o ID do agendamento a ser cancelado: '), 10);

  // Procura na lista a posição (o índice) do agendamento com o ID informado.
  const agendamentoIndex = agendamentos.findIndex(ag => ag.id === idParaCancelar);

  // Se não encontrar nenhum agendamento com aquele ID, mostra um erro e encerra a função.
  if (agendamentoIndex === -1) {
    console.log('❌ ID não encontrado.');
    return;
  }
  
  // Remove o agendamento encontrado da lista.
  agendamentos.splice(agendamentoIndex, 1);
  // Salva a lista (agora sem o item removido) de volta no arquivo .txt.
  salvarAgendamentos(agendamentos);
  console.log('✅ Agendamento cancelado com sucesso!');
}

/**
 * Função principal que controla a execução do programa e o menu.
 */
function main(): void {
  // Variável que controla se o programa deve continuar rodando.
  let rodando = true;

  // Loop que mantém o menu aparecendo até o usuário escolher a opção de sair.
  while (rodando) {
    exibirMenu(); // Mostra o menu de opções.
    const opcao = prompt('Escolha uma opção: '); // Pede para o usuário escolher uma opção.

    // Executa uma ação diferente dependendo da opção escolhida pelo usuário.
    switch (opcao) {
      case '1':
        novoAgendamento();
        break;
      case '2':
        listarAgendamentos();
        break;
      case '3':
        cancelarAgendamento();
        break;
      case '4':
        // Se a opção for '4', muda a variável 'rodando' para 'false', o que fará o loop parar.
        rodando = false;
        console.log('Até mais!');
        break;
      default:
        // Se o usuário digitar algo que não seja uma opção válida.
        console.log('Opção inválida. Tente novamente.');
    }
  }
}

// --- Início do Programa ---
// Esta é a linha que de fato inicia o programa, chamando a função principal.
main();