# Checklist para desenvolver uma API de respeito

https://www.tabnews.com.br/srdavidsilva/checklist-para-desenvolver-uma-api-de-respeito

Existem alguns detalhes que vão além de só fazer funcionar, alguns caprichos vão melhorar a experiência de quem consome suas APIs e ainda torná-la um pouco mais segura.

Vamos montar juntos um checklist de itens que são cruciais para o bom desenvolvimento de uma API? Vou começar listando os tópicos e voltarei atualizando cada tópico com a ajuda de vocês.

É verdade que muitos frameworks já fornecem muito destes itens por padrão, mas vamos tentar montar um guia framework-less. Ou seja, o que deve ser pensado independente de qual sua linguagem ou framework.

----------
# 1. Validação do Request

Nunca pense que o consumidor vai realmente passar os dados corretos como você informar. E se ele passar um negativo enquanto seu banco está com o campo integer? Você vai retornar o erro de banco para ele?

Validar o payload antes mesmo de processá-lo é muito importante, além de melhorar a segurança da sua API, ainda ajudará a tornar os retornos mais amigáveis. Acredite, parece algo superfícial mas é de extremo valor. 

# 2. Tratativa de Erros Padrão

Também é importante que os erros sejam tratados. Caso dê algum erro imprevisto, talvez por alguma tratativa de banco que você não conhecia ou pensou, talvez por alguma falha de integração entre multiplos serviços, etc.. É uma boa prático você ter um arquivo para controlar os retornos de erros, algo como um `ErrorHandler`. De forma que você possa fazer um `try catch` no seu controlador e retornar o `ErrorHandler` com a exceção capturada. E lá no `ErrorHandler`, você pode ter um retorno padrão mas também pode tratar as exceções uma a uma.

# 3. Paginação

Para proteger sua aplicação e melhorar a experiência de seus consumidores, você não vai querer permitir que uma lista de usuários com 10mil linhas seja entregue no request, certo? Para isso que nos ajudará a paginação. Existem maneiras de fazer isso, eu particularmente gosto muito de utilizar os atributos: `offset` e `limit`, fica simples de implementar no backend e simples de utilizar no frontend.

# 4. Documentação - Swagger e OpenAPI

Documentar como sua API pode ser consumida, ajudará você a manter os padrões estabelecidos pela equipe, facilitará a vida do seu consumidor e ainda te dará certos poderes como:

## Automatizar criação de pacotes para o consumo da API

Existem pacotes que pegam a sua documentação gerada, e criam para você pacotes para diversas linguagens. Como se fosse um SDK da sua API, simplificando a vida do consumidor, seja ele um serviço rodando em `node`, `python` ou `php`.

## Facilitar a importação para o Insominia ou Postman

Com o arquivo gerado pelo swagger, você pode facilmente importar todas as rotas da sua API para seu aplicativo favorito.

# 5. Validação e Padrão do Response

É importante que sua API tenha um padrão nas respostas. Ou seja, utilizar um formato de payload comum entre todas as respostas e também utilizar `STATUS CODES` corretos.

Além disso, é importante validar a saída deste response, não apenas entregar o resultado do banco de dados, mas validar a saída na modelagem do response. Ou seja, se o consumidor está chamando algo como `users/{id}`, nós podemos modelar o response para algo como: `{ id: "2", name: "usuario X" }`. De forma que, mesmo que o seu `ORM` retorne o `password`, o mesmo não será entregue na requisição.

# 6. Testes Automatizados

É crucial que suas APIs possuam testes automatizados para que você não fique refém de ter que testar tudo manualmente a cada mudança. Os testes em APIs podem ser simples de se fazer e bastante reaproveitados, com simples chamadas em cada endpoint e uma validação se o `payload` recebido é como esperado.

Testes de APIs bem modelados podem ajudar a prevenir mudanças que ferem as regras de negócios pensadas lá atrás no inicio do projeto e que que realmente não devem ser alteradas.

Por exemplo, você pode fazer um teste para validar que caso alguém tente alterar o `last_name` do usuário, ele não será alterado. Um teste pode ajudar a garantir que essa simples regra não seja quebrada quando houver alguma mudança no método de atualização do usuário.

----------

Lembrando que a ideia desta publicação é unirmos nosso conhecimento para montar um guia bem organizado e modelado. E aí, o que podemos incluir/alterar?