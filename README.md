# Desafio de Frontend

A lógica do programa se baseia em fazer uma requisição para receber um número aleatório, que deve ser adivinhado pelo usuário por meio de palpites.
Por padrão, o intervalo do número é de 1 a 300.
O palpite do usuário deve aparecer no LED com um feedback informando se o número aleatório é maior ou menor que seu palpite.
Caso ocorra algum erro na requisição, o LED deve exibir o status code correspondente, com uma mensagem "Erro" como feedback, ambos em vermelho.
Em caso de acerto, o palpite e o feedback devem ser exibidos em verde. 

## Tecnologias utilizadas

    - Linguagens: 
        - O propósito era implementar o jogo utilizando HTML, CSS e Javascript.

    - Biblioteca:
        - Para a criação da interface foi utilizado o React.

## Projeto

Para o desenvolvimento do jogo, foram criados quatro componentes: App, Led, Number e Modal.

Os componentes possuem as seguintes responsabilidades:

    - App:
        - fazer a requisição que gerará o valor aleatório;
        - receber o palpite do usuário;
        - verificar se o palpite está correto;
        - dar o feedback ao usuário a respeito do palpite;
        - informar ao usuário se houve algum erro na requisição;
        - exibir o Led com o palpite ou o status code do erro, e o feedback, conforme o caso;
        - exibir uma caixa de diálogo quando o usuário solicitar uma nova partida, para que ele defina um novo intervalo para o número aleatório.

    - Led:
        - exibir os números correspondentes ao palpite ou ao erro, conforme o caso.

    - Number:
        - construir os algarismos no formato de LED de 7 segmentos;

    - Modal:
        - dar a opção ao usuário de definir um novo intervalo para o número a ser adivinhado na nova partida ou manter o intervalo padrão.

## Scripts

### `yarn start`

Executa o app em modo de desenvolvimento.

### `yarn build`

Constrói o app para produção.