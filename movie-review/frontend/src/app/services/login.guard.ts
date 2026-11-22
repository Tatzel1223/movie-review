import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from './usuario.service';

export const exigeLogin: CanActivateFn = () => {
  const usuarioService = inject(UsuarioService);
  return usuarioService.logado() ? true : inject(Router).createUrlTree(['/entrar']);
};
