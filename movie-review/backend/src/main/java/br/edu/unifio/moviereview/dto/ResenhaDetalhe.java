package br.edu.unifio.moviereview.dto;

public interface ResenhaDetalhe {
    Long getId();
    String getManchete();
    String getTexto();
    Integer getNota();
    Integer getCurtidas();
    Long getTituloId();
    String getTitulo();
    String getTipo();
    String getGenero();
    String getImagem();
    Long getUsuarioId();
    String getAutor();
}
