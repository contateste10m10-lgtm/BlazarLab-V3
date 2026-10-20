# BlazarLab V1.3.34 — tipografia móvel das matrizes

## Alteração
As regras de tamanho de fonte da matriz fonte × banda estavam distribuídas entre várias adições históricas do CSS. Nesta versão, as regras foram consolidadas num bloco único junto ao componente. A base tipográfica e os ajustes para `max-width:480px` e `max-width:380px` ficam explícitos, e as regras de estrutura/rolagem continuam separadas das regras de fonte.

## Preservado
- 24 fontes sintéticas e oito bandas.
- 192 botões/células e seleção sincronizada.
- Primeira coluna fixa, rolagem horizontal interna e alvos de toque de pelo menos 44 px.
- Geometria, fórmulas e séries sintéticas inalteradas.

## Testes
- `tests/mobile-matrix-css-regression.cjs` confere a existência de um único conjunto base e dois breakpoints intencionais por família tipográfica.
- A suíte de regressão geral continua cobrindo inicialização, seleção, acessibilidade, temas, fundos, zoom e cálculo dos métodos.

## Limitação
Os testes automatizados e de DOM não substituem a verificação em aparelhos físicos. A tentativa de captura de tela no Chromium não concluiu neste ambiente; portanto, esta versão não é descrita como tendo passado por uma inspeção visual automatizada concluída.
