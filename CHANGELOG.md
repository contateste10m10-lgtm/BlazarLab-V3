## 1.3.40 — fundos legíveis no mobile e paleta separada dos gráficos (2026-10-20)

- Em dispositivos móveis, AGN e Nebulosa passam a usar uma camada fixa dimensionada à janela visível, evitando que a arte seja escalada pela altura inteira da página e fique imperceptível.
- As oito combinações entre tema claro/escuro, paleta Azul/Rosa e fundo AGN/Nebulosa usam a ilustração correta e uma sobreposição própria para preservar a leitura.
- Removido o remapeamento Rosa Cósmico dos traços, marcadores, classes e exportações PNG dos gráficos. As cores científicas das séries e as escalas dos mapas ficam independentes do fundo e da paleta de interface; ajustes de contraste para o tema claro continuam limitados às cores predefinidas.
- No modo escuro + Rosa Cósmico + AGN/Nebulosa, o destaque da interface passa para rosa-vermelho vivo (`#F43F5E`), sem alterar as cores dos dados.
- Corrigidos canonical, og:url e imagem social para o endereço `/BlazarLab-V3/`.
- Reescritos os testes de regressão para impedir que cores científicas voltem a ser remapeadas por paleta; adicionados cenários de geometria mobile e oito combinações de tema/paleta/fundo.
- Nenhuma fórmula, parâmetro científico ou série sintética foi alterada.

## 1.3.39 — paleta azul independente dos fundos e precisão estatística (2026-10-20)

- Ao escolher AGN ou Nebulosa com Azul original, cartões, seções e cabeçalho usam variantes azuis equivalentes da arte e superfícies frias/neutras; os SVGs rosa/vinho ficam reservados à paleta Rosa cósmico.
- O fundo ilustrado continua disponível nas quatro combinações de tema claro/escuro e paleta; as imagens AGN/Nebulosa e os gradientes semânticos dos heatmaps não são remapeados.
- O cartão SampEn associa explicitamente o p calculado a Pearson e `N=720`, e informa que ele é derivado do coeficiente, não copiado do resumo; não atribui p não documentado a Spearman.
- Incluídos testes de regressão de paleta/fundo e auditoria das fontes PDF consultadas.
- Nenhuma série sintética ou fórmula de cálculo dos três métodos foi alterada.

## 1.3.38 — opções visuais disponíveis e cores estáveis na curva multibanda (2026-10-20)

- Os controles de paleta, fundos astronômicos e som de interação ficam disponíveis desde a primeira visita, sem sequência de desbloqueio.
- A paleta e o fundo selecionados são lembrados na próxima visita. A identidade inicial continua Azul original, com fundo normal; o som permanece desligado até ativação explícita do usuário.
- A curva de luz multibanda (`multibandCurvePlot`) fica fora do remapeamento global dos SVGs. Ao usar Rosa cósmico, suas cores de banda são renderizadas de modo consistente e não mudam ao alternar entre os fundos AGN e Nebulosa; os demais gráficos continuam acompanhando a paleta selecionada.
- Preservados os ícones corrigidos, microanimações, temas claro/escuro, fundos locais, sons opcionais, zoom, tela cheia, exportação PNG e os três métodos científicos.
- Adicionados testes de regressão para controles disponíveis no carregamento, persistência das escolhas, isolamento da curva multibanda e oito larguras de viewport.
- Nenhuma fórmula, parâmetro científico ou série sintética foi alterada.

## 1.3.37 — precisão dos rótulos científicos e leitura da amostra (2026-10-20)

- Identificado explicitamente o parâmetro da Sample Entropy como `m_SE` nos textos metodológicos e nos resultados publicados, diferenciando-o de `m_int`, o índice de modulação intrínseca.
- Refinados os rótulos e descrições acessíveis do mapa de sensibilidade `m_SE × r`, sem alterar a dimensão usada no cálculo nem os resultados demonstrativos.
- Acrescentada uma nota para explicar que `N = 720` é o tamanho amostral reportado para a correlação, enquanto o resumo da amostra descreve 721 curvas no total. A nota esclarece a leitura, sem inventar o motivo da diferença.
- Preservados os ícones de Explorar (telescópio) e Resultados (gráfico combinado), microanimações, temas, paletas, fundos, dados sintéticos, cálculos e funcionalidades existentes.
- Adicionado teste de regressão editorial para impedir a regressão dos rótulos `m_SE` e da explicação de `N`.

## 1.3.36 — ícones de navegação e microanimações (2026-10-20)

- Adicionados seis ícones SVG minimalistas e acessíveis ao menu principal, preservando os rótulos textuais e a navegação por âncoras.
- Ao selecionar uma seção, o ícone recebe uma microanimação curta; em telas móveis, o menu permanece visível por um instante para que o feedback seja percebido antes de fechar.
- Os ícones usam `currentColor`, herdando a cor vigente do item de navegação sem impor cores fixas nem interferir nos estilos de aparência existentes.
- A microanimação respeita `prefers-reduced-motion`; ela não altera os cálculos, gráficos, zoom, seleções nem estados científicos.
- O breakpoint do cabeçalho compacto foi estendido até 1240 px para acomodar ícones e controles opcionais sem comprimir a navegação completa.
- Adicionado teste de regressão para presença de ícones, herança de cor, preferência de movimento reduzido e comportamento móvel.

### Correção visual posterior — 1.3.36

- Ajustados os SVGs de **Explorar** (telescópio) e **Resultados** (gráfico combinado de linha e barras) para corresponder às referências visuais fornecidas.
- Nenhuma mudança na navegação, na lógica de microanimação, nas cores, nos gráficos científicos ou nos cálculos.
- Acrescentadas asserções explícitas no teste `navigation-icon-animation.cjs` para esses dois desenhos.

## 1.3.35 — pacote integrado de estabilidade e responsividade (2026-10-20)

- Reúne num único pacote as correções de estabilidade das animações e acessibilidade introduzidas na V1.3.33 e os refinamentos de tipografia e matrizes móveis da V1.3.34.
- Mantém o controlador unificado de `prefers-reduced-motion`, a revelação acessível ao foco, o comportamento de hover e o cancelamento seguro de temporizadores.
- Inclui a cascata tipográfica consolidada para a matriz fonte × banda, com rolagem localizada e células acessíveis ao toque.
- Sem alterações nas fórmulas, parâmetros, séries sintéticas ou convenções científicas.

## 1.3.34 — tipografia e matrizes responsivas (2026-10-20)

- Consolidada a tipografia do heatmap fonte × banda, removendo regras de fonte duplicadas acumuladas em versões anteriores.
- O nome da fonte, a classe, os valores e os cabeçalhos da matriz móvel usam uma escala tipográfica centralizada com ajustes explícitos para telas estreitas.
- Preservados os alvos de toque, a coluna identificadora fixa, a rolagem localizada e os 192 valores selecionáveis.
- Incluído teste de regressão para impedir que a cascata tipográfica volte a acumular overrides conflitantes.
- Nenhuma fórmula, parâmetro, seleção ou série sintética foi alterada.

# Changelog — BlazarLab

## 1.3.33 — estabilidade das animações e acessibilidade (2026-10-20)

- Centralizada a atualização de `prefers-reduced-motion`; alterações da preferência durante a sessão agora sincronizam a camada de movimento antes de reiniciar as revelações.
- Timers de revelação são cancelados ao desativar a camada, evitando limpeza tardia de estados após a troca de preferência.
- Contêineres que têm transformações próprias de interação usam entrada por opacidade, preservando efeitos de hover e estados de animação.
- O foco de teclado revela imediatamente o bloco associado antes de manter o foco em um controle; os contêineres educativos não interativos deixaram de criar paradas redundantes.
- Acrescentado teste de regressão para mudança dinâmica da preferência, cancelamento de timers, foco e fallback sem `IntersectionObserver`.
- Nenhuma fórmula, parâmetro ou série sintética foi alterada.


## 1.3.32 — laboratório experimental de animações (2026-10-19)

- Revelação progressiva de conteúdo editorial por `IntersectionObserver`, com pequenos atrasos em grupos de cartões; visualizações multibanda em abas são excluídas para não ocultar painéis inativos.
- Traçado da curva de luz sintética ilustrativa do hero e pulso breve dos pontos marcados.
- Deriva orbital sutil, breve e de execução única nas órbitas da ilustração principal (sem loop infinito).
- Respeito por `prefers-reduced-motion`/`html.reduce-motion`; conteúdo visível se o recurso de observação não existir.
- Nenhuma alteração aos cálculos, aos dados sintéticos ou às simulações educativas já existentes.
- Nova suíte de regressão `tests/experimental-motion-lab.cjs`.
## 1.3.31 — auditoria visual responsiva em Chromium (2026-10-19)

- Renderização visual executada em Chromium headless usando o HTML, CSS e JavaScript do pacote; a navegação direta para `file://` e `localhost` permaneceu bloqueada pela política do navegador, então os recursos locais foram incorporados apenas no documento temporário de teste.
- Testadas as larguras de 320, 360, 390, 430, 600, 768, 899, 1024, 1280 e 1440 px, com capturas de referência em celular, tablet e desktop.
- Em todas as larguras, `documentElement.scrollWidth` e `body.scrollWidth` corresponderam à largura da viewport; matrizes e gráficos largos mantêm rolagem localizada, sem expandir a página.
- Alternância claro/escuro e abertura do menu móvel responderam corretamente; não foram observados erros de JavaScript no console ou erros de execução durante o teste.
- Auditoria dos links: âncoras internas correspondem a destinos existentes; os seis DOI foram confrontados com registros bibliográficos. Algumas páginas de editoras não são acessíveis pelo verificador, o que não foi interpretado como link quebrado.
- Não foram identificados defeitos visuais reproduzíveis que justificassem alterar o HTML/CSS/JavaScript. Animações, fórmulas, parâmetros e séries sintéticas permanecem inalterados para a versão experimental futura.
- Detalhes e limitações em `updates/AUDITORIA_CHROMIUM_1.3.31.md`.

## 1.3.30 — auditoria de integridade do pacote (2026-10-19)

- Incluído um teste dedicado a links, âncoras, recursos locais, atributos `rel` em novas abas e metadados canônicos.
- O workflow de qualidade passa a executar essa auditoria.
- Auditoria estática não encontrou âncoras internas ou recursos locais ausentes. Os seis links DOI foram confrontados com registros bibliográficos disponíveis.
- Animações, estilo visual, fórmulas científicas, parâmetros e séries sintéticas não foram modificados. A revisão visual pelo Chromium ficou bloqueada pela política administrativa deste ambiente; a limitação está documentada em `updates/AUDITORIA_1.3.30.md`.

## 1.3.29 — rastreabilidade científica e legibilidade móvel (2026-10-18)

- Os resumos dos três trabalhos do grupo agora apontam para as referências metodológicas verificadas correspondentes; não foram inventados DOI ou URLs para os manuscritos integrais.
- O texto da seção de resumos foi ajustado para não prometer acesso a manuscritos completos sem link público verificado.
- O rótulo da população sintética foi refinado de “AGN” para “AGN genérico”, mantendo a mesma categoria interna e os mesmos dados determinísticos.
- Na matriz móvel fonte × banda, reforçados os tamanhos mínimos dos rótulos de fonte, classe e valores das células sem diminuir as áreas de toque.
- Documentado o papel de `/teste-2000/` como endereço de revisão e de `/BlazarLab_13/` como endereço canônico de produção; `canonical` e `og:url` permanecem no destino de produção.
- Nenhuma fórmula, parâmetro ou série sintética foi alterada.

## 1.3.28 — correções editoriais e refinamento mobile (2026-10-18)

- Corrigida a autoria bibliográfica da referência EntropyHub e acrescentada a referência fundamental de Bandt–Pompe para entropia de permutação.
- Separados verticalmente os rótulos inferiores da ilustração principal para evitar sobreposição entre a legenda e o identificador do projeto.
- A matriz fonte × banda identifica a unidade de energia uma única vez, deixando os intervalos mais limpos e aumentando a legibilidade dos rótulos móveis.
- Ampliada a área de toque do link de referências no rodapé e melhorada a quebra de linha dos rótulos de seção em telas estreitas.
- Reconciliado o histórico do changelog: entradas duplicadas foram consolidadas e registros legados ficaram separados da sequência atual 1.3.x.
- Sem alterações nas fórmulas científicas, nos parâmetros ou nas séries sintéticas.

## 1.3.27 — matriz fonte × banda adaptativa e alvos de toque (2026-10-18)

- Adicionada uma matriz HTML responsiva para o heatmap fonte × banda em telas estreitas; o SVG original permanece como visualização de desktop.
- As células móveis mantêm o valor de SampEn, a escala de cores, a identificação da fonte e da classe, o estado selecionado e os detalhes A/B em rótulos acessíveis.
- Selecionar uma célula sincroniza a fonte e a banda com os gráficos relacionados; a navegação por setas e as ativações nativas de teclado são preservadas.
- Células da matriz de sensibilidade ganharam maior altura de toque, com rolagem localizada quando o espaço horizontal é insuficiente.
- Adicionado teste de regressão para as 192 combinações fonte × banda em versão móvel, sem alterar fórmulas nem séries sintéticas.

## 1.3.26 — mapa de sensibilidade responsivo e comparação de métodos

- O mapa m × r ocupa a largura útil no desktop; em celulares e telas estreitas, uma tabela transposta mantém as dez tolerâncias e as cinco dimensões legíveis sem ampliar a página horizontalmente.
- A visão de todas as bandas reutiliza a matriz móvel com botões de seleção de banda.
- Removidos os links e a frase de busca no Google Scholar dos cartões de manuscritos.
- Adicionado um guia comparativo dos três métodos, organizado por pergunta científica, tipo de resultado e situação de uso.
- Testes de regressão atualizados para o novo layout, navegação de exploração e ausência dos links removidos.

## 1.3.25 — consistência científica, acesso bibliográfico e testes

- Corrigida a divergência textual: todas as curvas sintéticas usadas nas três lentes são séries de 144 pontos por banda, e não 240.
- Metadados públicos completados com URL canônica, `og:url`, imagem social PNG em URL absoluta e texto alternativo para a imagem.
- Adicionados atalhos de busca bibliográfica por título aos cartões dos três manuscritos. Nenhum DOI/URL integral foi inventado; a página comunica explicitamente que os identificadores oficiais ainda precisam ser cadastrados.
- Criada uma legenda visual para distinguir as demonstrações sintéticas em bandas de raios X dos resultados observacionais reportados para rádio a 15 GHz.
- WPE de escala insuficiente ou de peso total nulo passa a ser marcada como indefinida. O CI só é calculado quando as oito escalas são válidas; gráficos e tabela sinalizam lacunas.
- Ampliado o workflow do GitHub Actions para executar todos os testes de regressão disponibilizados no pacote, incluindo responsividade, zoom móvel, paletas e fundos.

## 1.3.24 — matrizes móveis, geometria responsiva e acessibilidade

- Corrigidos rótulos de tolerância e espaçamentos no mapa de sensibilidade, evitando sobreposição em telas estreitas.
- Removidos textos descritivos longos de dentro das áreas SVG roláveis; a identificação da seleção pode quebrar linha fora da matriz.
- Adicionadas indicações de rolagem horizontal e mensagens acessíveis para as matrizes fonte × banda e m × r.
- Ajustada a geometria dos gráficos SVG à largura real do cartão, inclusive em painéis de meia largura.
- Mantida a rolagem localizada nas matrizes extensas e ajustados os alvos de toque.
- Refinado o cabeçalho nas larguras intermediárias de tablet e o redesenho após mudanças significativas de largura, com preservação do zoom.
- Nenhuma fórmula, parâmetro ou série sintética foi alterada.

## 1.3.22 — estabilidade de interação e zoom responsivo

- Corrigido o rótulo do ponto selecionado no plano Fisher–Shannon: agora fica em uma área reservada do gráfico, com fundo opaco e linha-guia, sem cobrir a nuvem de pontos.
- Aprimorada a consistência visual entre os temas e os controles da interface.

- Melhorada a continuidade da pinça: cada ponteiro é capturado individualmente e levantar um dedo recalibra o gesto restante.
- Preservado o estado de ampliação durante redesenhos responsivos e mudanças de tema.
- Instruções de zoom adaptadas a dispositivos móveis; fora do modo de exploração, rolagem e pinça nativas permanecem disponíveis.
- Mantidas as animações didáticas acessíveis, os textos científicos explícitos e a exportação PNG coerente com o tema ativo.
- Adicionado teste automatizado da geometria de pinça e da preservação de estado. Nenhuma fórmula científica foi alterada.

## 1.3.20 — animações didáticas e interação acessível (2026-10-17)

- Corrigido o comportamento de clique nos cartões: o cartão deixou de converter toques em conteúdo/texto em novos acionamentos que desmontariam a simulação. Os controles explícitos continuam ativáveis por mouse, toque e teclado.
- Simulações detalhadas mudaram de `role="status"` para regiões nomeadas; a região de status anuncia apenas uma síntese, evitando anunciar todo o bloco como mensagem dinâmica.
- Sequências visuais escalonadas para SampEn (pares B → subconjunto A → relação −ln(A/B)), Fisher–Shannon (distribuição global → gradiente local → medidas complementares) e MSE-WPE/CI (τ=1 → τ=2 → τ=4 → síntese multiescala). Os exemplos são identificados como esquemáticos.
- Sincronizado o estado de destaque dos botões com a duração das sequências. Os diagramas mantêm a simulação aberta sem exigir foco adicional nem criar paradas de teclado desnecessárias.
- Respeitada a preferência por movimento reduzido: as etapas são exibidas imediatamente sem animação.
- Clarificada a distinção entre `m_SE` (dimensão de padrão da Sample Entropy) e `m_int` (modulação intrínseca); título de ligação entre resultados simplificado sem travessão.
- Nenhuma fórmula dos cálculos centrais, parâmetro analítico ou dado da galeria sintética foi alterado.

## 1.3.19 — otimização de desempenho, processamento e tabelas (2026-10-17)

- Métricas de Fisher–Shannon da população calculadas em tarefas ociosas, em lotes, após a primeira renderização.
- Separada a geração das curvas sintéticas dos cálculos populacionais mais pesados; as métricas da galeria são calculadas em pequenos lotes após a primeira exibição.
- A fonte ativa mantém as métricas centrais disponíveis; as visualizações populacionais são redesenhadas ao fim do processamento em segundo plano.
- O cálculo em segundo plano pausa quando a página fica oculta e retoma quando volta a ficar visível.
- Tabelas acessíveis são criadas apenas quando abertas e atualizadas somente quando os dados mudam.
- Animação SampEn com duração finita; ícone/cartão e diagrama têm papéis distintos, evitando pulsação contínua.
- Teste da geometria móvel atualizado. Nenhuma fórmula ou dado científico foi alterado.

## 1.3.18 — trilha didática e simulações por método

- Incluída uma introdução gradual: definição de blazar, motivação para estudar a variabilidade e perguntas que as curvas de luz permitem investigar.
- Adicionadas simulações acionáveis para Sample Entropy (pares B e subconjunto A), Fisher–Shannon (densidade e gradientes) e MSE-WPE/CI (coarse-graining em diferentes escalas).
- O cartão inteiro também pode acionar a simulação; os botões continuam oferecendo acesso direto a cada método.
- Corrigida a versão compacta do mapa m × r, que antes exigia rolagem horizontal e escondia colunas no celular.
- Mantidas as métricas de pesquisa e os resultados demonstrativos existentes; as novas contagens da simulação SampEn são explicitamente didáticas.

## 1.3.17 — refinamento da vitrine e responsividade

- Métodos com nomes destacados: Sample Entropy (SampEn), Fisher–Shannon e Multiscale Entropy (MSE-WPE / CI).
- Ícones e diagramas científicos agora respondem a clique/toque com animações SVG curtas, indicação de interação, foco visível e anúncio acessível; animações respeitam `prefers-reduced-motion`.
- Cartões de manuscritos em triângulo invertido em telas amplas; layout de uma coluna em celular/tablet estreito.
- Menu com indicação da seção ativa e botão móvel com barras corretamente empilhadas.
- Geometria responsiva guiada por largura do contêiner, via `ResizeObserver`, com ajustes de margens, títulos e rótulos nos gráficos SampEn, SampEn por banda e sensibilidade m × r.
- Contraste reforçado no rodapé escuro. Nenhuma fórmula científica ou dado demonstrativo foi alterado.
- Corrigido o espaçamento do título principal quando a quebra de linha é ocultada no celular; ajustadas áreas de toque de controles secundários e legibilidade dos passos da vitrine.
- Aumentada a altura útil das linhas do heatmap fonte × banda para que a área clicável se aproxime de 24 px sem remover nenhuma célula.
- Ampliada a bateria de testes locais e de CI para incluir exportação PNG, animações da vitrine e viewport de tablet (768 px).

## 1.3.16 — exportação PNG consciente do tema (2026-10-16)

- Corrigida a exportação PNG para identificar o tema ativo no momento do clique.
- Fundo, grade, rótulos, eixos, tooltips, barras e contornos recebem cores adequadas ao tema claro ou escuro.
- Cores explícitas de séries conhecidas são adaptadas na exportação clara, incluindo rótulos claros herdados de uma renderização anterior; gradientes de heatmap que codificam valores são preservados.
- Nenhuma fórmula, parâmetro ou dado científico foi alterado. Mantida a base de acessibilidade e responsividade da versão mais recente recebida.

## 1.3.15 — estabilidade de interação e refinamento visual (2026-10-16)

- Removidas as referências ativas à exportação CSV; a funcionalidade permanece ausente do site público.
- Corrigida a causa da reinicialização das barras de ferramentas durante eventos de resize/fullscreen: controles e listeners não são recriados em redimensionamentos comuns.
- Limitado o redesenho responsivo à passagem entre geometrias móvel e desktop, preservando o estado de zoom durante ciclos de tela cheia.
- Melhorado o acionamento de tela cheia nativa e fallback, com saída por Esc para o fallback.
- Refeitos o seletor de métodos e o painel de relações em cartões equilibrados, com hierarquia, contraste e comportamento móvel aprimorados.
- Atualizados README, guia GitHub Pages, citação, versão e testes.
- Nenhuma fórmula central de Sample Entropy, Fisher–Shannon ou WPE/CI foi alterada nesta versão.

## 1.3.14 — refinamento de interface
- Refinamentos iniciais dos seletores de métodos e do resumo das relações.
- Tentativa inicial de ajuste do ciclo de tela cheia; aprofundada e corrigida na V1.3.15.

## 1.3.13 — refinamento e regressão de exportação (2026-10-16)
- Restaurada a regra tipográfica `.method-question` removida na passagem para V1.3.0.
- A versão chegou a incluir exportação CSV dos dados sintéticos; ela foi removida a pedido na V1.3.14 e permanece ausente.
- Removido o cálculo de três séries introdutórias de código legado que já não eram usadas pelos painéis sincronizados multibanda.
- Nenhuma fórmula central de Sample Entropy, Fisher–Shannon ou WPE/CI foi alterada.

## 1.3.0 — exploração sincronizada multibanda (2026-10-16)
- Nova seleção compartilhada de fonte sintética e banda energética para as três metodologias.
- Heatmap de SampEn para 24 fontes sintéticas × oito bandas, com células selecionáveis.
- Heatmap WPE de oito bandas × oito escalas temporais e trajetória Fisher–Shannon da fonte ativa entre bandas.
- Conectadas seleções de banda às curvas, ao plano de informação e às relações métricas.
- Mapa de sensibilidade SampEn m × r com 50 combinações por banda e visão das oito bandas.
- Suporte móvel às matrizes e controles de zoom, tela cheia, PNG e tabelas acessíveis.
- Distinção explícita entre dados sintéticos e estatísticas publicadas de OVRO 15 GHz.

## 1.2.5 — estabilização, leitura móvel e sensibilidade SampEn
- Cartões educativos equilibrados, mapa m × r ampliado, interações e controles responsivos, tabelas acessíveis, metadados e testes automatizados.

## Registros legados de versão (2026-10-16; linha histórica distinta)

As entradas abaixo foram mantidas para rastreabilidade, mas ficam separadas da sequência V1.3.x continuada por este pacote, pois seus rótulos de versão são de outra linha histórica.

### V1.4.0 — temas claro/escuro e limpeza da seção de pesquisa (2026-10-16)

- Adicionada alternância de tema claro e escuro no cabeçalho com ícones de sol e lua, rótulos acessíveis e estado selecionado anunciado.
- Mantido o tema escuro atual como padrão; a escolha fica salva no navegador quando o armazenamento está disponível.
- Implementada a paleta clara `#FFFFFF`, `#F0F4F8`, `#70A9FF`, `#1D4ED8` e `#0F172A`, com ajustes de superfícies, tipografia, controles e gráficos.
- Removido o cartão “Trabalho conjunto” do manuscrito de síntese na seção de resumos.
- Removida a seção “Citação do projeto”, incluindo o BibTeX e o endereço provisório.
- Atualizados os testes de integridade e os guias de publicação.
- Nenhuma fórmula, dado ou parâmetro científico foi alterado.

### V1.5.0 — acessibilidade e responsividade (2026-10-16)

- Reorganizado o cabeçalho em telas móveis para acomodar marca, seletor de tema e menu sem colisão em larguras estreitas.
- Ampliadas as áreas de toque e reforçado o foco visível em controles interativos.
- Atualizados o nome acessível e os estados do menu, com fechamento por Escape, clique externo e navegação interna.
- Melhoradas as tabelas alternativas dos gráficos com caption, cabeçalhos de linha e região de rolagem nomeada e focalizável.
- Distinguidos gráficos estáticos e SVGs com controles internos para melhorar a semântica acessível.
- Adicionada navegação com setas e foco móvel a heatmaps interativos e à grade de sensibilidade.
- Impedido que comandos de zoom por setas capturem eventos de teclado oriundos dos controles internos dos SVGs.
- Sincronizada a preferência de redução de movimento quando ela muda durante a sessão.
- Aprimorados tipografia e espaçamento em celulares, mantendo rolagem localizada para gráficos/matrizes que necessitam de largura.
- Adicionados testes de acessibilidade estrutural e responsividade; sem mudanças de fórmulas, parâmetros ou resultados científicos.
