import { Component, computed, effect, inject, untracked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  Estante,
  ResenhaDetalhe,
  Titulo,
  UsuarioRequest,
  formatarCurtidas,
  gradienteDoGenero,
  iniciais,
  mensagemDeErro,
  nomeDoTipo,
} from '../../models/models';
import { UsuarioService } from '../../services/usuario.service';
import { ResenhaService } from '../../services/resenha.service';
import { TituloService } from '../../services/titulo.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './perfil.component.html',
})
export class PerfilComponent {
  private usuarioService = inject(UsuarioService);
  private resenhaService = inject(ResenhaService);
  private tituloService = inject(TituloService);
  private router = inject(Router);

  usuario = this.usuarioService.usuario;
  inicial = computed(() => iniciais(this.usuario()?.nome ?? '').charAt(0));

  estante: Estante | null = null;
  resenhas: ResenhaDetalhe[] = [];
  rotacao: Titulo[] = [];
  erro = '';

  editando = false;
  form: UsuarioRequest = { nome: '', frase: '', bioTitulo: '', bio: '' };

  gradiente = gradienteDoGenero;
  curtidas = formatarCurtidas;
  tipo = nomeDoTipo;

  constructor() {
    this.tituloService.recentes().subscribe({
      next: (titulos) => (this.rotacao = titulos),
      error: (e) => (this.erro = mensagemDeErro(e)),
    });

    effect(() => {
      const id = this.usuarioService.usuarioAtualId();
      if (id > 0) untracked(() => this.carregarDoUsuario(id));
    });
  }

  carregarDoUsuario(id: number): void {
    this.erro = '';
    this.editando = false;
    this.estante = null;
    this.usuarioService.estante(id).subscribe({
      next: (estante) => (this.estante = estante),
      error: (e) => (this.erro = mensagemDeErro(e)),
    });
    this.usuarioService.resenhas(id).subscribe({
      next: (resenhas) => (this.resenhas = resenhas),
      error: (e) => (this.erro = mensagemDeErro(e)),
    });
  }

  abrirEdicao(): void {
    const u = this.usuario();
    this.form = {
      nome: u?.nome ?? '',
      frase: u?.frase ?? '',
      bioTitulo: u?.bioTitulo ?? '',
      bio: u?.bio ?? '',
    };
    this.editando = true;
  }

  salvarPerfil(): void {
    this.erro = '';
    this.usuarioService.atualizar(this.form).subscribe({
      next: () => (this.editando = false),
      error: (e) => (this.erro = mensagemDeErro(e)),
    });
  }

  excluirConta(): void {
    const nome = this.usuario()?.nome ?? 'este usuário';
    if (!confirm(`Excluir a conta de ${nome}? As resenhas dessa conta também serão apagadas.`)) return;
    this.usuarioService.excluirAtual().subscribe({
      next: () => this.router.navigate(['/entrar']),
      error: (e) => (this.erro = mensagemDeErro(e)),
    });
  }

  excluirResenha(resenha: ResenhaDetalhe): void {
    if (!confirm(`Excluir a resenha de "${resenha.titulo}"?`)) return;
    this.resenhaService.excluir(resenha.id).subscribe({
      next: () => this.carregarDoUsuario(this.usuarioService.usuarioAtualId()),
      error: (e) => (this.erro = mensagemDeErro(e)),
    });
  }
}
