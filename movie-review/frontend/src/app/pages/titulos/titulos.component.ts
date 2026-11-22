import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Genero, Tipo, TituloResumo, mensagemDeErro } from '../../models/models';
import { TituloService } from '../../services/titulo.service';
import { GeneroService } from '../../services/genero.service';
import { UsuarioService } from '../../services/usuario.service';
import { TituloCardComponent } from '../../components/titulo-card/titulo-card.component';

@Component({
  selector: 'app-titulos',
  standalone: true,
  imports: [FormsModule, RouterLink, TituloCardComponent],
  templateUrl: './titulos.component.html',
})
export class TitulosComponent implements OnInit {
  private tituloService = inject(TituloService);
  private generoService = inject(GeneroService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  logado = inject(UsuarioService).logado;

  tipo: Tipo | '' = '';
  titulos: TituloResumo[] = [];
  generos: Genero[] = [];
  busca = '';
  generoId: number | null = null;
  carregando = false;
  erro = '';
  sucesso = '';

  ngOnInit(): void {
    this.tipo = (this.route.snapshot.data['tipo'] ?? '') as Tipo | '';
    this.generoService.listar().subscribe({
      next: (generos) => (this.generos = generos),
      error: (e) => (this.erro = mensagemDeErro(e)),
    });
    this.route.queryParamMap.subscribe((params) => {
      this.busca = params.get('q') ?? '';
      this.carregar();
    });
  }

  get titulo(): string {
    if (this.tipo === 'FILME') return 'Filmes';
    if (this.tipo === 'SERIE') return 'Séries';
    return 'Busca';
  }

  get subtitulo(): string {
    if (this.tipo === 'FILME') return 'Todos os filmes do catálogo, dos mais bem avaliados aos mais novos.';
    if (this.tipo === 'SERIE') return 'Todas as séries do catálogo, das mais bem avaliadas às mais novas.';
    return this.busca ? `Resultados para “${this.busca}” em filmes e séries.` : 'Busque por filmes e séries.';
  }

  get textoNovo(): string {
    return this.tipo === 'SERIE' ? '+ Nova série' : '+ Novo filme';
  }

  carregar(): void {
    this.carregando = true;
    this.erro = '';
    this.tituloService.listar({ tipo: this.tipo, generoId: this.generoId, busca: this.busca }).subscribe({
      next: (titulos) => {
        this.titulos = titulos;
        this.carregando = false;
      },
      error: (e) => {
        this.erro = mensagemDeErro(e);
        this.carregando = false;
      },
    });
  }

  pesquisar(): void {
    if (this.tipo === '') {
      this.router.navigate(['/busca'], { queryParams: { q: this.busca.trim() || null } });
    } else {
      this.carregar();
    }
  }

  limpar(): void {
    this.busca = '';
    this.generoId = null;
    this.pesquisar();
  }

  excluir(titulo: TituloResumo): void {
    if (!confirm(`Excluir "${titulo.nome}"? As resenhas dele também serão apagadas.`)) return;
    this.sucesso = '';
    this.tituloService.excluir(titulo.id).subscribe({
      next: () => {
        this.sucesso = `"${titulo.nome}" foi excluído.`;
        this.carregar();
      },
      error: (e) => (this.erro = mensagemDeErro(e)),
    });
  }
}
