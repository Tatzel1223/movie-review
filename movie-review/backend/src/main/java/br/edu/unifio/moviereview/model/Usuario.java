package br.edu.unifio.moviereview.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "usuario")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 80)
    private String nome;

    @Column(unique = true, length = 50)
    private String login;

    @JsonIgnore
    @Column(length = 100)
    private String senha;

    @Column(length = 120)
    private String frase;

    @Column(name = "bio_titulo", length = 120)
    private String bioTitulo;

    @Column(length = 1000)
    private String bio;
}
