# BlazarLab — vitrine pública (v1.3.40)

O BlazarLab é uma vitrine pública de divulgação científica sobre três perspectivas complementares para analisar variabilidade de blazares: **Sample Entropy (SampEn)**, **Fisher–Shannon** e **MSE-WPE / Complexity Index (CI)**. A versão 1.3.40 disponibiliza desde o primeiro acesso as opções de paleta, fundos astronômicos e som opcional; preserva cores estáveis na curva multibanda ao alternar AGN e Nebulosa. Ela mantém os refinamentos científicos de `m_SE` e `m_int`, a nota contextual do tamanho amostral, as correções de acessibilidade e responsividade, e os ícones vetoriais com microanimações. A revelação progressiva de conteúdos, o traçado inicial da curva de luz do banner, a deriva orbital discreta e as animações didáticas são preservados. Os efeitos novos respeitam a preferência de movimento reduzido e não exigem dependências externas.

A página mantém temas claro e escuro, usando séries sintéticas demonstrativas nas oito bandas de energia. Elas não substituem dados observacionais nem os cálculos da ferramenta interna. Os resultados reportados de manuscritos são identificados separadamente das demonstrações.



## V1.3.40 — paleta azul independente dos fundos e precisão estatística

- AGN e Nebulosa mantêm a ilustração no Azul original, mas com variantes azuis equivalentes da própria arte e superfícies frias; os SVGs rosa/vermelho originais e o tratamento rosa/vinho são usados quando Rosa cósmico está selecionado.
- O cartão SampEn identifica o p bicaudal de Pearson como valor calculado a partir de `r_P` e `N`, sem apresentá-lo como transcrição do resumo; não é inventado p para Spearman.
- O tema preserva contraste, cores semânticas dos heatmaps e persistência independente de tema, paleta e fundo.
- Consulte `updates/AUDITORIA_PALETA_FUNDO_1.3.40.md` e `updates/AUDITORIA_CIENTIFICA_FONTES_1.3.40.md`.

## V1.3.38 — opções visuais e estabilidade da curva multibanda

- Os controles de Azul original/Rosa cósmico, fundos AGN/Nebulosa e som de interação ficam disponíveis desde o primeiro acesso, sem sequência de desbloqueio.
- A paleta e o fundo escolhidos são lembrados entre visitas. O som permanece desligado até ativação expressa, para evitar reprodução inesperada.
- A curva multibanda principal mantém a mesma seleção de cores quando o fundo alterna entre AGN e Nebulosa com Rosa cósmico; os outros gráficos continuam respondendo à paleta global.
- Zoom, reset, tela cheia e exportação PNG são preservados.

## V1.3.37 — precisão científica dos rótulos

- A dimensão de incorporação da Sample Entropy agora aparece como `m_SE`, separada visual e textualmente do índice de modulação intrínseca `m_int`.
- O bloco da correlação explica que `N = 720` é o tamanho amostral reportado para essa análise, embora a amostra total descrita inclua 721 curvas; o texto não presume uma causa não documentada para essa diferença.
- Os desenhos corrigidos do telescópio em **Explorar** e do gráfico em **Resultados** são preservados.
- Não houve mudanças em dados observacionais reportados, séries sintéticas, fórmulas ou resultados numéricos.

## V1.3.36 — ícones de navegação e microanimações

- Integra as correções de estabilidade das animações e acessibilidade da V1.3.33 com os refinamentos tipográficos de matrizes da V1.3.34 e os ícones de navegação desta versão.
- A preferência de movimento reduzido permanece sincronizada durante a sessão; temporizadores são cancelados corretamente e a revelação não compete com os efeitos de hover.
- O foco de teclado revela os contêineres necessários, e cartões educativos não interativos não criam paradas de foco redundantes.
- A tipografia da matriz fonte × banda está centralizada, mantendo 24 fontes, oito bandas, seleção acessível, coluna identificadora fixa e rolagem localizada.
- Os ícones do menu usam SVG inline e `currentColor`; a microanimação afeta apenas a transformação do ícone, sem substituir cores de tema, paleta ou fundo. Em movimento reduzido, o efeito fica desativado.
- As fórmulas, os parâmetros e as séries sintéticas não foram alterados.


## Novidades V1.3.32 — laboratório experimental de animações

- Revelação gradual de cartões e blocos editoriais quando entram na área visível, com atraso leve entre itens relacionados. Painéis multibanda e gráficos controlados por abas ficam fora dessa camada para não ocultar visualizações inativas.
- Traçado animado da curva de luz ilustrativa do hero e destaque breve de seus pontos de referência.
- Movimento orbital breve e de execução única na ilustração do hero, para acrescentar profundidade sem movimento contínuo permanente.
- Os efeitos são decorativos: não alteram dados, eixos, métricas ou resultados científicos. A linha de luz já é identificada como ilustrativa na interface.
- A preferência `prefers-reduced-motion` e a classe `html.reduce-motion` desativam os efeitos novos e tornam os conteúdos imediatamente visíveis. Se `IntersectionObserver` não estiver disponível, as revelações são omitidas e todo o conteúdo permanece visível.
- Esta é uma versão experimental para comparação visual; a base estável anterior não foi sobrescrita.
- Teste novo: `tests/experimental-motion-lab.cjs`.

## Novidades V1.3.31 — auditoria visual no Chromium

- Renderização da página no Chromium headless em dez larguras: 320, 360, 390, 430, 600, 768, 899, 1024, 1280 e 1440 px.
- A largura de rolagem do documento permaneceu igual à viewport em todos os cenários. As matrizes e gráficos com muitas colunas usam rolagem localizada intencional, sem causar rolagem horizontal da página.
- Tema claro/escuro e menu móvel foram exercitados; não foram observados erros JavaScript no console.
- O Chromium bloqueou navegação direta para `file://` e `localhost`, por isso a auditoria incorporou temporariamente os mesmos HTML/CSS/JavaScript e recursos locais num documento de teste. Isso permite validar layout real no motor Chromium, mas não substitui uma verificação de rede/servidor em produção.
- Nenhum defeito visual reproduzível exigiu alterar a interface. As animações foram preservadas para uma versão experimental posterior.
- Veja `updates/AUDITORIA_CHROMIUM_1.3.31.md` e as capturas de evidência em `evidencias-chromium/`.

## Novidades V1.3.30 — auditoria de integridade do pacote

- Adicionado `tests/link-asset-audit.cjs`, que verifica IDs duplicados, âncoras internas ausentes, links vazios, recursos HTML/CSS locais, atributos de segurança em links abertos em novas abas e metadados canônicos de produção.
- O novo teste foi incluído no workflow de qualidade do GitHub Actions.
- Revisão estática do pacote: os links internos e recursos locais existentes foram encontrados; as seis referências DOI estão direcionadas aos registros metodológicos correspondentes.
- Não foram alterados `index.html`, `styles.css` ou `blazarlab.js`: não foi identificado defeito estático que justificasse uma mudança de comportamento e a inspeção visual interativa no Chromium ficou impedida pela política administrativa do ambiente de auditoria. Consulte `updates/AUDITORIA_1.3.30.md` para detalhes e limitações.
- A etapa de redesenho ou inclusão de animações fica intencionalmente adiada para uma versão de teste posterior.
- Nenhuma fórmula, parâmetro científico ou série sintética foi alterada.

## Endereços de publicação

- **Produção/canônico:** `https://contateste10m10-lgtm.github.io/BlazarLab-V3/` — é o destino de `rel="canonical"` e `og:url`.
- **Revisão/prévia:** `https://contateste10m10-lgtm.github.io/teste-2000/` — pode ser usada para conferir alterações antes de publicar em produção.

Ao publicar uma versão, copie juntos todos os arquivos do mesmo pacote. A página de revisão não deve ser tratada como prova de que a versão de produção já foi atualizada.

## Novidades V1.3.29 — rastreabilidade e legibilidade móvel

- Os cartões de resumo agora apontam para referências metodológicas verificadas; nenhum link de texto integral foi inventado.
- A seção esclarece que os resumos fornecidos pelo grupo não substituem os manuscritos completos e que esta versão não inclui URLs públicas verificadas para os três textos integrais.
- A classe sintética antes rotulada apenas como AGN passa a ser identificada como “AGN genérico”, sem alterar a chave de classe nem os dados gerados.
- A matriz fonte × banda reforça a legibilidade dos rótulos de fonte, classe e valores, mantendo células selecionáveis e rolagem horizontal localizada.
- A documentação distingue o endereço de produção (BlazarLab-V3) do endereço de revisão (teste-2000), preservando os metadados canônicos de produção.
- Nenhuma fórmula, parâmetro científico ou série sintética foi alterada.

## Novidades V1.3.28 — revisão editorial e acabamento móvel

- Corrigida a referência bibliográfica EntropyHub e adicionada uma fonte fundamental para entropia de permutação.
- Separados os rótulos inferiores da ilustração principal, eliminando a colisão entre legenda e identificador.
- Na matriz fonte × banda, a unidade de energia é apresentada uma única vez; cabeçalhos e identificadores têm melhor legibilidade em celulares.
- O link do rodapé para referências e créditos recebeu uma área de toque ampliada.
- O histórico da V1.3.24 foi consolidado num único cabeçalho, sem excluir as correções registradas.
- Nenhuma fórmula científica ou série sintética foi alterada.

## Novidades V1.3.27 — matrizes móveis e navegação acessível

- O heatmap fonte × banda usa uma tabela HTML responsiva em telas estreitas, com células selecionáveis, nomes de fonte fixos na borda da matriz e navegação pelo teclado.
- A versão SVG do heatmap permanece disponível em desktop; a representação móvel preserva os valores e sincroniza a fonte e a banda com os demais gráficos.
- As células da sensibilidade m × r receberam alvos verticais ampliados e rolagem localizada quando necessária, sem aumentar a largura da página.
- Adicionado teste de regressão dedicado às 192 combinações fonte × banda e ao comportamento móvel.
- Nenhuma fórmula científica ou série sintética foi alterada.

## Novidades V1.3.25 — consistência científica, fontes e CI

- Corrigida a referência residual a 240 pontos: as curvas sintéticas selecionadas e a galeria usam 144 pontos por banda.
- Adicionadas URL canônica, `og:url` e imagem de compartilhamento PNG com endereços absolutos.
- Os cartões mantêm os resumos dos manuscritos sem inventar DOI ou URL integral; atalhos bibliográficos não verificados não fazem parte da vitrine pública.
- Reforçada a separação visual entre dados sintéticos Swift/BAT-like e estatísticas reportadas de rádio OVRO a 15 GHz.
- Estimativas WPE inválidas deixam de ser silenciosamente convertidas em zero; o CI só é informado quando as oito escalas são válidas.
- O workflow de qualidade executa também os testes de geometria responsiva, zoom móvel, paleta/sons e fundos/tema.

## Novidades V1.3.24 — leitura das matrizes e acessibilidade móvel

- Gráficos SVG passam a acompanhar a largura real do cartão, melhorando a legibilidade em celulares, tablets e painéis de meia largura.
- Matrizes extensas mantêm rolagem localizada; as células selecionáveis continuam disponíveis e com alvos de toque ampliados.
- Corrigido o cabeçalho em larguras intermediárias de tablet.
- Controles por toque reforçados e geometria redesenhada após mudanças significativas de largura, preservando o zoom.
- Temas, simulações didáticas, tabelas sob demanda e exportação PNG permanecem disponíveis. Nenhuma fórmula ou parâmetro científico foi alterado.
## Principais recursos preservados

- Três métodos complementares e oito bandas de energia com séries demonstrativas identificadas como sintéticas.
- Alternância de tema claro/escuro e exportação PNG que acompanha a paleta ativa.
- Tabelas acessíveis sob demanda e cálculos populacionais em lotes após a primeira visualização.
- Gráficos interativos, zoom, tela cheia e matriz de sensibilidade `m × r`.
- Site público separado da ferramenta interna de cálculos.

## Novidades V1.3.18
- Nova trilha didática: o que é um blazar, por que sua variabilidade importa e que tipos de informação podemos extrair das curvas de luz.
- Animações específicas para SampEn (bandas A e B e relação A/B), Fisher–Shannon (distribuição e gradiente) e MSE-WPE/CI (agregação em escalas). Clicar no corpo de um cartão também inicia sua simulação.
- Corrigida a visualização compacta do mapa de sensibilidade m × r: as dez tolerâncias agora cabem na largura móvel, sem deixar metade do gráfico escondida na rolagem horizontal.
- Animações com respeito à preferência de redução de movimento e descrições acessíveis.


- Três métodos com identificação tipográfica explícita e animações curtas acionadas por clique/toque tanto nos ícones quanto nos diagramas ilustrativos; foco de teclado e preferência por movimento reduzido respeitados.
- Cartões dos três manuscritos distribuídos como triângulo invertido em telas amplas, com adaptação para coluna única em telas estreitas.
- Links do menu indicam a seção ativa, e o botão móvel mantém as três barras empilhadas e se transforma em “X” quando aberto.
- Geometria dos gráficos baseada na largura do contêiner via `ResizeObserver`, com layout específico para a lente SampEn, rótulos curtos por banda e maior margem para o mapa m × r.
- Melhorado o contraste do rodapé, ampliadas áreas de toque e corrigido o espaçamento do título principal em telas estreitas.

- Corrigida a exportação de gráficos PNG para usar a paleta do tema ativo: fundo, grades, rótulos, eixos, tooltips e contornos.
- Cores explícitas de séries já renderizadas são adaptadas no arquivo exportado ao tema claro, sem alterar as cores de gradientes que codificam valores em heatmaps.
- Mantidas as melhorias de acessibilidade, responsividade, temas, sincronização multibanda e cálculos demonstrativos. Nenhuma fórmula científica foi alterada.

- Melhorada a navegação móvel: cabeçalho em grelha, seletor de tema e menu dimensionados para toque, e menu limitado à altura disponível.
- Botão do menu anuncia corretamente “Abrir navegação” / “Fechar navegação”, pode ser fechado por Escape e fecha após navegação ou clique fora.
- Reforçado o foco de teclado nos links, controles, seletores, tabelas e ferramentas de gráfico.
- Tabelas de dados geradas para gráficos agora incluem título/caption semântico, cabeçalhos de linha e região rolável acessível pelo teclado.
- Gráficos com controles SVG internos são identificados como grupos acessíveis, mantendo descrições e instruções.
- Implementada navegação por setas com foco móvel em heatmaps interativos (fonte × banda, banda × escala e sensibilidade multibanda).
- Corrigido o conflito em que as setas do zoom do SVG podiam interceptar a navegação por teclado dos elementos gráficos internos.
- A preferência de movimento reduzido é atualizada se a configuração do sistema mudar durante a sessão.
- Melhorada a legibilidade em telas estreitas, com títulos fluídos, textos auxiliares maiores e preservação da rolagem horizontal localizada para matrizes extensas.
- Preservados temas, métodos, fórmulas, parâmetros, dados demonstrativos, tabelas científicas, zoom, tela cheia e exportação PNG.

## Novidades V1.3.19 — desempenho em celulares
- A geração das curvas continua determinística, mas os cálculos KDE da população são executados em lotes ociosos após a primeira exibição.
- O trabalho de fundo pausa quando a página está oculta e retoma quando volta a ficar visível.
- As tabelas acessíveis só montam suas linhas quando o usuário abre “Consultar os dados em tabela”; tabelas abertas são atualizadas somente quando os dados mudam.
- A animação de pontos de Sample Entropy passou a ter duração finita. O cartão/ícone oferece feedback breve; o diagrama abre a simulação específica.
- Atualizado o teste móvel para a geometria final de 430 unidades do mapa m × r.

## Conteúdo do pacote

- `index.html` — página pública.
- `styles.css` — identidade visual, temas, acessibilidade visual e comportamento responsivo.
- `blazarlab.js` — visualizações, cálculos demonstrativos e interações.
- `assets/` — ícones e prévia para compartilhamento.
- `tests/` — verificações estáticas, testes de fumaça, tela cheia, acessibilidade e responsividade.
- `CHANGELOG.md`, `VERSION`, `LICENSE` — histórico, versão e licença.

## Publicação no GitHub Pages

1. Use o repositório separado do site público; não substitua a ferramenta interna.
2. Extraia o ZIP e envie os arquivos para a raiz do repositório (`index.html` na raiz).
3. Em **Settings → Pages**, escolha a branch principal e a pasta `/(root)`.
4. Teste os temas claro e escuro, navegação por teclado, heatmaps, zoom, reset, tela cheia e exportação PNG em desktop e celular.

## Testes locais

Com Node.js instalado, execute na raiz do projeto:

```sh
node --check blazarlab.js
node tests/site-integrity.cjs
node tests/reference-layout-regression.cjs
node tests/references-class-mobile-regression.cjs
node tests/consistency-regression.cjs
node tests/heatmap-mobile-regression.cjs
node tests/source-band-mobile-matrix.cjs
node tests/responsive-geometry.cjs
node tests/mobile-zoom-regression.cjs
node tests/theme-backgrounds-responsive.cjs
node tests/performance-optimizations.cjs
node tests/png-theme-export.cjs
node tests/method-showcase.cjs
node tests/method-animation-regression.cjs
node tests/accessibility-responsive.cjs
node tests/smoke-test.cjs
node tests/fullscreen-regression.cjs
VIEWPORT_WIDTH=320 node tests/smoke-test.cjs
VIEWPORT_WIDTH=390 node tests/smoke-test.cjs
VIEWPORT_WIDTH=430 node tests/smoke-test.cjs
VIEWPORT_WIDTH=600 node tests/smoke-test.cjs
VIEWPORT_WIDTH=768 node tests/smoke-test.cjs
VIEWPORT_WIDTH=1024 node tests/smoke-test.cjs
```

Os testes automatizados verificam a estrutura, as funções científicas demonstrativas, interações e regressões conhecidas. Eles não substituem a inspeção visual em navegadores reais nem testes com leitores de tela; valide esses pontos em desktop e celular antes de declarar conformidade WCAG.
## Escopo científico

Os dados da galeria são sintéticos, reproduzíveis e identificados no site. Estatísticas resumidas nos cartões de resultados são apresentadas como resultados reportados nos estudos do grupo e não são recalculadas com os sinais sintéticos. Os coeficientes mostrados no painel comparativo descrevem associações, não causalidade; as três métricas não são equivalentes.


Na V1.3.38, as opções visuais ficam disponíveis desde o primeiro acesso. Paleta e fundo são persistentes; o som segue opcional e inicia desligado.

O som de interação continua opcional e desligado até que a pessoa o ative.
