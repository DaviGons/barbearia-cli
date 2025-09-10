// src/types.ts

export interface Agendamento {
  id: number;
  nomeCliente: string;
  data: string; // Ex: "25/12/2025"
  hora: string;  // Ex: "14:30"
  servico: string;
}