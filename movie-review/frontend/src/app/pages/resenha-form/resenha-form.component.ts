import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ResenhaRequest, TituloResumo, mensagemDeErro, nomeDoTipo } from '../../models/models';
import { ResenhaService } from '../../services/resenha.service';
import { TituloService } from '../../services/titulo.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-resenha-form',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './resenha-form.component.html',
})
export class ResenhaFormComponent implements OnInit {
  private resenhaService = inject(ResenhaService);
  private tituloService = inject(TituloService);
  private usuarioService = inject(UsuarioService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  id: number | null = null;
  titulos: TituloResumo[] = [];
  estrelas = [1, 2, 3, 4, 5];
  erro = '';
  salvando = false;
  tipo = nomeDoTipo;

  dados: ResenhaRequest = {
    usuarioId: this.usuarioService.usuarioAtualId(),
    tituloId: null,
    manchete: '',
    texto: '',
    nota: 5,
  };

  ngOnInit(): void {
    this.tituloService.listar().subscribe({
      next: (titulos) => (this.titulos = [...titulos].sort((a, b) => a.nome.localeCompare(b.nome))),
      error: (e) => (this.erro = mensagemDeErro(e)),
    });

    const tituloId = this.route.snapshot.queryParamMap.get('titulo');
    if (tituloId) this.dados.tituloId = Number(tituloId);

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.id = Number(id);
      this.resenhaService.buscar(this.id).subscribe({
        next: (r) =>
          (this.dados = {
            usuarioId: r.usuario.id,
            tituloId: r.titulo.id,
            manchete: r.manchete,
            texto: r.texto,
            nota: r.nota,
          }),
        error: (e) => (this.erro = mensagemDeErro(e)),
      });
    }
  }

  escolherNota(nota: number): void {
    this.dados.nota = nota;
  }

  salvar(): void {
    this.erro = '';
    this.salvando = true;
    const requisicao = this.id
      ? this.resenhaService.atualizar(this.id, this.dados)
      : this.resenhaService.cadastrar(this.dados);

    requisicao.subscribe({
      next: () => this.router.navigate(['/perfil']),
      error: (e) => {
        this.erro = mensagemDeErro(e);
        this.salvando = false;
      },
    });
  }
}
