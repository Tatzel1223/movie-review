import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Genero, Tipo, TituloRequest, gradienteDoGenero, mensagemDeErro } from '../../models/models';
import { TituloService } from '../../services/titulo.service';
import { GeneroService } from '../../services/genero.service';

@Component({
  selector: 'app-titulo-form',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './titulo-form.component.html',
})
export class TituloFormComponent implements OnInit {
  private tituloService = inject(TituloService);
  private generoService = inject(GeneroService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  id: number | null = null;
  generos: Genero[] = [];
  erro = '';
  salvando = false;

  dados: TituloRequest = {
    nome: '',
    tipo: 'FILME',
    anoLancamento: null,
    temporadas: null,
    sinopse: '',
    imagem: null,
    generoId: null,
  };

  imagemUrl = '';

  ngOnInit(): void {
    const tipo = this.route.snapshot.queryParamMap.get('tipo');
    if (tipo === 'SERIE' || tipo === 'FILME') this.dados.tipo = tipo as Tipo;

    this.generoService.listar().subscribe({
      next: (generos) => (this.generos = generos),
      error: (e) => (this.erro = mensagemDeErro(e)),
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.id = Number(id);
      this.tituloService.buscar(this.id).subscribe({
        next: (t) => {
          this.imagemUrl = t.imagem && !t.imagem.startsWith('data:') ? t.imagem : '';
          this.dados = {
            nome: t.nome,
            tipo: t.tipo,
            anoLancamento: t.anoLancamento,
            temporadas: t.temporadas,
            sinopse: t.sinopse ?? '',
            imagem: t.imagem,
            generoId: t.genero.id,
          };
        },
        error: (e) => (this.erro = mensagemDeErro(e)),
      });
    }
  }

  get nomeGenero(): string {
    return this.generos.find((g) => g.id === this.dados.generoId)?.nome ?? '';
  }

  get gradiente(): string {
    return gradienteDoGenero(this.nomeGenero);
  }

  get imagemDoComputador(): boolean {
    return !!this.dados.imagem && this.dados.imagem.startsWith('data:');
  }

  usarUrl(valor: string): void {
    this.dados.imagem = valor.trim() || null;
  }

  removerImagem(): void {
    this.dados.imagem = null;
    this.imagemUrl = '';
  }

  escolherArquivo(evento: Event): void {
    const campo = evento.target as HTMLInputElement;
    const arquivo = campo.files?.[0];
    campo.value = '';
    if (!arquivo) return;
    if (!arquivo.type.startsWith('image/')) {
      this.erro = 'Escolha um arquivo de imagem (JPG, PNG ou WEBP).';
      return;
    }

    const leitor = new FileReader();
    leitor.onload = () => {
      const imagem = new Image();
      imagem.onload = () => {
        const escala = Math.min(1, 600 / Math.max(imagem.width, imagem.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(imagem.width * escala);
        canvas.height = Math.round(imagem.height * escala);
        canvas.getContext('2d')?.drawImage(imagem, 0, 0, canvas.width, canvas.height);
        this.dados.imagem = canvas.toDataURL('image/jpeg', 0.85);
        this.imagemUrl = '';
        this.erro = '';
      };
      imagem.onerror = () => (this.erro = 'Não foi possível ler essa imagem.');
      imagem.src = leitor.result as string;
    };
    leitor.readAsDataURL(arquivo);
  }

  get rotaLista(): string {
    return this.dados.tipo === 'SERIE' ? '/series' : '/filmes';
  }

  salvar(): void {
    this.erro = '';
    this.salvando = true;
    const dados: TituloRequest = {
      ...this.dados,
      temporadas: this.dados.tipo === 'SERIE' ? this.dados.temporadas : null,
    };
    const requisicao = this.id ? this.tituloService.atualizar(this.id, dados) : this.tituloService.cadastrar(dados);

    requisicao.subscribe({
      next: () => this.router.navigate([this.rotaLista]),
      error: (e) => {
        this.erro = mensagemDeErro(e);
        this.salvando = false;
      },
    });
  }
}
