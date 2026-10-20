# BlazarLab 1.3.32 — auditoria da versão experimental de animações

**Tipo de entrega:** versão experimental separada da base estável 1.3.31.  
**Data:** 19/10/2026  
**Objetivo:** testar uma camada de movimento de interface sem alterar os cálculos científicos, os dados sintéticos ou as animações didáticas atuais.

## Animações adicionadas

1. **Revelação progressiva de conteúdo editorial.** Blocos selecionados entram suavemente quando alcançam a área visível, com atrasos leves por grupo. O controlador usa `IntersectionObserver` e uma varredura de rolagem de segurança para que saltos por âncora ou rolagens rápidas não deixem conteúdo invisível. Painéis multibanda controlados por abas foram excluídos dessa camada para não esconder visualizações inativas.
2. **Traçado da curva de luz no hero.** O comprimento real do caminho SVG é medido quando suportado e usado para animar o desenho da curva ilustrativa. O movimento não modifica dados nem coordenadas.
3. **Destaque breve dos pontos da curva.** Os dois pontos ilustrativos recebem pulsos curtos para orientar o olhar.
4. **Deriva orbital de execução única.** As três órbitas do desenho do hero mudam de ângulo discretamente e param; não há loop orbital infinito.

As simulações de Sample Entropy, Fisher–Shannon e MSE-WPE/CI que já existiam não foram reescritas.

## Acessibilidade e degradação segura

- A camada experimental não é ativada quando `prefers-reduced-motion: reduce` está ativo ou quando a classe `html.reduce-motion` está presente.
- Ao ativar movimento reduzido durante a sessão, a camada é removida e os elementos permanecem visíveis.
- Se `IntersectionObserver` não estiver disponível, não são aplicados estilos de ocultação; o conteúdo continua visível.
- As animações novas são visuais/decorativas. Não são usadas para codificar valores científicos, e o rótulo da curva continua identificando-a como ilustrativa.
- A camada não usa bibliotecas externas, polling contínuo ou animações orbitais infinitas.

## Testes automatizados

- `node --check blazarlab.js` — aprovado.
- 19 suítes `.cjs` do projeto — aprovadas, incluindo `tests/experimental-motion-lab.cjs`.
- Testes `smoke-test.cjs` repetidos com `VIEWPORT_WIDTH=320, 390, 430, 600, 768, 1024` — aprovados.

## Inspeção no Chromium

A página foi renderizada no Chromium headless usando o HTML, CSS, JavaScript e os recursos SVG locais do pacote. Para contornar o bloqueio administrativo de navegação para `file://`, `localhost` e URLs `data:`, os estilos e scripts foram incorporados temporariamente em um documento de teste e os fundos SVG locais foram incorporados como data URI. Isso executa o motor de renderização Chromium real, mas não testa o transporte HTTP nem substitui a verificação da hospedagem publicada.

Foram verificadas dez larguras: **320, 360, 390, 430, 600, 768, 899, 1024, 1280 e 1440 px**.

Resultados observados:

- `documentElement.scrollWidth` e `body.scrollWidth` permaneceram iguais à largura da viewport nos dez tamanhos; não foi observado overflow horizontal no documento.
- O controlador experimental foi ativado nos tamanhos testados e o SVG do hero reportou a animação `blazarlab-signal-trace`.
- A deriva orbital tem uma única iteração (`animationIterationCount: 1`).
- O menu móvel abriu e fechou com estado `aria-expanded` correto no teste de 390 px.
- Com movimento reduzido emulado, a camada experimental não foi ativada, a animação do traçado ficou `none` e o conteúdo do cartão de método manteve opacidade 1.
- Nenhum erro de console ou exceção de página foi observado nas passagens reportadas.
- A rolagem de ponta a ponta em 390 px revelou todos os 47 elementos editoriais selecionados (47/47). A revisão complementar em 1280 px também revelou os 47 alvos.
- As capturas desta pasta registram os estados de topo em 320, 390 e 1280 px, a seção de métodos em mobile e a versão com movimento reduzido.

## Inspeção visual e limites

As capturas do topo e da seção de métodos foram verificadas visualmente em 390 px e 1280 px. A inspeção visual não identificou desalinhamento ou sobreposição evidente nesses estados registrados. Os testes de largura verificam o overflow do documento; não são uma prova matemática de inexistência de sobreposição em toda combinação de conteúdo, zoom e estado interativo. Recomenda-se confirmar no navegador e dispositivo reais após publicar a prévia.

## Arquivos alterados

- `blazarlab.js`: controlador experimental, medição do traçado e segurança em saltos de rolagem.
- `styles.css`: revelação, traçado, pulso, deriva orbital finita e regras de movimento reduzido.
- `tests/experimental-motion-lab.cjs`: regressão dedicada da camada experimental.
- `.github/workflows/quality.yml`: novo teste no workflow de qualidade.
- `VERSION`, `README.md`, `CHANGELOG.md`, `CORRECTIONS_APPLIED.md` e `README-GITHUB-UPLOAD.md`: versão e documentação.
- `evidencias-animacoes/`: capturas do Chromium usadas nesta revisão.

Nenhuma fórmula, parâmetro de análise, valor sintético ou resultado reportado de manuscrito foi alterado.
