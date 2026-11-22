import { Component, OnInit, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UsuarioService } from './services/usuario.service';
import { iniciais } from './models/models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  usuarioService = inject(UsuarioService);
  private router = inject(Router);

  buscaAberta = false;
  menuAberto = false;
  termo = '';
  iniciais = iniciais;
  iniciaisUsuario = computed(() => iniciais(this.usuarioService.usuario()?.nome ?? ''));

  ngOnInit(): void {
    this.usuarioService.carregar();
  }

  alternarBusca(): void {
    if (this.buscaAberta && this.termo.trim()) {
      this.buscar();
      return;
    }
    this.buscaAberta = !this.buscaAberta;
  }

  buscar(): void {
    const termo = this.termo.trim();
    if (!termo) return;
    this.router.navigate(['/busca'], { queryParams: { q: termo } });
  }

  sair(): void {
    this.usuarioService.sair();
    this.menuAberto = false;
    this.router.navigate(['/entrar']);
  }
}
