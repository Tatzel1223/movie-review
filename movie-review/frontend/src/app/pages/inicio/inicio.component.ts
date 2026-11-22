import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ResenhaDetalhe, TituloResumo, formatarCurtidas, gradienteDoGenero, mensagemDeErro } from '../../models/models';
import { TituloService } from '../../services/titulo.service';
import { ResenhaService } from '../../services/resenha.service';
import { TituloCardComponent } from '../../components/titulo-card/titulo-card.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink, TituloCardComponent],
  templateUrl: './inicio.component.html',
})
export class InicioComponent implements OnInit {
  private tituloService = inject(TituloService);
  private resenhaService = inject(ResenhaService);

  filmes: TituloResumo[] = [];
  resenhas: ResenhaDetalhe[] = [];
  curtidasFeitas: number[] = [];
  erro = '';

  gradiente = gradienteDoGenero;
  curtidas = formatarCurtidas;

  ngOnInit(): void {
    this.curtidasFeitas = this.resenhaService.curtidasSalvas();
    this.tituloService.listar({ tipo: 'FILME' }).subscribe({
      next: (filmes) => (this.filmes = filmes.slice(0, 4)),
      error: (e) => (this.erro = mensagemDeErro(e)),
    });
    this.resenhaService.maisCurtidas().subscribe({
      next: (resenhas) => (this.resenhas = resenhas),
      error: (e) => (this.erro = mensagemDeErro(e)),
    });
  }

  jaCurtiu(id: number): boolean {
    return this.curtidasFeitas.includes(id);
  }

  curtir(resenha: ResenhaDetalhe): void {
    if (this.jaCurtiu(resenha.id)) return;
    this.resenhaService.curtir(resenha.id).subscribe({
      next: (r) => {
        resenha.curtidas = r.curtidas;
        this.resenhaService.salvarCurtida(resenha.id);
        this.curtidasFeitas = [...this.curtidasFeitas, resenha.id];
      },
      error: (e) => (this.erro = mensagemDeErro(e)),
    });
  }
}
