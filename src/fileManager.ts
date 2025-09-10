// src/fileManager.ts

// --- Importações ---
// Importa o módulo 'fs' (File System) do Node.js, que nos permite interagir com arquivos.
import * as fs from 'fs';
// Importa a estrutura (o "molde") de um Agendamento para sabermos com que tipo de dados estamos trabalhando.
import { Agendamento } from './types';


// --- Constantes ---
// Define o nome do nosso arquivo de "banco de dados".
const ARQUIVO_DB = 'agendamentos.txt';


/**
 * Função que lê o arquivo 'agendamentos.txt' e o transforma em uma lista de objetos.
 * @returns Uma lista (array) de objetos do tipo Agendamento.
 */
export function carregarAgendamentos(): Agendamento[] {
  // O 'try...catch' serve para capturar qualquer erro que possa acontecer durante a leitura do arquivo.
  try {
    // Verifica se o arquivo de banco de dados já existe.
    if (!fs.existsSync(ARQUIVO_DB)) {
      // Se não existir, cria um arquivo vazio. Isso previne um erro na primeira vez que o programa rodar.
      fs.writeFileSync(ARQUIVO_DB, '');
      // Retorna uma lista vazia, pois não há nada para carregar.
      return [];
    }
    
    // Lê todo o conteúdo do arquivo de texto.
    const dados = fs.readFileSync(ARQUIVO_DB, 'utf-8');
    // Separa o conteúdo em linhas e remove quaisquer linhas que estejam em branco.
    const linhas = dados.split('\n').filter(linha => linha.trim() !== '');

    // Transforma cada linha de texto em um objeto do tipo Agendamento.
    const agendamentos: Agendamento[] = linhas.map(linha => {
      // Separa cada parte da linha pela vírgula. Ex: "1,Joao,25/12,14:30,Corte"
      const [id, nomeCliente, data, hora, servico] = linha.split(',');
      // Retorna o objeto formatado corretamente.
      return {
        id: parseInt(id, 10), // Converte o ID, que é texto, para número.
        nomeCliente,
        data,
        hora,
        servico,
      };
    });
    // Retorna a lista completa de agendamentos.
    return agendamentos;

  } catch (error) {
    // Se ocorrer qualquer erro no processo, exibe uma mensagem no console e retorna uma lista vazia para evitar que o programa quebre.
    console.error('Erro ao ler os agendamentos:', error);
    return [];
  }
}

/**
 * Função que pega uma lista de agendamentos e a salva no arquivo 'agendamentos.txt'.
 * Ela apaga o conteúdo antigo e escreve o novo.
 * @param agendamentos A lista de agendamentos a ser salva.
 */
export function salvarAgendamentos(agendamentos: Agendamento[]): void {
  // Bloco 'try...catch' para capturar erros durante a gravação do arquivo.
  try {
    // Transforma cada objeto de agendamento de volta para uma linha de texto no formato CSV (separado por vírgulas).
    const linhas = agendamentos.map(ag => 
      `${ag.id},${ag.nomeCliente},${ag.data},${ag.hora},${ag.servico}`
    );
    // Junta todas as linhas de texto com uma quebra de linha ('\n') e escreve tudo no arquivo.
    fs.writeFileSync(ARQUIVO_DB, linhas.join('\n'));
  } catch (error) {
    // Se der erro, avisa no console.
    console.error('Erro ao salvar os agendamentos:', error);
  }
}