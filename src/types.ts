export interface Santo {
  nome: string;
  biografia: string;
  imagem_url: string;
  data: string;
}

export interface Evento {
  id: string;
  nome: string;
  descricao: string;
  detalhes?: string;
  data_hora: string;
  local: string;
  imagem_url: string;
}

export interface InstagramPost {
  id: string;
  url_post: string;
  legenda: string;
  data_publicacao: string;
  imagem_url: string;
}

export interface AgendaItem {
  id: string;
  titulo: string;
  horario: string;
  tipo: 'missa' | 'reuniao' | 'outro';
  dia: number; // 0-6 (Sun-Sat)
}

export interface Noticia {
  id: string;
  titulo: string;
  resumo: string;
  imagem_url: string;
  link: string;
}

export interface AppConfig {
  dizimo_pix: string;
  dizimo_texto: string;
  telefone_secretaria: string;
  email_secretaria: string;
  instagram_username: string;
  loja_banner_url?: string;
}

export interface Oracao {
  id: string;
  titulo: string;
  conteudo: string;
  imagem_url: string;
}

export interface Capela {
  id: string;
  nome: string;
  imagem_url: string;
  descricao: string;
  endereco: string;
  padroeiro: string;
}

export interface Pastoral {
  id: string;
  nome: string;
  descricao: string;
  imagem_url: string;
  coordenador: string;
  reunioes: string;
  destaque: string;
}

export interface Produto {
  id: string;
  nome: string;
  descricao?: string;
  preco: number;
  imagem_url: string;
}

export interface Membro {
  id: string;
  nome: string;
  cargo: string;
  descricao: string;
  foto_url: string;
  email: string;
  telefone: string;
  ordem: number;
}

export interface Aviso {
  id: string;
  titulo: string;
  conteudo: string;
  tipo: 'urgente' | 'importante' | 'geral' | 'evento';
  imagem_url: string;
  publicado: boolean;
}

export interface Liturgia {
  id: string;
  data: string;
  primeira_leitura: string;
  salmo: string;
  segunda_leitura: string;
  evangelho: string;
  oracao: string;
}

export interface Catecismo {
  id: string;
  titulo: string;
  conteudo: string;
  categoria: string;
  ordem: number;
}

export interface PrestacaoContas {
  id: string;
  titulo: string;
  descricao: string;
  valor: number;
  tipo: 'entrada' | 'saida';
  data: string;
  comprovante_url: string;
}

export interface Inscricao {
  id: string;
  evento_nome: string;
  link_inscricao: string;
  data_limite: string;
  vagas: number;
  descricao: string;
  ativo: boolean;
}

export interface RedeSocial {
  id: string;
  nome: string;
  url: string;
  icone: string;
  ativo: boolean;
}
