import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CadastroUsuarioRequest, iniciais, mensagemDeErro } from '../../models/models';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './usuario-form.component.html',
})
export class UsuarioFormComponent {
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);

  erro = '';
  salvando = false;
  mostrarSenha = false;
  confirmacao = '';
  iniciais = iniciais;

  dados: CadastroUsuarioRequest = {
    nome: '',
    login: '',
    senha: '',
    frase: '',
    bioTitulo: '',
    bio: '',
  };

  get senhasDiferentes(): boolean {
    return this.confirmacao.length > 0 && this.confirmacao !== this.dados.senha;
  }

  salvar(): void {
    if (this.dados.senha !== this.confirmacao) {
      this.erro = 'As senhas não conferem.';
      return;
    }
    this.erro = '';
    this.salvando = true;
    this.usuarioService.cadastrar(this.dados).subscribe({
      next: () => this.router.navigate(['/perfil']),
      error: (e) => {
        this.erro = mensagemDeErro(e);
        this.salvando = false;
      },
    });
  }
}
