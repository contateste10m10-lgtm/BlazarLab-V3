# Auditoria editorial — BlazarLab v1.3.37

## Escopo

Esta versão parte do pacote V1.3.36 com os ícones de menu já corrigidos conforme as referências visuais fornecidas. A revisão concentra-se na precisão dos rótulos científicos apresentados ao público e na explicação da notação amostral.

## Alterações

- Textos da metodologia e dos resultados identificam a dimensão de incorporação da Sample Entropy como `m_SE`.
- O mapa de sensibilidade usa `m_SE` nos seus rótulos textuais e acessíveis, mantendo as variáveis internas de cálculo intactas.
- A área de resultados mantém o número `N = 720` e acrescenta: “N é o tamanho amostral reportado para esta correlação; o estudo descreve 721 curvas no total.” A frase explica a leitura da notação, sem especular sobre a causa da diferença.
- Permanecem inalterados o valor `p ≈ 10⁻¹¹⁸`, os coeficientes de associação, as estatísticas por classe e os demais números reportados.

## Integridade científica

Nenhuma fórmula, parâmetro numérico, amostra sintética, série demonstrativa ou resultado publicado foi recalculado ou alterado. A mudança é editorial e de acessibilidade. O pacote conserva a separação explícita entre resultados observacionais reportados e demonstrações sintéticas.

## Testes

Resultado de execução: os 23 scripts de teste distintos passaram sem falhas, incluindo o teste editorial novo. O teste de fumaça foi repetido em seis larguras (320, 390, 430, 600, 768 e 1024 px), também sem falhas. Foram aprovadas ainda as verificações de sintaxe JavaScript, integridade estática, links, recursos locais, ícones, acessibilidade, zoom, tela cheia, exportação PNG e interações dos gráficos. Essa rodada é automatizada; ela não substitui uma inspeção manual em dispositivos reais.
