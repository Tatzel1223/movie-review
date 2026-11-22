import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Genero } from '../models/models';

@Injectable({ providedIn: 'root' })
export class GeneroService {
  private http = inject(HttpClient);

  listar(): Observable<Genero[]> {
    return this.http.get<Genero[]>('/api/generos');
  }
}
