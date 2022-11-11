# Docker - Introdução Concentual

Tenho estudado Docker com mais vontade de alguns meses pra cá (além de trabalhar no dia a dia) e não faz muito sentido fazer tudo isso se eu não passar a diante.

Honestamente meu intuito é que este texto facilite um pouco sua vida, vou mesclar um pouco da minha experiência que vai desde o desenvolvimento até o Deploy para Produção. No meio do caminho talvez eu cite ferramentas extras que também podem ajudá-lo (espero).

Este artigo faz parte da série **Manual "básico" de Docker**. Digo básico pois realmente há muito mais do que pretendo escrever.

Duas observações importantes sobre este projeto:

1. Não será o estado da arte de primeira, não espere isso. Aliás, suas idéias, comentários e correções serão levados a sério e revisarei o que for necessário.
2. Eu não tenho tanta pressa. Ao mesmo tempo que estou escrevendo, estou lendo mais e sempre reviso algumas partes, implemento, melhoro, etc. Então isso pode ficar um tanto extenso mas farei o possível para que valha seu tempo.

## O que é Docker?

Como na própria documentação:

> Docker é uma plataforma para criar, executar e compartilhar aplicativos em containers.

Isso pode não dizer muito ainda, mas de fato diz quase tudo.

Desenvolvido pela empresa **Docker, Inc.**, Docker é um software de administração de contêineres que visa abstrair a camada de virtualização de uma forma que simplifique (MUITO) a vida de desenvolvedores e administradores de sistemas.

Você já deve ter usado ou visto uma máquina virtual. Daquelas que nos permitem rodar um sistema operacional sobre o outro, sabe? Tipo **VirtualBox**. Você instala o VirtualBox no Windows e pode instalar outro Windows (espero que não faça) dentro dele.

Isso é bastante útil para fazer testes em ambientes diferentes do que você está usando e até para rodar aplicações que não funcionam no seu sistema atual. É diferente de uma máquina virtual, que executa um sistema operacional (guest OS) sobre o outro (host OS) e, só depois, executa as aplicações.

Um contêiner tem a capacidade de se beneficiar do kernel do seu sistema host para executar aplicações.

Na imagem abaixo, fica um pouco mais claro:

![https://dev-to-uploads.s3.amazonaws.com/i/erzekt4smvip27horqb7.png](https://dev-to-uploads.s3.amazonaws.com/i/erzekt4smvip27horqb7.png)

Comparativo entre a arquitetura de um sistema de contêineres versus arquitetura de um sistema virtualizado. Fonte: [https://docs.docker.com/get-started/](https://docs.docker.com/get-started/)

Note que quando usamos uma máquina virtual com um sistema operacional inteiro e só depois a aplicação desejada, estamos literalmente jogando fora uma grande quantidade de recursos de hardware que podem (e devem) ser melhor aproveitados. Além de ser caro em recursos físicos, é lento e pesado. Ou seja, fica muito mais complexo replicar, compartilhar e, claro, escalar utilizando uma arquitetura baseada em máquina virtuais.

Tudo que estamos falando agora, a respeito de contêineres não é tão novo assim, e já funcionava antes do Docker. O Unix permitia realizar essa tarefa nativamente através do velho `chroot`, incluído em 1979, de forma limitada mas realizável. Melhorou no GNU/Linux, com a possibilidade de rodar processos isolados com o `cgroup`, desenvolvido pelo time de engenharia da Google em 2006 (talvez eu faça isso manualmente e documento em um outro artigo).

Apesar de contêineres serem possíveis desde muito tempo atrás, não eram uma tarefa simples de se realizar. Até que o Docker veio para facilitar tudo isso, abstraindo toda complexidade técnica e nos permitindo usar os recursos e dedicar tempo em nossas próprias aplicações. Porém, alguns conceitos precisam ser bem entendidos para se aprofundar melhor no mundo dos contêineres: a diferença entre **imagens** e **contêineres**.

## Imagens

A abstração não está apenas na execução dos contêineres, como vimos até agora, mas também na criação das imagens que são utilizadas como base para a execução deles. Imagem é uma espécie de molde usado para a criação das instâncias (contêiner). Existem diversas imagens já construídas e podemos reaproveitá-las para facilitar nossa vida. A Docker, Inc. é responsável pelo maior hub de imagens oficiais e não-oficiais, o **Docker Hub** ([https://hub.docker.com/](https://hub.docker.com/)).

Imagens são construídas a partir de um arquivo de receita conhecido por Dockerfile. Em breve vamos começar a escrever essas receitas e compreender maneiras boas e ruins de fazer diversas coisas, para diferentes cenários.

## Contêineres

Damos o nome de contêiner a qualquer instância criada a partir de um molde (imagem docker). Fazendo um paralelo com o paradigma de orientação a objetos, a imagem docker é a classe enquanto que o objeto é o contêiner. Podemos ter diversos contêineres criados a partir da mesma imagem. Um contêiner permite executar a instância de alguma coisa de forma isolada, flexível e escalável. Ele só vive enquanto seu propósito de execução estiver, claro, em execução.

Quando lidamos com containers, precisamos começar considerando que os containers só nascem para morrer. Ou seja, não tenha apego emocional no planejamento, ele precisa nascer, executar e morrer. Você pensando assim, começará a desenvolver aplicações cada vez mais 'conteinerizáveis'.