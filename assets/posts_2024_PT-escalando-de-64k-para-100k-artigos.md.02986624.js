import{_ as e,c as o,o as a,d as s}from"./app.d643be22.js";const f=JSON.parse('{"title":"Escalando de 65k para 104k artigos no Blog","description":"","frontmatter":{},"headers":[{"level":2,"title":"Imagens, itera\xE7\xE3o em diret\xF3rios e async","slug":"imagens-iteracao-em-diretorios-e-async","link":"#imagens-iteracao-em-diretorios-e-async","children":[]},{"level":2,"title":"O reposit\xF3rio est\xE1 imenso","slug":"o-repositorio-esta-imenso","link":"#o-repositorio-esta-imenso","children":[]},{"level":2,"title":"A build ainda n\xE3o funciona nas clouds free","slug":"a-build-ainda-nao-funciona-nas-clouds-free","link":"#a-build-ainda-nao-funciona-nas-clouds-free","children":[]},{"level":2,"title":"Finalizando","slug":"finalizando","link":"#finalizando","children":[]}],"relativePath":"posts/2024/PT-escalando-de-64k-para-100k-artigos.md"}'),r={name:"posts/2024/PT-escalando-de-64k-para-100k-artigos.md"},i=s(`<h1 id="escalando-de-65k-para-104k-artigos-no-blog" tabindex="-1">Escalando de 65k para 104k artigos no Blog <a class="header-anchor" href="#escalando-de-65k-para-104k-artigos-no-blog" aria-hidden="true">#</a></h1><p>Para voc\xEA n\xE3o ficar perdido, eu sugiro que veja o primeiro artigo - <a href="https://sr2ds.github.io/me/posts/2024/PT-desafios-e-solucoes-na-gestao-de-blogs-com-mais-de-50-mil-artigos-ia-rust-e-vue.html" target="_blank" rel="noreferrer">Desafios e solu\xE7\xF5es na Gest\xE3o de blogs com +50 mil artigos - IA, Rust e Vue</a> - onde falei um pouco sobre como fui resolvendo os desafios ao escalar um blog de maneira gratuita, em termos de hospedagem, at\xE9 chegar em 65 mil artigos.</p><p>Neste artigo vou escrever um pouco sobre os desafios que comecei a ter ao escalar para 104 mil artigos (total atual em Mar\xE7o 2024).</p><p>Para recuperar nosso contexto, nosso blog (secreto) possui artigos gerados com intelig\xEAncia artificial, os conte\xFAdos s\xE3o todos gravados em arquivos <code>markdown</code> e estou utilizando o <code>Zola</code>, que \xE9 escrito em <code>Rust</code>, para gerar o site com base nos markdowns e no meu template html. Al\xE9m disso, \xE9 importante ressaltar que uma das premissas desse projeto \xE9 que eu n\xE3o tenha nenhum custo com hospedagem.</p><p>A sequ\xEAncia desse artigo vai abordar os seguintes problemas que eu tive que lidar:</p><ul><li>Revis\xE3o das imagens para todos os artigos;</li><li>O reposit\xF3rio est\xE1 muito grande; <ul><li>N\xE3o \xE9 poss\xEDvel fazer commits com mais de 2gb;</li><li>Build n\xE3o funciona mais nas clouds gratuitas;</li><li>Migra\xE7\xE3o das imagens para um bucket s3;</li></ul></li><li>E agora a build?</li></ul><p>Ent\xE3o, vamos come\xE7ar pelo in\xEDcio.</p><h2 id="imagens-iteracao-em-diretorios-e-async" tabindex="-1">Imagens, itera\xE7\xE3o em diret\xF3rios e async <a class="header-anchor" href="#imagens-iteracao-em-diretorios-e-async" aria-hidden="true">#</a></h2><p>Considere que as imagens sejam geradas por IA tamb\xE9m e abstraia isso, apenas considere que \xE9 uma parte do processo.</p><p>104 mil arquivos markdown, seguindo a estrutura de diret\xF3rio <code>yyyy/mm/dd/post-slug/index.md</code>.</p><p>Havia alguns artigos que n\xE3o tinham imagens, meu processo de escala foi amadurecendo aos poucos e eu n\xE3o voltei para revisar os primeiros. Como cheguei em um n\xFAmero legal, considerei fazer um <code>script</code> para mexer nisso.</p><p>Esse processo foi bem legal para explorar trabalhos ass\xEDncronos. Eu separei o script da seguinte maneira para facilitar minha gest\xE3o de mem\xF3ria e cpu:</p><p>Primeira parte:</p><ul><li>Iterar recursivamente nos diret\xF3rios de conte\xFAdos;</li><li>Retornar a lista de diret\xF3rios;</li></ul><p>Agora com a lista na m\xE3o de 100k itens, eu posso fazer o <code>dispatch</code> dos trabalhos realmente pesados de forma ass\xEDncrona.</p><p>Ent\xE3o, eu criei o m\xE9todo: <code>handlePost</code> que recebe como par\xE2metro o <code>path</code> e faz toda a magia internamente.</p><p>Ao dizer magia, quero dizer:</p><ul><li>Verificar se j\xE1 tem imagem criada no sub-diret\xF3rios <code>imagens/</code>;</li><li>Criar a imagem caso seja necess\xE1rio;</li><li>Abrir o <code>markdown</code>, extrair o cabe\xE7alho em <code>yml</code>, editar/adicionar o caminho da imagem, atualizar o arquivo.</li></ul><p>Agora, com esse split dos comportamentos, eu posso iterar na lista de 100k itens e, de forma ass\xEDncrona, rodar o <code>handlePost</code>.</p><p>No artigo anterior, eu falei um pouco sobre <code>async</code> e usei de exemplo um <code>batch</code> que fiz no <code>vuepress</code> para lidar com isso de forma a n\xE3o explodir nossa mem\xF3ria ram. Quando eu ca\xED nessa parte do trabalho atual, eu me liguei que sou um noob total.</p><p>Vamos pensar um pouco sobre trabalho ass\xEDncrono aqui.</p><p>Eu tenho um loop e mando meu executor mandar bala em tudo, fazendo isso eu estou pouco me fodendo pro meu poder computacional e fazendo o javascript pensar que tenho 200Gb de mem\xF3ria ram e 32 n\xFAcleos de processador. Falando nisso, eu s\xF3 tenho um simples i5 de 7 gera\xE7\xE3o com 12gb de ram.</p><p>Eu j\xE1 tive esse problema antes e eu costumava resolver fazendo o processamento em batches, ou seja, ao inv\xE9s de mandar tudo de uma vez e esperar no final, eu considerei mandar em lotes de X unidades e ir processando aos poucos, tamb\xE9m de forma ass\xEDncrona, mas aos poucos.</p><p>O processo comum, sem precisar se preocupar com recursos computacionais seria algo como iterar nos posts, encher o array promises com as promessas que o handlePost devolve e aguardar tudo no final. Tipo isso:</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> posts </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> []</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> promises </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> []</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">for</span><span style="color:#A6ACCD;"> (posts </span><span style="color:#89DDFF;">in</span><span style="color:#A6ACCD;"> post) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">promises</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">push</span><span style="color:#F07178;">(</span><span style="color:#82AAFF;">handlePost</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">post</span><span style="color:#F07178;">))</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">await</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Promise</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">allSettled</span><span style="color:#A6ACCD;">(promises)</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>Essa abordagem \xE9 muito eficiente para muita coisa mas, no meu caso, a lista de posts \xE9 imensa e, al\xE9m disso, o trabalho que o <code>handlePost</code> faz n\xE3o \xE9 t\xE3o leve.</p><p>Ent\xE3o chutando algum n\xFAmero, se o <code>handlePost</code> consumir 1mb de mem\xF3ria ram e eu executar 100 mil processos desse de uma vez, j\xE1 d\xE1 pra explodir meu computador numa boa.</p><p>Considerando isso, eu poderia fazer o <code>batch</code> como eu costumava fazer mas a\xED eu entendi algo muito \xF3bvio por\xE9m minha mente explodiu na hora.</p><p>O processo de fazer em <code>batch</code> \xE9 literalmente em lote. O processo realmente funciona se eu quero economizar recursos e deixar o processo saud\xE1vel.</p><p>No exemplo de <code>batch</code>, eu defino um n\xFAmero e, ao inv\xE9s de mandar processar os 100k de uma vez, eu mando de 20 em 20.</p><p>Fazendo isso, voc\xEA n\xE3o vai explodir nada e vai resolver tamb\xE9m, mas eu percebi um problema.</p><p>Por ser em lote, \xE9 literalmente em lote. Ou seja, Se eu mandar 20 itens para serem processados, os pr\xF3ximos s\xF3 ser\xE3o processados quando os 20 acabarem.</p><p>Ou seja, eu poderia j\xE1 ter processado 19, ainda assim teria que esperar o \xFAltimo acabar para enviar os novos 20.</p><p>Isso \xE9 muito \xF3bvio, eu confesso, mas eu n\xE3o havia parado para refletir nisso. Foi a\xED que eu dei uma aten\xE7\xE3o para o p-limit, um pacote que me fez ganhar algumas horas apenas usando ele ao inv\xE9s de escrever uma fila para lidar com isso do meu pr\xF3prio jeito.</p><p>Diferente da minha abordagem em lotes, o p-limit define um limite mesmo do que vai ser executado. Ele n\xE3o processa de X em X, ele limita o n\xFAmero m\xE1ximo de execu\xE7\xF5es.</p><p>Resolvendo o que eu precisav. Ao inv\xE9s de esperar os 20 acabarem para mandar os pr\xF3ximos 20, agora na medida que v\xE3o sendo liberadas vagas, o script vai executando.</p><p>E a\xED, agora o mesmo script que usei de exemplo, ficaria mais ou menos assim:</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> pLimit </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">p-limit</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> limit </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">pLimit</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">20</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> posts </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> []</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">await</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Promise</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">allSettled</span><span style="color:#A6ACCD;">(posts</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">map</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">item</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">index</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">limit</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">handlePostFolder</span><span style="color:#A6ACCD;">(item))))</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>PS: N\xE3o se apegue ao uso de <code>require</code>, <code>for</code>, <code>.map()</code>, syntax stuff. Foque no processo.</p><p>Eu gosto muito de mexer com coisas ass\xEDncronas, h\xE1 muita complexidade nisso, an\xE1lise, testes, etc. E nessa etapa que eu compreendi com mais clareza as limita\xE7\xF5es no meu <code>batch</code>, foi realmente muito legal.</p><p>Agora sim, fazer o processamento da cria\xE7\xE3o das imagens e pronto! #S\xF3quen\xE3o!</p><h2 id="o-repositorio-esta-imenso" tabindex="-1">O reposit\xF3rio est\xE1 imenso <a class="header-anchor" href="#o-repositorio-esta-imenso" aria-hidden="true">#</a></h2><p>Sim, agora nem o <code>push</code> eu n\xE3o consegui fazer pois as mudan\xE7as estavam grandes de mais. Precisei fazer splits nos commits e pushes para conseguir subir isso tudo pro git. Talvez voc\xEA n\xE3o saiba, assim como eu n\xE3o sabia, o git n\xE3o nos permite fazer <code>pushes</code> com mais de 2 gb e tamb\xE9m n\xE3o permite enviar arquivos maiores que 100mb, alias, ele at\xE9 permite mas para isso voc\xEA precisa iniciar o reposit\xF3rio em modo <a href="https://docs.github.com/en/repositories/working-with-files/managing-large-files/configuring-git-large-file-storage" target="_blank" rel="noreferrer">LFS</a>. E eu preferi simplificar as coisas do que lidar com isso desse jeito, ent\xE3o n\xE3o considerei migrar para LFS.</p><p>Mas a\xED veio outro problema, mesmo subindo para o git, ainda n\xE3o consigo fazer as build, j\xE1 ficou chato para o Netlify e o GitHub Actions me ajudarem, eles cansaram de mim.</p><p>E nesse ponto eu estava com dois problema:</p><ol><li>Ficou insustent\xE1vel ter um reposit\xF3rio t\xE3o grande, opera\xE7\xF5es lentas e improdutivas;</li><li>A build quebrou, n\xE3o consigo nem colocar no ar os novos posts.</li></ol><p>Ap\xF3s algumas mexidas e pensamentos, eu decidi tirar as imagens do reposit\xF3rio. Pensando bem, ficaria muito melhor pra dar f\xF4lego para o host e o S3 tem mecanismos que podem ser \xFAteis no futuro em rela\xE7\xE3o entregar os assets, ent\xE3o por que n\xE3o?</p><p>Talvez tenha at\xE9 sido uma decis\xE3o tardia, mas tudo beleza, no stress.</p><p>Como eu j\xE1 tinha deixado lind\xE3o meu script de itera\xE7\xE3o nos posts, fiz um novo script aproveitando aquilo e agora o script simplesmente movia as fotos para um bucket S3 e atualizava o caminho no post, suave de fazer e tudo resolvido.</p><p>Agora, liberei bastante disco e realmente ficou mais f\xE1cil trabalhar e n\xE3o ter que lidar com isso no mesmo lugar.</p><p>Aah, algo importante de dizer \xE9 que, quando voc\xEA remove um arquivo do reposit\xF3rio, n\xE3o necessariamente removeu do reposit\xF3rio. Quero dizer, o hist\xF3rico ainda cont\xE9m aquilo de alguma forma e seu diret\xF3rio <code>.git</code> ainda ser\xE1 maior do que necess\xE1rio, ent\xE3o precisei dar uma limpada nisso.</p><p>PS: Isso n\xE3o \xE9 uma tarefa t\xE3o trivial, \xE9 complexo e perigoso.</p><p>Eu poderia remover apenas as imagens do hist\xF3rico ou os arquivos grandes mas, quer saber, vou resetar todo o reposit\xF3rio e feliz vida nova.</p><p>Ent\xE3o, sim, eu zerei tudo sem medo de ser feliz e voltei pro <code>first commit</code> e ta tudo bem, eu tenho as tools que fiz em outros lugares e um backup de tudo isso. Al\xE9m de trabalhar sozinho nisso, ent\xE3o no meu caso, zero problem.</p><p>Falando de custos, o meu bucket ainda est\xE1 no free-layer, ent\xE3o o projeto ainda continua free. Com exce\xE7\xE3o, claro, dos gastos com IA, dom\xEDnio e meu tempo dedicado (muitas horas mesmo).</p><h2 id="a-build-ainda-nao-funciona-nas-clouds-free" tabindex="-1">A build ainda n\xE3o funciona nas clouds free <a class="header-anchor" href="#a-build-ainda-nao-funciona-nas-clouds-free" aria-hidden="true">#</a></h2><p>\xC9 isso mesmo pessoal, mesmo com o reposit\xF3rio limpo e as imagens no S3, a build ainda n\xE3o funciona nas clouds.</p><p>Eu alcancei os limites dos processamentos da Netlify e do GitHub Actions para fazer deploy l\xE1.</p><p>Uma solu\xE7\xE3o para isso ser\xE1 tentar otimizar o <code>Zola</code> afim de consumir menos recursos de uma \xFAnica vez durante a build, provavelmente a compreens\xE3o sobre processamento ass\xEDncrono em lotes ou com limites \xE9 algo que ajudar\xE1 nessa melhoria.</p><p>Os pr\xF3ximos passos desse projeto n\xE3o tem haver com crescer em n\xFAmeros de artigos por enquanto, mas focar um pouco em monetiza\xE7\xE3o (nem s\xF3 de c\xF3digo vive o homem) e isso inclui explorar um pouco multi-linguagem e marketing digital. Portanto, n\xE3o tenho certeza se farei algo para resolver o processo da build nas clouds agora, por hora estou fazendo a build aqui no meu velho i5 e subindo para uma branch especifica. Essa branch agora \xE9 a trigger do projeto na Netlify, que simplesmente pega o output e joga para o site.</p><h2 id="finalizando" tabindex="-1">Finalizando <a class="header-anchor" href="#finalizando" aria-hidden="true">#</a></h2><p>Ent\xE3o, o resumo da \xF3pera \xE9 que, chegamos nos 104k artigos e esta tudo bem obrigado, com exce\xE7\xE3o de eu ter que fazer a build aqui no meu computador.</p><p>Aqui no meu blog, aqui mesmo, meus artigos s\xE3o mais voltados para os desafios t\xE9cnicos que eu vou aprendendo a resolver, h\xE1 tamb\xE9m os desafios do projeto como um neg\xF3cio mesmo, por exemplo, escalar as indexa\xE7\xF5es do Google de forma \xE1gil, an\xFAncios, produtos digitais, etc, coisas que d\xE3o vida financeira a tudo isso e eu vou evoluindo e testando em paralelo sem falar nada aqui. Eu gosto de escrever as coisas mais t\xE9cnicas mesmo, por exemplo o processo de dar um up na indexa\xE7\xE3o do google via API \xE9 algo que eu posso escrever um pouco algum dia.</p><p>Al\xE9m disso, se h\xE1 algum t\xF3pico que voc\xEA queira saber com mais detalhes, me manda a sugest\xE3o l\xE1 no LinkedIn que eu posso considerar escrever sobre.</p><p>Se voc\xEA leu at\xE9 aqui, deixe seu like l\xE1 no LinkedIn e compartilhe para ajudar. Obrigado!</p>`,65),n=[i];function p(t,l,c,d,m,u){return a(),o("div",null,n)}const h=e(r,[["render",p]]);export{f as __pageData,h as default};
