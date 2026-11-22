import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import {
  CadastroUsuarioRequest,
  Estante,
  LoginRequest,
  ResenhaDetalhe,
  Usuario,
  UsuarioRequest,
} from '../models/models';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private http = inject(HttpClient);
  private url = '/api/usuarios';
  private chave = 'movie-review-usuario';

  usuarioAtualId = signal<number>(this.idSalvo());
  usuario = signal<Usuario | null>(null);
  logado = computed(() => this.usuarioAtualId() > 0);

  carregar(): void {
    const id = this.usuarioAtualId();
    if (id <= 0) return;
    this.http.get<Usuario>(`${this.url}/${id}`).subscribe({
      next: (u) => this.usuario.set(u),
      error: () => this.sair(),
    });
  }

  entrar(dados: LoginRequest): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.url}/login`, dados).pipe(tap((u) => this.definirAtual(u)));
  }

  cadastrar(dados: CadastroUsuarioRequest): Observable<Usuario> {
    return this.http.post<Usuario>(this.url, dados).pipe(tap((u) => this.definirAtual(u)));
  }

  atualizar(dados: UsuarioRequest): Observable<Usuario> {
    return this.http
      .put<Usuario>(`${this.url}/${this.usuarioAtualId()}`, dados)
      .pipe(tap((u) => this.usuario.set(u)));
  }

  excluirAtual(): Observable<void> {
    return this.http.delete<void>(`${this.url}/${this.usuarioAtualId()}`).pipe(tap(() => this.sair()));
  }

  sair(): void {
    this.usuario.set(null);
    this.usuarioAtualId.set(0);
    try {
      localStorage.removeItem(this.chave);
    } catch {}
  }

  estante(id: number): Observable<Estante> {
    return this.http.get<Estante>(`${this.url}/${id}/estante`);
  }

  resenhas(id: number): Observable<ResenhaDetalhe[]> {
    return this.http.get<ResenhaDetalhe[]>(`${this.url}/${id}/resenhas`);
  }

  private definirAtual(usuario: Usuario): void {
    this.usuario.set(usuario);
    this.usuarioAtualId.set(usuario.id);
    try {
      localStorage.setItem(this.chave, String(usuario.id));
    } catch {}
  }

  private idSalvo(): number {
    try {
      const salvo = Number(localStorage.getItem(this.chave));
      return salvo > 0 ? salvo : 0;
    } catch {
      return 0;
    }
  }
}
