import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resenha, ResenhaDetalhe, ResenhaRequest } from '../models/models';

@Injectable({ providedIn: 'root' })
export class ResenhaService {
  private http = inject(HttpClient);
  private url = '/api/resenhas';
  private chaveCurtidas = 'movie-review-curtidas';

  maisCurtidas(): Observable<ResenhaDetalhe[]> {
    return this.http.get<ResenhaDetalhe[]>(`${this.url}/mais-curtidas`);
  }

  buscar(id: number): Observable<Resenha> {
    return this.http.get<Resenha>(`${this.url}/${id}`);
  }

  cadastrar(dados: ResenhaRequest): Observable<Resenha> {
    return this.http.post<Resenha>(this.url, dados);
  }

  atualizar(id: number, dados: ResenhaRequest): Observable<Resenha> {
    return this.http.put<Resenha>(`${this.url}/${id}`, dados);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  curtir(id: number): Observable<{ curtidas: number }> {
    return this.http.post<{ curtidas: number }>(`${this.url}/${id}/curtir`, {});
  }

  curtidasSalvas(): number[] {
    try {
      return JSON.parse(localStorage.getItem(this.chaveCurtidas) ?? '[]');
    } catch {
      return [];
    }
  }

  salvarCurtida(id: number): void {
    try {
      const ids = this.curtidasSalvas();
      if (!ids.includes(id)) ids.push(id);
      localStorage.setItem(this.chaveCurtidas, JSON.stringify(ids));
    } catch {}
  }
}
