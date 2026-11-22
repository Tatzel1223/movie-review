package br.edu.unifio.moviereview.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "resenha")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Resenha {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @ManyToOne(optional = false)
    @JoinColumn(name = "titulo_id", nullable = false)
    private Titulo titulo;

    @Column(nullable = false, length = 120)
    private String manchete;

    @Column(nullable = false, length = 2000)
    private String texto;

    @Column(nullable = false)
    private Integer nota;

    @Column(nullable = false)
    private Integer curtidas;

    @Column(name = "criada_em", nullable = false)
    private LocalDateTime criadaEm;
}
