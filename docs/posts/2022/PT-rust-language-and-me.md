# Aprendendo minha terceira linguagem: Rust

https://www.tabnews.com.br/srdavidsilva/aprendendo-uma-terceira-linguagem-rust 

![Foto de Código - Rust com Neon](https://i.ibb.co/YcLkR0n/rust-capa.png)

> Este não é um post técnico, é apenas um post do estilo 'Blog Pessoal' onde compartilho um pouco da minha jornada aprendendo uma nova linguagem.

Estou estudando sozinho uma nova linguagem (`Rust`) há cerca de um ano, apenas com ajuda de livros e com perguntas pontuais em grupos da comunidade brasileira. 

Neste período de um ano, somente nas horas extras pois meu trabalho é com tecnologias diferentes, pude fazer alguns testes de coisas comuns como CRUD com alguns frameworks, manipulação de dados, etc. Tudo muito legal e divertido como eu esperava, mas um pouco mais complexo do que o previsto.

Quando comecei a trabalhar com `NodeJS`, eu já tinha uma certa proficiência com `JavaScript` e alguns anos de experiência com `PHP`. Então a curva foi de certa forma bem simples, os conceitos de backend já eram claros para mim, assim como a manipulação da linguagem em sí. Foi muito divertido também e a sensação de complexidade foi muito menor.

Linguagens que mantém padrões similares aos que a gente conhece vão ser sempre mais fáceis de aprender. Em um curso que fiz de estrutura de dados que usou `Python`, não tive muita dificuldade em compreender o **básico** da linguagem, a sintaxe é limpa e simples (muito bonito inclusive).

Linguagens que resolvem problemas extremamente diferentes e/ou com paradigmas diferentes tornam o desafio muito maior. 

No meu caso de exemplo, eu nunca havia programado de forma séria em uma linguagem com tipos fortes, tão pouco de baixo nível. E isso torna o processo bem mais custoso em termos de absorção. Coisas que antes nunca foram uma preocupação, passam a ser. Em contra partida você terá benefícios que nem imaginava, ao meu ver faz um balanceamento legal para o aprendizado.

Algo extremamente fantástico que tenho tido o prazer de brincar e vejo com muito bons olhos, é a possibilidade de construir módulos nativos para aplicações `NodeJs` e também bibliotecas `wasm` que podem ser utilizadas até pelo frontend com uma performance surreal.

Em um dos meus projetos de teste, tenho utilizado o `Neon` para construir um pacote que será utilizado em aplicações `NodeJs`, veja uma prévia:

![Foto de Código - Rust com Neon](https://i.ibb.co/YNpV5hn/rust-0.png)

![Foto de Código - Rust com Neon](https://i.ibb.co/nfTPpHW/rust-1.png)

![Foto de Código - Rust com Neon](https://i.ibb.co/Tgq3DPv/rust-2.png)

Este projeto é um tanto diferentes pois além dele pode ser 'instalado' em um backend `NodeJs` ele ainda sobe um próprio servidor web em uma `thread` separada (coisa que ainda estou tentanto entender melhor). Parece um `back-door` mas estou colocando em prática uma velha ideia para construção de aplicações `P2P`.

Neste outro exemplo, você pode ver um pouco do que brinquei com `wasm`:

![Foto de Código - WASM para Frontend](https://i.ibb.co/D4n2Pqp/rust-3.png)

Isso parece tão simples mas tem um poder impressionante. As aplicações de frontend estão cada vez mais pesadas e poderosas, acredito que com o progresso do `wasm` muito do que ainda resta 'instalável' poderá cada vez mais ter versões web. Há um tempo atrás eu até diria o mesmo para jogos, mas considero que o futuro dos games seja totalmente stream, isso é papo para outro post.

Quero pontuar aqui alguns insights sobre meu processo de aprendizagem que talvez ajude você em algum momento.

Lembrando que não estou aprendendo linguagens para falar que sei várias. Meu objetivo é conhecer paradigmas diferentes do que eu já tenho experiência e ter mais poder para resolver problemas mais complexos e delicados no futuro.

## 1. Ler um livro não te fará saber o suficiente.

Eu nunca tinha lido nenhum livro de linguagem de programação, mesmo com anos de experiência e com o privilégio de trabalhar em vários projetos. Eu já estou no segundo livro de `Rust` e, definitivamente, sei **muito** menos de `Rust` do que sei de `JavaScript` e `PHP`.

## 2. Sozinho o processo é mais lento.

Eu aprendo muitas coisas sozinho, coisas pontuais necessárias (ou apenas curiosidades mesmo) e realmente funciona, muito do que sei aprendi sozinho. Algumas coisas sei até em certa profundidade mas fiz tudo no meu tempo. Mas não posso negar, trabalhando em equipe com `PHP` e `NodeJs` o aprendizado é muito mais rápido, a equipe cresce muito rápido quando todos estudam e gostam do que fazem, um puxa (ou empurra?) o outro e a evolução é muito rápida. Não estou dizendo de cursos em turma, estou dizendo do ambiente de trabalho mesmo, o dia-a-dia produtivo.

## 3. É frustrante

Há coisas que eu faço/entendo muito rápido com minhas linguagens. Agora com o `Rust`... Coisas simples quando você não sabe, podem parecer impossíveis! O segredo é ver como uma brincadeira mesmo e persistir, com o tempo (e MUITO estudo) tudo fará sentido.

## 4. É fascinante

Eu não escolhi `Rust` com 'mamãe-mandou'. Eu analisei minhas habilidades e ambições, mirei para o futuro e decidi `Rust`. Também tive dúvidas sobre `Go Lang`, mas me identifiquei muito com `Rust`. Obviamente já embarquei nesta aventura de forma a ser impressionado com facilidade, mas acabei me impressionando ainda mais com o poder de tudo isso.
Definitivamente eu nunca encontrei muito limite do que eu poderia fazer com as linguagens que já sei, agora aprendendo `Rust` eu percebo que os limites que existem (sim, eu os vejo agora) podem ser rompidos com este novo conhecimento.

## 5. Nunca pense que já sabe o suficiente

Mesmo resolvendo tudo que preciso com o conhecimento que já tenho, nunca achei que soubesse muito e penso ainda mais assim agora. Eu tenho consciência que sei o suficiente para resolver muitas coisas mas ainda estou muito longe do meu desejo pessoal para poder considerar que sei muito.
Nota: Eu considerar que sei pouco, não significa que eu não saiba o suficiente para exercer muito bem meu trabalho, estou falando de um sentimento pessoal de querer sempre evoluir.

## 6. Planeje seu objetivo e não pare até alcança-lo

Isso não tem haver com programação mas é algo que eu levo pra vida e conecto com tudo que posso. Esteja fácil ou difícil, se é seu objetivo, persista!

---

Vou ficando por aqui hoje, se quiser ver um pouco dos meus projetos pessoais e acompanhar essas brincadeiras com `Rust`, veja meu github: https://github.com/sr2ds

Em especial este repositório com um resumo em minhas palavras de todo um livro que estudei:
https://github.com/sr2ds/learning-rust

Gostou deste formato de artigo? Deixa seu comentário!

E aí, qual linguagem você esta aprendendo agora e por quê?

A capa deste artigo é do LukasKalbertodt: https://github.com/LukasKalbertodt/programmieren-in-rust/blob/master/slides/20-Rust-Community-Open-Source.pdf