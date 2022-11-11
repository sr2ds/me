# Docker - Instalação e Primeiros Passos

Neste artigo vamos começar a colocar a mão na massa, instalando e aprendendo alguns comandos básicos.

Antes de começar a instalação vamos falar de alguns pontos importantes em relação ao sistema operacional do host.  

Até a algum tempo atrás você só conseguia rodar o Docker no Windows instalando o VirtualBox. Isso já melhorou e agora o Docker roda de forma nativa no Windows também, assim como no Linux que sempre rodou.

Em contrapartida, se você usa Mac como eu, precisará instalar o VirtualBox para rodar o Docker e, vai por mim, fica uma belezura mas só quando tá desligado :rofl:. É só ligar que fica horrível. Dependendo do quanto você vive fazendo build, sua maquina vai fritar, ficar lenta e muito ruim para trabalhar. Para você ter idéia, eu acabei instalando o Ubuntu no Macbook Pro 2015 para poder trabalhar melhor, e agora sim ficou ótimo!

Eu não uso Windows há anos e até te recomendaria usar Linux para usar o Docker, mas como agora também roda sem VirtualBox lá, imagino que possa rodar bem também. Se você testar, deixe seu comentário aqui para sabermos!

## Como instalar o Docker?

Honestamente não vejo motivos para gastar tanto texto explicando os passos da instalação, então vou resumir e apontar os links oficiais caso você precise de ajuda extra.

### Docker no Linux

Há um script oficial maroto que faz todo o trabalho para você:

```
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

Você terá o docker instalado mas seu usuário comum ainda não terá acesso aos comandos principais do Docker. E, por favor, não ache que usar `sudo` para tudo na sua própria máquina seja normal, sua vida será melhor se as coisas forem mais simples*. 

PS: Não significa fazer seu usuário ser root também, ok? Mas o básico para seu trabalho acontecer, coisas que você faz toda hora, pode sim ser mais fácil.

Coloque seu usuário no grupo do docker para poder rodar os comandos:

```
sudo usermod -aG docker $USER
```

Reinicie sua máquina.

#### Oracle Linux

Recentemente precisei fazer a instalação em uma distribuição `Oracle Linux` e o setup padrão não funcionou, se for o seu caso, [este outro artigo](https://dev.to/sr2ds/instalando-docker-no-oracle-linux-nd6) pode ajudá-lo.

### Docker no MacOs

Você precisará ter o VirtualBox instalado e o procedimento de instalação será o mesmo do Docker (arrastar do finder). O link para download [está aqui](https://www.virtualbox.org/wiki/Downloads).

[Clique aqui](https://hub.docker.com/editions/community/docker-ce-desktop-mac/), baixe o `.dmg` clicando no botão azul "Get Docker Desktop for Mac (Stable)". 

Faz aquela super instalação super complexa que só no mac é possível.

![Instalação do Docker no MacOs - Arrastar para instalar do Finder](https://dev-to-uploads.s3.amazonaws.com/i/9ew552e0ikusslxxw90u.png)

### Docker no Windows

[Clique aqui](https://hub.docker.com/editions/community/docker-ce-desktop-windows/), baixe o `.exe` clicando no botão azul "Get Docker Desktop for Windows (stable)". 

Espere baixar e faz o de sempre, execute, next, next, finish.

## Primeiros comandos no Docker

Com o Docker instalado (uhu!) agora podemos começar a desbravar essa aventura.

Vamos começar listando e explicando o funcionamento básico de alguns comandos básicos, priorizando os mais utilizados no (meu) dia a dia. Alguns comandos terão artigos dedicados, por isso aqui vamos falar apenas dos mais simples.

### docker ps

Em breve começaremos a criar containers e precisaremos gerenciar suas instâncias, para isso o `docker ps` pode nos ajudar.

O `ps` nos permite visualizar quase tudo em relação aos containers:

```
# Listar containers em execução
docker ps

# Listar containers em execução e parados
docker ps -a

# Listar somentes os Ids dos containers em execução
docker ps -q

# Listar apenas os nomes e ids dos containers ativos
docker ps --format "{{.ID}}: {{.Names}}"
```
Com este último comando você pode formatar dos dados para melhorar a visualização e te dar mais poder quando precisar fazer scripts para automatizar as coisas.

Para mais exemplos de formatação no ps [clique aqui](https://docs.docker.com/engine/reference/commandline/ps/#formatting).

### docker pull

Como falamos no artigo anterior, os containers precisam de imagens para existir, que são registradas/gravadas/armazenadas em um servidor (público ou privado), geralmente chamado de Registry.

Existem muitas imagens oficiais e não oficiais que podem facilitar sua vida, você as encontrará no [DockerHub](https://hub.docker.com/).

```
# Baixando uma imagem latest
docker pull ubuntu

# Baixando uma imagem com tag
docker pull ubuntu:14.04
```

Você pode especificar qual é a tag da imagem, caso queira alguma especifica, ou simplesmente ter a `latest` por padrão.

```
# Ver imagens baixadas
docker images
```

Nota: Esses comandos padrões do docker vão trazer as imagens direto do DockerHub, porém, se você especificar o caminho do seu próprio registry.

```
docker pull myregistry.local:5000/testing/test-image
```

Indo além: Já parou para pensar que o seu servidor de produção poderia ter apenas a imagem mais atualizada ao invés de toda a sua aplicação? Imagine quão rápido seria colocar uma versão e até mesmo retornar a outra anterior?
Se quiser saber mais sobre isso que, a propósito também é possível sem Docker, procure por `Blue Green Deploy` e `Canary Release`.

### docker run

Já sabemos que existem imagens e agora precisamos usá-las.

O comando `docker run` é o cara que cria o container para nós.

```
# Cria container com a imagem ubuntu
docker run ubuntu
```

Perceba que rodar isso vai criar um container e, em seguida, ele vai parar. Isso acontece por que não há nenhum processo no interior do container em execução e, de que adiantaria um container sem ação?

Se você der um `docker ps -a` vai ver que o container está lá, porém, parada com STATUS `Exit (0) x seconds ago`. Ou seja, ele foi criado, subiu e morreu.

Para que este teste seja funcional, vamos fazer algo assim:

```
docker run -ti ubuntu bash
```

Isso vai te devolver um terminal interativo de dentro do container.
É literalmente um sistema operacional isolado aí. Você pode dar um `ls /home` e vai perceber que não tem nada, diferente do seu próprio ambiente, por exemplo.

Sabe aquele `rm -rf /` que tanto se zoa?! Você pode rodar aí dentro.

Se você tiver com medo, ok. Eu fiz, veja:

![apagando tudo dentro do container](https://dev-to-uploads.s3.amazonaws.com/i/g993df702m2jey7a625j.png)

Perceba que, na primeira linha, é minha maquina `david@david-MacBookPro` e depois já estou dentro do container.

Na última linha não é possível mais usar o binário `ls` pois ele foi excluído.

Agora perceba que eu posso sair (`CTRL+D`) e entrar de novo no container e ele terá tudo de volta.

![retornando ao container após deletar tudo](https://dev-to-uploads.s3.amazonaws.com/i/firjth57zwszbnoqscpi.png)

Isso foi apenas um `hello world` básico. Em breve avançaremos mais.

O `docker run` possui diversos parâmetros úteis, considere que ele é o cara que cria o container e precisamos de muitas coisas para nossas aplicações funcionarem, alguns exemplos são as portas de redes, montagem de volumes de dados, limites de memória, etc.

Eu montei este outro artigo que é somente o retorno do `docker run --help` traduzido e com alguns considerações.

[Opções do Comando Docker Run](https://dev.to/sr2ds/opcoes-do-comando-docker-run-g87)

Vamos parando por aqui pois já está extenso demais!

Se alguma coisa aqui foi útil pra você, deixe seu comentário! 

Até a próxima.