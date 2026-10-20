# Auditoria do menu — V1.3.36

## Intenção
A navegação principal usa seis ícones SVG inline ao lado dos rótulos textuais. Os ícones são decorativos (`aria-hidden="true"`) para que o nome acessível continue vindo do texto visível.

## Cores e estados
Os SVGs usam `stroke: currentColor`; portanto, herdam a cor do link definida pelas regras existentes do tema, paleta e fundo. A animação altera somente `transform` do SVG e não fixa cores. O estado ativo continua sendo comunicado por `aria-current="location"` e pelos estilos existentes da navegação.

## Movimento reduzido
O controlador consulta `prefers-reduced-motion` no momento do clique e não aplica a classe de animação quando o movimento reduzido está ativo. O CSS também desativa a animação como salvaguarda.

## Menu móvel
Quando o menu móvel está aberto, o fechamento após a escolha é adiado brevemente para que o feedback visual do ícone possa ser percebido; a navegação por âncora inicia imediatamente. Escape e clique externo continuam fechando o menu sem atraso.

## Limitações de validação
Os testes automatizados cobrem a estrutura dos seis links, a herança de cor, a preferência de movimento e o controlador. A inspeção final deve ainda ser feita no navegador e em dispositivos reais com tema claro/escuro, paleta azul/rosa e fundos AGN/Nebulosa.


## Correção visual de ícones — pacote revisado

Após comparação com as referências visuais, os desenhos de dois ícones foram ajustados sem alterar as âncoras nem o controlador de microanimação:

- **Explorar:** substituído pelo ícone de telescópio, correspondente à referência enviada.
- **Resultados:** substituído pelo gráfico combinado de linha e barras, correspondente à referência enviada.
- Ambos seguem como SVGs inline decorativos, herdam a cor com `currentColor` e mantêm o mesmo tamanho responsivo e os efeitos de clique.
- Incluídas verificações de regressão para impedir que esses dois ícones sejam trocados por desenhos diferentes.
