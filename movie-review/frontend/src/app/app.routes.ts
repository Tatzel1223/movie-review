import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { TitulosComponent } from './pages/titulos/titulos.component';
import { TituloFormComponent } from './pages/titulo-form/titulo-form.component';
import { ResenhaFormComponent } from './pages/resenha-form/resenha-form.component';
import { UsuarioFormComponent } from './pages/usuario-form/usuario-form.component';
import { EntrarComponent } from './pages/entrar/entrar.component';
import { exigeLogin } from './services/login.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'entrar', component: EntrarComponent },
  { path: 'usuarios/novo', component: UsuarioFormComponent },
  { path: 'perfil', component: PerfilComponent, canActivate: [exigeLogin] },
  { path: 'filmes', component: TitulosComponent, data: { tipo: 'FILME' } },
  { path: 'series', component: TitulosComponent, data: { tipo: 'SERIE' } },
  { path: 'busca', component: TitulosComponent, data: { tipo: '' } },
  { path: 'titulos/novo', component: TituloFormComponent, canActivate: [exigeLogin] },
  { path: 'titulos/:id/editar', component: TituloFormComponent, canActivate: [exigeLogin] },
  { path: 'resenhas/nova', component: ResenhaFormComponent, canActivate: [exigeLogin] },
  { path: 'resenhas/:id/editar', component: ResenhaFormComponent, canActivate: [exigeLogin] },
  { path: '**', redirectTo: 'inicio' },
];
