package br.edu.unifio.moviereview.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "titulo")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Titulo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String nome;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private Tipo tipo;

    @Column(name = "ano_lancamento", nullable = false)
    private Integer anoLancamento;

    private Integer temporadas;

    @Column(length = 1000)
    private String sinopse;

    @Column(columnDefinition = "MEDIUMTEXT")
    private String imagem;

    @ManyToOne(optional = false)
    @JoinColumn(name = "genero_id", nullable = false)
    private Genero genero;
}
