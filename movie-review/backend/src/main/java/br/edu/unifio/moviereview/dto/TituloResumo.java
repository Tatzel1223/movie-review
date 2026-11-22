package br.edu.unifio.moviereview.dto;

public interface TituloResumo {
    Long getId();
    String getNome();
    String getTipo();
    Integer getAnoLancamento();
    Integer getTemporadas();
    String getSinopse();
    String getImagem();
    Long getGeneroId();
    String getGenero();
    Number getMedia();
    Number getCurtidas();
    Number getTotalResenhas();
}
