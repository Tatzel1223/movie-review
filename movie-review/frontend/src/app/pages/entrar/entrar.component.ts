import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginRequest, mensagemDeErro } from '../../models/models';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-entrar',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './entrar.component.html',
})
export class EntrarComponent {
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);

  dados: LoginRequest = { login: '', senha: '' };
  erro = '';
  entrando = false;
  mostrarSenha = false;

  entrar(): void {
    this.erro = '';
    this.entrando = true;
    this.usuarioService.entrar(this.dados).subscribe({
      next: () => this.router.navigate(['/perfil']),
      error: (e) => {
        this.erro = mensagemDeErro(e);
        this.entrando = false;
      },
    });
  }
}
