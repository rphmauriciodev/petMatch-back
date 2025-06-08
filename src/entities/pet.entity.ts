export interface Pet {
  id: number;
  nome: string;
  generoId: number;
  qualidades: string;
  historia: string;
  cor: string;
  raca: string;
  idade: number;
  fotoBase64?: string;
  dataCadastro: Date;
}
