# BlazarLab V3 — Relatório de auditoria e correções v1.3.40

**Data:** 20 de outubro de 2026  
**Base de trabalho:** pacote BlazarLab v1.3.39 salvo no espaço do projeto, conferido visualmente contra a publicação `https://contateste10m10-lgtm.github.io/BlazarLab-V3/`.  
**Versão resultante:** `1.3.40`.

## Resumo executivo

A página pública foi examinada e a base de código mais recente disponível no projeto passou por nova suíte estática e por testes com Chromium/Playwright. Foram corrigidos três pontos visuais/funcionais que os testes anteriores não estavam identificando: recoloração rosa dos gráficos quando a paleta Rosa Cósmico era ativada, ilustrações AGN/Nebulosa pouco visíveis em telas estreitas porque a imagem se dimensionava pela altura da página inteira, e fundos com um retângulo escuro opaco que produziam uma faixa cinza no tema claro.

Também foram atualizados os metadados `canonical`, `og:url`, `og:image` e `twitter:image` para o caminho real do projeto V3 (`/BlazarLab-V3/`).

## Correções aplicadas

### 1. Cores dos gráficos independentes da paleta da interface

- Removidas as tabelas `SECRET_CHART_COLORS_DARK` e `SECRET_CHART_COLORS_LIGHT` e o mecanismo que percorria/recoloria SVGs já renderizados.
- `chartDisplayColor()` conserva as cores das séries no tema escuro e só aplica o mapa de contraste predefinido no tema claro. A escolha de Azul/Rosa e os fundos AGN/Nebulosa não modificam as cores científicas.
- A exportação PNG deixou de ter uma paleta de séries especial para Rosa Cósmico.
- O realce do ponto selecionado na lente SampEn passou de rosa explícito para azul-ciano (`#61B9DF`), evitando um elemento rosa fixo dentro de um gráfico.
- O callback `recolorExistingChartsForSecretPalette()` permanece apenas como *no-op* de compatibilidade para os pontos de integração existentes; ele não altera os SVGs.

### 2. Visibilidade de AGN/Nebulosa no mobile

- Em larguras de até 780 px, o corpo da página deixa de dimensionar a imagem de fundo com `background-size: cover` sobre toda a altura do documento.
- A ilustração passa para a camada `body::before`, fixa ao *viewport*, mantendo a escala baseada na janela visível mesmo quando o documento é muito comprido.
- Foram preservadas as artes azuis para Azul original e as artes rosa/vinho para Rosa Cósmico.
- Variantes transparentes para o tema claro removem o retângulo de preenchimento escuro original, evitando que o SVG escureça o fundo claro.
- A Nebulosa recebeu versões móveis com nuvens/contornos reforçados de forma moderada. O efeito permanece abstrato e não encobre o texto; superfícies, painéis e cartões continuam assegurando o contraste.

### 3. Destaques rosa-vermelhos no modo indicado

Somente em **tema escuro + Rosa Cósmico + fundo AGN ou Nebulosa**, o token de realce da interface muda para `#F43F5E` (rosa-vermelho vivo). O contraste calculado desse tom com o fundo `#160914` é aproximadamente **5,28:1**. O botão principal usa o mesmo tom e texto escuro para manter legibilidade. O tom não altera dados ou séries gráficas.

### 4. Metadados e documentação

- Canonical e metadados sociais agora apontam para `/BlazarLab-V3/`, não `/BlazarLab_13/`.
- `README.md`, `README-GITHUB-UPLOAD.md`, `CHANGELOG.md`, `VERSION` e `CORRECTIONS_APPLIED.md` foram alinhados à v1.3.40.
- Os testes que antes esperavam o remapeamento rosa foram reescritos para proteger o comportamento pretendido.

## Resultados de teste

### Autotestes de código

**26 de 26 testes `.cjs` passaram**; `node --check blazarlab.js` também passou. A integridade do ZIP final foi verificada após a geração: nenhum erro de CRC ou arquivo corrompido. A suíte inclui:

`accessibility-responsive`, `consistency-regression`, `editorial-results-regression`, `experimental-motion-lab`, `fullscreen-regression`, `heatmap-mobile-regression`, `link-asset-audit`, `method-animation-regression`, `method-showcase`, `mobile-astronomy-background`, `mobile-matrix-css-regression`, `mobile-zoom-regression`, `motion-state-regression`, `multiband-palette-stability`, `navigation-icon-animation`, `palette-background-independence`, `performance-optimizations`, `png-theme-export`, `reference-layout-regression`, `references-class-mobile-regression`, `responsive-geometry`, `secret-palette-sound`, `site-integrity`, `smoke-test`, `source-band-mobile-matrix` e `theme-backgrounds-responsive`.

### Interações reais no Chromium em emulação mobile

**20 de 20 verificações passaram**, sem erros de console nem exceções de JavaScript na página. Foram testados carregamento dos gráficos, abertura/fechamento do menu móvel, alternância de Azul/Rosa, AGN/Nebulosa/Sem fundo e tema claro, estabilidade das cores de todas as oito séries multibanda ao alternar paleta/fundo e aplicação do token `#F43F5E` apenas no modo escuro + Rosa + fundo astronômico.

Para manter esta rodada reproduzível e rápida, o teste de interação desativou **apenas o lote adiado de cálculo populacional sintético**; a curva ativa e os gráficos da página foram renderizados e exercitados. Os testes `smoke-test.cjs` da suíte também passaram para os fluxos e cálculos principais.

### Responsividade e visibilidade dos fundos

**40 combinações de renderização** foram verificadas em oito larguras: **320, 360, 390, 430, 600, 768, 1024 e 1280 px**. As oito combinações de tema/paleta/fundo (claro/escuro × Azul/Rosa × AGN/Nebulosa) foram capturadas nas larguras de 390 e 1280 px; os tamanhos restantes testaram os quatro estados escuros dos fundos (Azul/Rosa × AGN/Nebulosa).

| Verificação | Resultado |
|---|---:|
| Casos de renderização responsiva | 40 |
| Casos com rolagem horizontal indevida | 0 |
| Camada de fundo móvel não fixa | 0 |
| Caso móvel sem arte SVG ativa | 0 |
| Testes de código aprovados | 26/26 |
| Interações em Chromium aprovadas | 20/20 |
| Erros de console / exceções JS observados | 0 / 0 |

Foram produzidas capturas do primeiro ecrã móvel e da seção de métodos, além de uma matriz visual das oito combinações em 390 px.

## Limitações e estado de publicação

- A validação usa Chromium em ambiente Linux e emulação de tamanhos de tela; **não** equivale a uma verificação em iPhone/Safari, Android físico, VoiceOver ou TalkBack.
- O endereço V3 foi aberto para conferência visual, mas o pacote desta conversa foi preparado a partir da última base v1.3.39 salva no espaço do projeto. Não foi possível ler os arquivos JS/CSS publicados diretamente pela ferramenta de pesquisa, então não declaro uma comparação binária entre o deploy e o ZIP.
- **Nada foi enviado ao GitHub nesta rodada.** O site online continuará com os arquivos publicados anteriormente até que o conteúdo de `blazarlab_v1.3.40/` seja enviado à raiz do repositório `BlazarLab-V3`, conforme `README-GITHUB-UPLOAD.md`.
- Nenhuma fórmula dos três métodos, parâmetro científico ou série sintética foi modificada.

## Evidências incluídas

O pacote de auditoria contém o log completo dos 26 autotestes, o JSON das 20 interações, a matriz de 40 renderizações, as capturas móveis/desktop, a captura móvel interativa e a folha de comparação.
