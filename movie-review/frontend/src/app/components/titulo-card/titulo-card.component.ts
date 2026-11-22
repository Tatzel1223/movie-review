import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  TituloResumo,
  formatarCurtidas,
  formatarNota,
  gradienteDoGenero,
  linkTrailer,
  nomeDoTipo,
} from '../../models/models';

@Component({
  selector: 'app-titulo-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './titulo-card.component.html',
})
export class TituloCardComponent {
  @Input({ required: true }) titulo!: TituloResumo;
  @Input() gerenciar = false;
  @Output() excluir = new EventEmitter<TituloResumo>();

  imagemFalhou = false;

  gradiente = gradienteDoGenero;
  curtidas = formatarCurtidas;
  nota = formatarNota;
  trailer = linkTrailer;
  tipo = nomeDoTipo;
}
