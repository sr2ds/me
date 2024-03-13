# Escalando de 65k para 104k artigos no Blog

Para você não ficar perdido, eu sugiro que veja o primeiro artigo - [Desafios e soluções na Gestão de blogs com +50 mil artigos - IA, Rust e Vue](https://sr2ds.github.io/me/posts/2024/PT-desafios-e-solucoes-na-gestao-de-blogs-com-mais-de-50-mil-artigos-ia-rust-e-vue.html) - onde falei um pouco sobre como fui resolvendo os desafios ao escalar um blog de maneira gratuita, em termos de hospedagem, até chegar em 65 mil artigos.

Neste artigo vou escrever um pouco sobre os desafios que comecei a ter ao escalar para 104 mil artigos (total atual em Março 2024).

Para recuperar nosso contexto, nosso blog (secreto) possui artigos gerados com inteligência artificial, os conteúdos são todos gravados em arquivos `markdown` e estou utilizando o `Zola`, que é escrito em `Rust`, para gerar o site com base nos markdowns e no meu template html. Além disso, é importante ressaltar que uma das premissas desse projeto é que eu não tenha nenhum custo com hospedagem.

A sequência desse artigo vai abordar os seguintes problemas que eu tive que lidar:

* Revisão das imagens para todos os artigos;
* O repositório está muito grande;
    * Não é possível fazer commits com mais de 2gb;
    * Build não funciona mais nas clouds gratuitas;
    * Migração das imagens para um bucket s3;
* E agora a build?

Então, vamos começar pelo início.

## Imagens, iteração em diretórios e async

Considere que as imagens sejam geradas por IA também e abstraia isso, apenas considere que é uma parte do processo.

104 mil arquivos markdown, seguindo a estrutura de diretório `yyyy/mm/dd/post-slug/index.md`.

Havia alguns artigos que não tinham imagens, meu processo de escala foi amadurecendo aos poucos e eu não voltei para revisar os primeiros. Como cheguei em um número legal, considerei fazer um `script` para mexer nisso.

Esse processo foi bem legal para explorar trabalhos assíncronos. Eu separei o script da seguinte maneira para facilitar minha gestão de memória e cpu:

Primeira parte: 

* Iterar recursivamente nos diretórios de conteúdos;
* Retornar a lista de diretórios;

Agora com a lista na mão de 100k itens, eu posso fazer o `dispatch` dos trabalhos realmente pesados de forma assíncrona.

Então, eu criei o método: `handlePost` que recebe como parâmetro o `path` e faz toda a magia internamente. 

Ao dizer magia, quero dizer:

* Verificar se já tem imagem criada no sub-diretórios `imagens/`;
* Criar a imagem caso seja necessário;
* Abrir o `markdown`, extrair o cabeçalho em `yml`, editar/adicionar o caminho da imagem, atualizar o arquivo.

Agora, com esse split dos comportamentos, eu posso iterar na lista de 100k itens e, de forma assíncrona, rodar o `handlePost`.

No artigo anterior, eu falei um pouco sobre `async` e usei de exemplo um `batch` que fiz no `vuepress` para lidar com isso de forma a não explodir nossa memória ram. Quando eu caí nessa parte do trabalho atual, eu me liguei que sou um noob total.

Vamos pensar um pouco sobre trabalho assíncrono aqui.

Eu tenho um loop e mando meu executor mandar bala em tudo, fazendo isso eu estou pouco me fodendo pro meu poder computacional e fazendo o javascript pensar que tenho 200Gb de memória ram e 32 núcleos de processador. Falando nisso, eu só tenho um simples i5 de 7 geração com 12gb de ram.

Eu já tive esse problema antes e eu costumava resolver fazendo o processamento em batches, ou seja, ao invés de mandar tudo de uma vez e esperar no final, eu considerei mandar em lotes de X unidades e ir processando aos poucos, também de forma assíncrona, mas aos poucos.

O processo comum, sem precisar se preocupar com recursos computacionais seria algo como iterar nos posts, encher o array promises com as promessas que o handlePost devolve e aguardar tudo no final. Tipo isso:


```js
const posts = []
const promises = []

for (posts in post) {
    promises.push(handlePost(post))
}

await Promise.allSettled(promises)

```

Essa abordagem é muito eficiente para muita coisa mas, no meu caso, a lista de posts é imensa e, além disso, o trabalho que o `handlePost` faz não é tão leve.

Então chutando algum número, se o `handlePost` consumir 1mb de memória ram e eu executar 100 mil processos desse de uma vez, já dá pra explodir meu computador numa boa.

Considerando isso, eu poderia fazer o `batch` como eu costumava fazer mas aí eu entendi algo muito óbvio porém minha mente explodiu na hora.

O processo de fazer em `batch` é literalmente em lote. O processo realmente funciona se eu quero economizar recursos e deixar o processo saudável.

No exemplo de `batch`, eu defino um número e, ao invés de mandar processar os 100k de uma vez, eu mando de 20 em 20.

Fazendo isso, você não vai explodir nada e vai resolver também, mas eu percebi um problema.

Por ser em lote, é literalmente em lote. Ou seja, Se eu mandar 20 itens para serem processados, os próximos só serão processados quando os 20 acabarem.

Ou seja, eu poderia já ter processado 19, ainda assim teria que esperar o último acabar para enviar os novos 20.

Isso é muito óbvio, eu confesso, mas eu não havia parado para refletir nisso. Foi aí que eu dei uma atenção para o p-limit, um pacote que me fez ganhar algumas horas apenas usando ele ao invés de escrever uma fila para lidar com isso do meu próprio jeito.

Diferente da minha abordagem em lotes, o p-limit define um limite mesmo do que vai ser executado. Ele não processa de X em X, ele limita o número máximo de execuções.

Resolvendo o que eu precisav. Ao invés de esperar os 20 acabarem para mandar os próximos 20, agora na medida que vão sendo liberadas vagas, o script vai executando.

E aí, agora o mesmo script que usei de exemplo, ficaria mais ou menos assim: 


```js
const pLimit = require('p-limit');

const limit = pLimit(20);
const posts = []

await Promise.allSettled(posts.map((item, index) => limit(() => handlePostFolder(item))))

```
PS: Não se apegue ao uso de `require`, `for`, `.map()`, syntax stuff. Foque no processo.

Eu gosto muito de mexer com coisas assíncronas, há muita complexidade nisso, análise, testes, etc. E nessa etapa que eu compreendi com mais clareza as limitações no meu `batch`, foi realmente muito legal.

Agora sim, fazer o processamento da criação das imagens e pronto! #Sóquenão!

## O repositório está imenso

Sim, agora nem o `push` eu não consegui fazer pois as mudanças estavam grandes de mais. Precisei fazer splits nos commits e pushes para conseguir subir isso tudo pro git. Talvez você não saiba, assim como eu não sabia, o git não nos permite fazer `pushes` com mais de 2 gb e também não permite enviar arquivos maiores que 100mb, alias, ele até permite mas para isso você precisa iniciar o repositório em modo [LFS](https://docs.github.com/en/repositories/working-with-files/managing-large-files/configuring-git-large-file-storage). E eu preferi simplificar as coisas do que lidar com isso desse jeito, então não considerei migrar para LFS.

Mas aí veio outro problema, mesmo subindo para o git, ainda não consigo fazer as build, já ficou chato para o Netlify e o GitHub Actions me ajudarem, eles cansaram de mim.

E nesse ponto eu estava com dois problema:

1. Ficou insustentável ter um repositório tão grande, operações lentas e improdutivas;
2. A build quebrou, não consigo nem colocar no ar os novos posts.

Após algumas mexidas e pensamentos, eu decidi tirar as imagens do repositório.
Pensando bem, ficaria muito melhor pra dar fôlego para o host e o S3 tem mecanismos que podem ser úteis no futuro em relação entregar os assets, então por que não?

Talvez tenha até sido uma decisão tardia, mas tudo beleza, no stress.

Como eu já tinha deixado lindão meu script de iteração nos posts, fiz um novo script aproveitando aquilo e agora o script simplesmente movia as fotos para um bucket S3 e atualizava o caminho no post, suave de fazer e tudo resolvido.

Agora, liberei bastante disco e realmente ficou mais fácil trabalhar e não ter que lidar com isso no mesmo lugar.

Aah, algo importante de dizer é que, quando você remove um arquivo do repositório, não necessariamente removeu do repositório. Quero dizer, o histórico ainda contém aquilo de alguma forma e seu diretório `.git` ainda será maior do que necessário, então precisei dar uma limpada nisso.

PS: Isso não é uma tarefa tão trivial, é complexo e perigoso.

Eu poderia remover apenas as imagens do histórico ou os arquivos grandes mas, quer saber, vou resetar todo o repositório e feliz vida nova.

Então, sim, eu zerei tudo sem medo de ser feliz e voltei pro `first commit` e ta tudo bem, eu tenho as tools que fiz em outros lugares e um backup de tudo isso. Além de trabalhar sozinho nisso, então no meu caso, zero problem.

Falando de custos, o meu bucket ainda está no free-layer, então o projeto ainda continua free. Com exceção, claro, dos gastos com IA, domínio e meu tempo dedicado (muitas horas mesmo).

## A build ainda não funciona nas clouds free

É isso mesmo pessoal, mesmo com o repositório limpo e as imagens no S3, a build ainda não funciona nas clouds.

Eu alcancei os limites dos processamentos da Netlify e do GitHub Actions para fazer deploy lá.

Uma solução para isso será tentar otimizar o `Zola` afim de consumir menos recursos de uma única vez durante a build, provavelmente a compreensão sobre processamento assíncrono em lotes ou com limites é algo que ajudará nessa melhoria.

Os próximos passos desse projeto não tem haver com crescer em números de artigos por enquanto, mas focar um pouco em monetização (nem só de código vive o homem) e isso inclui explorar um pouco multi-linguagem e marketing digital. Portanto, não tenho certeza se farei algo para resolver o processo da build nas clouds agora, por hora estou fazendo a build aqui no meu velho i5 e subindo para uma branch especifica. Essa branch agora é a trigger do projeto na Netlify, que simplesmente pega o output e joga para o site.

## Finalizando

Então, o resumo da ópera é que, chegamos nos 104k artigos e esta tudo bem obrigado, com exceção de eu ter que fazer a build aqui no meu computador.

Aqui no meu blog, aqui mesmo, meus artigos são mais voltados para os desafios técnicos que eu vou aprendendo a resolver, há também os desafios do projeto como um negócio mesmo, por exemplo, escalar as indexações do Google de forma ágil, anúncios, produtos digitais, etc, coisas que dão vida financeira a tudo isso e eu vou evoluindo e testando em paralelo sem falar nada aqui. Eu gosto de escrever as coisas mais técnicas mesmo, por exemplo o processo de dar um up na indexação do google via API é algo que eu posso escrever um pouco algum dia.

Além disso, se há algum tópico que você queira saber com mais detalhes, me manda a sugestão lá no LinkedIn que eu posso considerar escrever sobre.

Se você leu até aqui, deixe seu like lá no LinkedIn e compartilhe para ajudar. Obrigado!