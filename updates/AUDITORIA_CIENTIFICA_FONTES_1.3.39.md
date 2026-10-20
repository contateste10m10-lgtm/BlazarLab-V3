# Verificação de estatísticas e referências — BlazarLab v1.3.39

## PDFs consultados

1. `Fisher–Shannon Information Plane Analysis of Blazar Radio Variability` (resumo de Joaquim Fragoso Pinto Neto, Miquéias de Freitas Carneiro e Rhimon Alves de A. Souza): dá suporte ao contexto de 721 curvas de rádio OVRO a 15 GHz e à leitura conjunta de entropia de Shannon e informação de Fisher, mas não informa o p da correlação entre SampEn e modulação intrínseca.
2. C. Vignat e J.-F. Bercher (2003), `Analysis of signals in the Fisher–Shannon information plane`, *Physics Letters A* 312, 27–33, DOI 10.1016/S0375-9601(03)00570-X: fundamenta o plano clássico com potência entrópica e informação de Fisher. Não é o estudo que reporta o coeficiente da SampEn dos blazares.

## Ajuste transparente no cartão SampEn

O cartão separa agora o coeficiente de Pearson (`r_P = −0,725`) da correlação por postos de Spearman (`ρ_S = −0,734`). O valor indicado para Pearson é **p bicaudal ≈ 2,2 × 10⁻¹¹⁸**, calculado a partir do coeficiente arredondado e de `N = 720` (teste t usual para correlação de Pearson, graus de liberdade `N−2`). Esse p é um cálculo derivado no processo de revisão, não um valor transcrito dos PDFs enviados; o texto também deixa explícito que o resumo consultado não fornece um p separado para Spearman.

A amostra geral continua descrita como 721 curvas. O pacote não inventa a razão para `N = 720` na análise de correlação, nem altera `r_P`, `ρ_S`, médias, medianas ou os valores de comparação entre classes.

## Fórmula Fisher–Shannon

O resumo conceitual da página distingue corretamente `H[f]` de Shannon e a potência entrópica `N_X = exp(2H)/(2πe)` usada no plano clássico. A demonstração do site declara que exibe `H` diretamente em um painel KDE ilustrativo e não reproduz a figura observacional do resumo. Vignat–Bercher usa a potência entrópica junto de `I_F`; essa distinção continua documentada no site.
