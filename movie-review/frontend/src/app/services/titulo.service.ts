import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tipo, Titulo, TituloRequest, TituloResumo } from '../models/models';

@Injectable({ providedIn: 'root' })
export class TituloService {
  private http = inject(HttpClient);
  private url = '/api/titulos';

  listar(filtros: { tipo?: Tipo | ''; generoId?: number | null; busca?: string } = {}): Observable<TituloResumo[]> {
    let params = new HttpParams();
    if (filtros.tipo) params = params.set('tipo', filtros.tipo);
    if (filtros.generoId) params = params.set('generoId', filtros.generoId);
    if (filtros.busca) params = params.set('busca', filtros.busca);
    return this.http.get<TituloResumo[]>(this.url, { params });
  }

  recentes(): Observable<Titulo[]> {
    return this.http.get<Titulo[]>(`${this.url}/recentes`);
  }

  buscar(id: number): Observable<Titulo> {
    return this.http.get<Titulo>(`${this.url}/${id}`);
  }

  cadastrar(dados: TituloRequest): Observable<Titulo> {
    return this.http.post<Titulo>(this.url, dados);
  }

  atualizar(id: number, dados: TituloRequest): Observable<Titulo> {
    return this.http.put<Titulo>(`${this.url}/${id}`, dados);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
