# Dump Mental: Próximos passos do desafio Blog com +100K posts

Update do momento atual: Estou lidando com dois repositórios, sendo que o primeiro é o Blog em PT-BR com 104K posts, e o segundo é em EN com 64K posts. Esse post é um dump mental a respeito dos desafios atuais.

Eu preferi separar os repositórios para lidar com isso de forma separada, considerando que cada blog possui um domínio próprio e coisas diferentes, seria ainda mais complexo e pesado deixar no mesmo lugar.

Agora estou com um desafio de expandir esses projetos utilizando a arquitetura que eu escolhi iniciar e pretendo manter: Todo frontend gratuito no Netlify ou GitHub Pages.

Eu realmente não quero mudar isso, quero os estáticos lá prontos, em algo gratuito, fácil de trocar e que "nunca" cai.

Isso não significa que eu não tenha custos e que eu não precise de um backend, eu preciso sim e gasto também. Mas eu resolvi que o core do projeto, que é o fornecimento do conteúdo estático para o usuário nunca pode ficar indisponível e precisa ficar realmente separado de coisas que exigem mais lógica. No meu caso eu tenho APIs também, mas simplesmente para empoderar o que está feito lá no modo estático. Caso a API caia, o usuário não vai sofrer com isso. Por isso e também pelo desafio que criei para eu mesmo, de escalar ao máximo possível de forma gratuita, vou continuar meu plano.

O que está acontecendo agora é que, além da Build estar demorando muito e gastanto muita memória ram, trabalhar no repositório com tudo isso de arquivos acaba ficando pesado até para o vscode. Se eu preciso abrir o diretório dos posts, preciso aguardar. Quando preciso criar algo lá dentro, preciso aguardar.
Além do que, dependendo da mudança, o vscode demora para receber o update disso na aba do repositório, afinal, realmente é muita coisa.

Ainda estou refletindo sobre os pós e contras a respeito da mudança que estou planejando, mas quero documentar minha linha de raciocínio aqui.

Eu entendi que a Build consome muita memória pois toda lista de posts são carregados na memória RAM no processo, realmente é complexo paginar isso estando no sistema de arquivos. Além disso, o processo de build também cria páginas HTML com a paginação de todos os posts. E também cria páginas com paginação agrupando os posts por categorias.

Tudo isso é feito em memória, é muito fácil para o desenvolvedor simplesmente duplicar todo esse array para fazer as filtragens e tratamentos necessários para a build acontecer. Para blogs pequenos, não tem problema nenhum. Mas no meu caso, o processo ocupa muita memória naturalmente. E aí, no meio da build, o desenvolvedor pode ter simplesmente criado um novo array (sem referência direta) com os dados categorizados e fez o volume de memória crescer ainda mais.

Pensando nisso eu estou considerando algumas mudanças, a primeira delas seria parar de usar arquivos para os posts e armazenar meus posts em um sqlite. Isso vai aliviar meu trabalho no repositório, afinal não terão mais 100k arquivos. E ainda me dará alguns poderes para realizar o processo de build usando paginação direto do banco de dados. Ou seja, não precisarei carregas tudo do sistema de arquivos para memória de uma vez. Além disso, vou poder ter mais liberdade para expandir mais ainda de acordo com minha necessidade.

Vou listar aqui os pontos positivos dessa migração:

* Poder paginar, filtrar e ordenar com mais facilidade;
* Economizar recursos no processo de build e desenvolvimento;
* Ganharei margem para escalar ainda mais em número de posts;
* Mesclar os projetos considerando multi-lingua/multi-dominio;
* Posso unir minhas outras ferramentas em uma única tool cli.

Convenhamos, eu já migrei 3x de framework na medida que fui escalando esse projeto. Eu posso muito bem criar algo meu e ir implementando minhas features considerando meus próprios objetivos, afinal eu acumulei alguma experiência em relação a como os frameworks funcionam e as limitações que eles possuem para meu tipo de necessidade.

Estou mapeando e planejando a implementação inicial que vai me permitir sair do framework Zola e entrar no meu próprio. O básico para isso acontecer não é algo muito complexo e conseguirei fazer em poucas semanas. 

Claro que não terá tudo que o Zola possui mas já terá o essencial para eu rodar o projeto e ir implementando outras coisas aos poucos.

O desafio de criar algo assim também me diverte, vou precisar aprender um pouco sobre template-engine, eu sempre fiz isso de forma manual, apenas fazendo replaces pontuais. Mas nesse caso vai ser legal usar um template-engine para evoluir mais rapido e permitir templates diferentes no framework.

Eu estou certo de que consigo fazer o processo ser mais leve usando um banco para iterar nos posts ao invés de carregar tudo em memória como os frameworks de markdown fazem. Eu não estou certo se consigo fazer o mesmo processo de build no mesmo tempo que tenho atualmente. Talvez possa melhorar esse fluxo uma vez que tudo estará em minhas mãos e posso re-organizar tudo livremente, mas inicialmente pode acontecer de, apesar de economizar memória e recursos, a build demorar um pouco mais. Duvido que isso aconteça, mas é algo que pode vir a acontecer por algum ponto que não estou vendo agora.

Estou considerando criar isso em Python como um CLI baseado em Typer. Terei a chance de aprender algo novo e depois unificar outras tools que tenho no mesmo CLI. Se eu juntar tudo terei um toolkit completo para blog farm baseado em IA, ficará mais fácil para eu manter tudo e poderei abrir para open-source algo mais completo e legal.

Eu tenho tools feitas em Javascript, inclusive um CLI completo para isso. Mas eu estou realmente gostando de Python por diversas razões, posso listar aqui type-hint e Threads, então vou me divertir e melhorar minhas skills na linguagem.

O projeto novo deverá iniciar com algo basico como:

* Ler posts do sqlite;
* Converter conteúdo do post (inicialmente markdown) para HTML;
    * Extra: É de se pensar, posso manter isso e abrir suporte para manter posts em outros formatos;
    * Extra: E também posso manter o conversor para dar suporte a Markdown direto sem DB;
* Fazer o parse do conteúdo para o template;
* Criar os arquivos HTML;
* Arquivos HTML de paginação;
* Sitemap completo (paginado a cada 30k posts);

Com essa base de features eu consigo iniciar a migração dos meus projetos, depois vou precisar de mais coisas, claro, como algo que faça hot-reload para eu trabalhar nos templates, etc.

Vou parar por aqui, isso foi um dump da minha memória ram humana. Eu tenho pensado nisso faz algumas semanas e hoje peguei para refletir, planejar e fazer alguns rascunhos pensando na arquitetura disso, pontos positivos e pontos negativos. Então esse post é literalmente uma nota de diário do que estou planejando fazer.

Obrigado por ler, até mais :)