# BlazarLab V1.3.33 — validação das animações e acessibilidade

## Mudanças
- Um único controlador sincroniza `prefers-reduced-motion` e a classe `reduce-motion`.
- Alternar a preferência com a página aberta limpa a camada antes de reiniciá-la.
- Timers de revelação são cancelados durante a limpeza.
- Cartões com transformação de interação usam entrada somente por opacidade.
- Foco de teclado em conteúdo ainda não revelado força exposição imediata; `focusout` libera o estado de foco transitório.
- Os artigos introdutórios não interativos não recebem `tabindex=0`.

## Validações automatizadas
- Teste estático da camada experimental e dos seletores CSS.
- Teste de regressão comportamental via ambiente simulado: preferência reduzida ligada/desligada, foco, timers, hover por classes de efeito e fallback sem `IntersectionObserver`.
- Suíte geral do projeto e smoke tests em larguras móveis/tablet.

## Limitação
A simulação DOM não substitui a inspeção visual em dispositivos físicos. A conferência visual automatizada do Chromium será reportada separadamente caso não conclua.
