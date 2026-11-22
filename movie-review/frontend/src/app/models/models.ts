export type Tipo = 'FILME' | 'SERIE';

export interface Genero {
  id: number;
  nome: string;
}

export interface Usuario {
  id: number;
  nome: string;
  login: string;
  frase: string | null;
  bioTitulo: string | null;
  bio: string | null;
}

export interface UsuarioRequest {
  nome: string;
  frase: string;
  bioTitulo: string;
  bio: string;
}

export interface CadastroUsuarioRequest extends UsuarioRequest {
  login: string;
  senha: string;
}

export interface LoginRequest {
  login: string;
  senha: string;
}

export interface Titulo {
  id: number;
  nome: string;
  tipo: Tipo;
  anoLancamento: number;
  temporadas: number | null;
  sinopse: string | null;
  imagem: string | null;
  genero: Genero;
}

export interface TituloResumo {
  id: number;
  nome: string;
  tipo: Tipo;
  anoLancamento: number;
  temporadas: number | null;
  sinopse: string | null;
  imagem: string | null;
  generoId: number;
  genero: string;
  media: number | null;
  curtidas: number;
  totalResenhas: number;
}

export interface TituloRequest {
  nome: string;
  tipo: Tipo;
  anoLancamento: number | null;
  temporadas: number | null;
  sinopse: string;
  imagem: string | null;
  generoId: number | null;
}

export interface Resenha {
  id: number;
  manchete: string;
  texto: string;
  nota: number;
  curtidas: number;
  titulo: Titulo;
  usuario: Usuario;
}

export interface ResenhaDetalhe {
  id: number;
  manchete: string;
  texto: string;
  nota: number;
  curtidas: number;
  tituloId: number;
  titulo: string;
  tipo: Tipo;
  genero: string;
  imagem: string | null;
  usuarioId: number;
  autor: string;
}

export interface ResenhaRequest {
  usuarioId: number;
  tituloId: number | null;
  manchete: string;
  texto: string;
  nota: number;
}

export interface Estante {
  filmesVistos: number;
  seriesVistas: number;
  resenhasPublicadas: number;
}

const GRADIENTES: Record<string, string> = {
  'Sci-fi': 'linear-gradient(135deg, #5fb3a8 0%, #2e6870 45%, #172133 100%)',
  'Fantasia': 'linear-gradient(135deg, #a88bc4 0%, #5b4775 45%, #1b2033 100%)',
  'Suspense': 'linear-gradient(135deg, #7d6d8c 0%, #4a3f58 45%, #1a1f2e 100%)',
  'Comédia': 'linear-gradient(135deg, #e3c66e 0%, #8e7f52 45%, #1b2233 100%)',
  'Drama': 'linear-gradient(135deg, #c27a6c 0%, #6e3f45 45%, #1b1f2e 100%)',
  'Ação': 'linear-gradient(135deg, #d98a4e 0%, #7a4a35 45%, #1b1f2e 100%)',
  'Terror': 'linear-gradient(135deg, #9b3b3b 0%, #4f2229 45%, #15191f 100%)',
  'Animação': 'linear-gradient(135deg, #6f9be0 0%, #3d5a8f 45%, #172033 100%)',
};

export function gradienteDoGenero(genero: string): string {
  return GRADIENTES[genero] ?? 'linear-gradient(135deg, #64748b 0%, #334155 45%, #172033 100%)';
}

export function formatarCurtidas(valor: number): string {
  const n = Number(valor) || 0;
  if (n < 1000) return String(n);
  return (n / 1000).toFixed(1).replace('.0', '') + 'k';
}

export function formatarNota(valor: number | null): string {
  return valor === null ? '-' : Number(valor).toFixed(1);
}

export function linkTrailer(nome: string): string {
  return 'https://www.youtube.com/results?search_query=' + encodeURIComponent(nome + ' trailer oficial');
}

export function iniciais(nome: string): string {
  const partes = nome.trim().split(/\s+/).filter((p) => p.length > 0);
  if (partes.length === 0) return '';
  if (partes.length === 1) return partes[0].charAt(0).toUpperCase();
  return (partes[0].charAt(0) + partes[partes.length - 1].charAt(0)).toUpperCase();
}

export function nomeDoTipo(tipo: Tipo): string {
  return tipo === 'FILME' ? 'Filme' : 'Série';
}

export function mensagemDeErro(erro: any): string {
  return erro?.error?.mensagem ?? 'Não foi possível falar com o servidor. O back-end está rodando?';
}
