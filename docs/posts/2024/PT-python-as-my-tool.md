# Python e um resumo profissional de 2023

Este é um artigo para ser lido com calma, assim como eu o escrevi com calma. Além disso, é um conteúdo feito por alguém que não escreve há algum tempo. E ressalto que é um artigo opinativo baseado nas minhas experiências próprias, isso não é um artigo científico, apenas minha opinião e pode conter erros, estou aqui para aprender.

Para contextualizar, vou falar sobre o primeiro ano (2023) criando features complexas no âmbito profissional em uma linguagem nova. Falarei sobre linguagens de programação mas não se limitando a isso, então você verá algo que pode parecer um resumo de 2023 em alguns pontos.

Se você já viu algo meu, deve saber que fiz uma maratona de estudos de `Rust` há alguns anos atrás, apenas por diversão, mas não atuei profissionalmente com `Rust`. Dessa vez, o processo foi um pouco diferente.

Quem me conhece sabe o quanto sou fascinado por tecnologia em diversas pontas, acho tudo incrível e preciso ter controle sobre meu tempo para não ficar alienado tentando entender como tudo funciona só por diversão. Poder aprender e trabalhar com uma nova linguagem no dia-a-dia foi apaixonante.

Minha vida de programador persistiu por muitos anos em `PHP` e `Javascript`, desde lá atrás quando víamos tudo amarrado em um arquivo `.php`. As coisas foram se modernizando, aprendemos a separar as coisas para melhorá-las, e eu também fui melhorando e aprendendo mais. Sempre aos poucos.

Eu sempre soube que o `Python` poderia ser interessante. Quando eu era sysadmin, já fazia uso de diversas ferramentas escritas em `Python`. Mesmo antes de saber programar em `Python`, ele já estava presente, assim como o PHP. No entanto, quando decidi estudar algo diferente, escolhi `Rust`, pois queria ter uma visão mais clara sobre tipagem forte e gerenciamento de memória, optando por algo mais baixo nível.

Apesar disso, algumas mudanças no trabalho me colocaram diante do `Python`. Foi lançado o desafio, e começamos a desenvolver os novos produtos e features em `Python`, não mais no amado e querido `PHP` com `Laravel`. Mas agora, o "pythonzão".

É importante saber que isso não é um guia para nada e eu não me senti obrigado a ser coerente em toda a linha de raciocínio, então você verá alguns devaneios e algum conteúdo extra que eu decidi adicionar.

## Primeiras impressões

Fevereiro de 2023 marca meu primeiro pull request mesclado em `Python`, uma implementação simples, algo como: algumas rotas novas no `fastAPI`, interações com nosso banco de dados `postgreSQL` e algumas integrações com uma `API` externa e upload de arquivos.

Tive um tempo para me adaptar antes de passar a ser responsável por grandes entregas, assim como pude contar com pessoas incríveis para me dar feedbacks construtivos e agilizar meu progresso; isso foi realmente de muito valor.

O `Python` tem uma sintaxe muito bonita e fácil de se acostumar. É possível escrever coisas poderosas digitando pouco. Não que não seja possível com outras linguagens; também é. Refiro-me especificamente ao número de teclas pressionadas, considerando que não fazemos uso excessivo de parênteses e colchetes no `Python`. Pode parecer uma bobeira este comentário, mas depois de meses criando códigos em `Python`, quando preciso criar algo no `PHP`, já sinto aquela preguiça de usar a sintaxe do `PHP`, mas claro que é apenas uma questão de costume.

A diferença na linguagem não é um grande problema; é relativamente simples entregar algum valor mesmo com essa mudança. No entanto, o processo de se tornar confiante leva um pouco de tempo. Honestamente, demorei um pouco para ter certeza se o que estava fazendo estava ok, pelo menos para começar a receber feedbacks. Mas após bastante prática e dezenas de PRs abertos, você vai ficando mais confiante e pegando o jeito.

O maior impacto em relação à performance nas entregas, eu não considero nem que foi a troca da linguagem em si, mas sim o vício e as facilidades que eu tinha no `Laravel`; coisas que agora eu precisaria re-aprender a pensar como fazer por mim mesmo e ainda de um jeito pythonico.

## Do PHP/JS para o Python

Considere que meu trabalho em `PHP` tem sido criar e manter serviços com `Laravel`, desde processamentos, integrações com APIs e, claro, cruds.

O trabalho manteve-se o mesmo, mas com `Python`. Foi uma questão de aprender o toolkit necessário, no nosso caso, usando o fastAPI para expor nossos recursos e alguns scripts no AirFlow para o pipeline de dados.

Confesso que minha experiência com NodeJs me ajudou muito mais na migração para o `Python` do que minha experiência com `PHP`.

Com o Node, eu já estava acostumado a criar as coisas com recursos mais enxutos, como por exemplo construir tudo do zero e expor com o expressJS. O processo é muito mais manual assim do que no `Laravel`, assim como no meu desafio profissional com `Python` e fastAPI.

Então, se fosse para eu definir qual conhecimento me permitiu entender melhor e mais rápido o novo cenário, não foram os anos com `Laravel`, mas sim os anos construindo serviços quase do zero com `Javascript`. Isso porque no meu cenário as coisas são bem enxutas também. Talvez se nossa stack tivesse um Django, eu pensaria diferente.

Eu tenho o hábito de sempre ter um side-project pessoal para treinar, aprender e testar coisas e ideias. Algumas vezes, preciso de scripts para realizar tarefas mais simples e geralmente eu fazia uso do `JS` para tais coisas. Na minha toolkit pessoal, geralmente considerava algo como:

- Trabalhos simples - apis simples e/ou poucos processamentos: `Javascript`
- Projetos FullStack mais complexos: `Laravel` e `VueJs`
- Scripts para tarefas corriqueiras: `Javascript`

Essa lista é pessoal, no meu trabalho atual estamos fazendo praticamente tudo com `Python`, com excessão de alguns serviços criados antes que eu mantenho em `PHP`.

A menos que meu desejo do momento seja diferente, ou a necessidade do projeto me mostre que a tecnologia precisa ser outra, geralmente eu sigo essa regra.

Agora, com o `Python` adicionado à minha caixa de ferramentas, comecei a fazer os scripts de tarefas pessoais em `Python` também, e isso tem sido muito legal.

Tudo isso realmente empodera, é legal poder pensar no próximo projeto e ter mais de uma linguagem para ponderar qual pode ser mais eficiente. Outra coisa que também é muito legal é que a experiência estudando e migrando para outras linguagens, tira o medo de ter que encarar algo totalmente diferente do que estou habituado, me torna mais flexível para resolver problemas diferentes.

Vou destacar aqui algumas pequenas mas poderosas diferenças que tornam a solução de alguns problemas mais fáceis com `Python`, pelo menos na minha experiência.

### Trabalhos assíncronos

Cara, eu sei que é bem de boa lidar com isso no `Javascript` com Async Await. Assim como também dá pra fazer com `PHP` Swoole.

Vamos falar primeiro do `JS`, é nativo. Subiu já tá ali, é só brincar. No `PHP` não é tanto assim, mas também dá e está tudo bem. Mas ordenando por dificuldade de dar os primeiros passos, eu diria que com `JS` é muito mais conveniente.

Agora, você já precisou controlar recursos para não deixar seu CPU explodir em tarefas muito grandes? Dá também, em qualquer linguagem dá. Mas em `Python`, é muito louco.

É muito simples subir a quantidade de threads que você quer e e simplesmente jogar tudo pra dentro delas dinamicamente sem se preocupar.

É muito legal você subir as threads extras e deixá-las disponíveis para executar processos separados da thread principal, se você fizer isso atrelado a um belo graceful shutdown, dá pra fazer muita coisa legal! Tá, eu sei, também dá com `PHP` e `JS`. 


```python
# cria um executor
EXECUTOR = ThreadPoolExecutor(
    max_workers=8, thread_name_prefix="example"
)
# submit da tarefa para ser executada em outra thread
EXECUTOR.submit(method_to_exec, param)

# finaliza o executor com segurança
EXECUTOR.shutdown(wait=True)
```

Agora, considere que você tenha conseguido resolver alguma tarefa de processamento grande em poucas linhas utilizando threads e você então pode contar com algo bem simples e já nativo no `python`: cacheamento de métodos

### Ferramentas de Cache

Quando eu vi isso pela primeira vez, achei uma loucura.

Se você quer cachear o resultado de um método sempre baseado no parâmetro de entrada, você só precisa colocar uma anotação em cima dele, algo como `@lru_cache`, agora veja esse exemplo que simples:

O método abaixo, escrito em `Python`, faz uma chamada na `API` da Amazon para buscar produtos baseados em um parâmetro de pesquisa. Para economizar chamadas da `API` e ter um retorno bem mais rápido, eu simplesmente usei o `lru_cache` para fazer o trabalho de cacheamento todo.

Dá sim para fazer com qualquer outra linguagem, lógico! Mas não é com uma simples linha em cima do método.

``` python
@lru_cache(maxsize=64)
def search_items(search):
    search_items_request = SearchItemsRequest(
        partner_tag=os.getenv("PAAPI_PARTNER_TAG"),
        partner_type=PartnerType.ASSOCIATES,
        keywords=search,
        search_index="All",
        item_count=8,
        resources=[
            SearchItemsResource.ITEMINFO_TITLE,
        ],
    )
    searched = amazon.search_items(search_items_request)
    items = [
        {
            "asin": product._asin,
            "link": product._detail_page_url,
            "image": product._images._primary._large._url,
            "title": product._item_info._title._display_value,
            "price": get_price(product),
        }
        for product in searched._search_result.items
    ]

    featured = get_featured(items)

    return {"featured": featured, "items": items, "search": searched._search_result._search_url}
```

#### Momento nostálgico - Uma experiência com Cache

Durante o período crítico da pandemia de COVID-19, tive o privilégio de trabalhar em um projeto desafiador e gratificante. Ao lado de colegas notáveis, como Renatão, Marcelo Rodrigues, Guilherme Rodrigues, Caio Sadério, Carlos (o "Japonês", cujo sobrenome, lamentavelmente, permanece um mistério) e Fábio Costa, enfrentamos um desafio monumental: fornecer informações vitais de forma acessível e eficiente por meio do [Portal da Transparência](https://transparencia.registrocivil.org.br/painel-registral/especial-covid).

Nossa tarefa envolveu a criação de gráficos detalhados e estatísticas impactantes relacionadas à COVID-19, alimentadas por uma base de dados nacional em constante atualização. Em meio a picos de tráfego impressionantes, com mais de 50 mil acessos únicos diários, e uma ampla gama de filtros, desde localização até demografia, cada etapa do processo exigiu um equilíbrio meticuloso entre eficiência e precisão.

Foi nesse contexto desafiador que minhas habilidades em gestão de cache e otimização de desempenho encontraram um terreno fértil. A integração estratégica do Redis como camada de cache em nossa arquitetura Laravel foi fundamental para garantir a robustez e a velocidade necessárias para enfrentar essa demanda excepcional.

Além das habilidades técnicas, aprendi a importância crucial de tomar decisões pragmáticas e orientadas por dados em momentos de pressão intensa. Perguntas como "Podemos simplificar o processamento no frontend?" e "Podemos aprimorar o pré-carregamento do cache?" não apenas ilustram os desafios enfrentados, mas também destacam a abordagem proativa e inquisitiva que adotamos para resolver problemas de forma eficaz.

Essa experiência não apenas solidificou meu conhecimento técnico, mas também reforçou minha convicção de que a colaboração e a resiliência são fundamentais para superar os desafios mais complexos. Foi um período realmente diferente, estávamos todos vivendo o medo do COVID, presos cada um em sua casa e se esforçando para fazer acontecer.

Eu não sabia nada de `Python` na época. Se soubesse também não mudaria nada, nós já resolviamos as coisas muito bem com `PHP`. Talvez uma coisinha ou outra seria diferente, talvez mais fácil, sei lá, nada em especial que me faria trocar tudo para `Python`.

### Generator e Iterators

Honestamente, eu nunca usei isso em outra linguagem, pois aprendi no `Python`.

É um tema mais complexo do que programar por si só, mas é super poderoso para grandes volumes de dados e/ou até mesmo para economizar recursos e deixar seu serviço bem levinho.

Talvez até por eu passar os últimos anos um tanto que injessado no `Laravel`, isso foi um ponto muito legal de mudança. A necessidade de pensar em estrutura de dados mais complexas, em uma linguagem nova e começar a ver o mundo por fora de um padrão, me ajudou muito a crescer profissionalmente, no meio de tudo isso, eu descobri que dava pra fazer a mesma coisa que já parecia boa, de uma forma ainda melhor. Remodelando as coisas e explorando aos poucos o re-desenho de classes para contemplar cada vez melhor as regras de negócios, somando tudo isso ao uso de `yields`, `generators` e `iterators`. Isso tudo dá um livro a parte e ainda não sei o suficiente para isso, então vou parar por aqui.

```python
# classe com iterator e yield 
class contadorZao:
    def __init__(self, key):
        self.key = key

    def __next__(self):
        if self.key > 100000000000000:
            raise StopIteration

        self.key = self.key + 1

        yield self.key

    def __iter__(self):
        return self

# iterando na classe que vai gerar 100000000000000 possiblidades sem pesar nada
for key in contadorZao(0):
	current_key = next(key)
```

Outra coisa legal nesse tema, é o quanto podemos economizar em relação a uso de memória alocada, veja esse exemplo claro:

```python

import sys

print('Simple list size in bytes', sys.getsizeof( [x for x in range(9000)] ))
print('Comprehension Expressions size in bytes', sys.getsizeof( (x for x in range(9000)) ))

// Simple list size in bytes 75672
// Comprehension Expressions size in bytes 104

```

### Momento nostálgico de novo

Isso não tem necessariamente haver com python, mas sim com a minha experiência profissional desde o inicio. 

Desde o início, minha carreira esteve profundamente ligada ao universo do Linux e do Open Source. Meu primeiro grande trabalho envolveu a administração de servidores Linux, onde explorei uma infinidade de ferramentas de código aberto para gerenciamento de sistemas e redes, muitas delas escritas em Python. Enquanto mergulhava nesse ambiente, decidi ampliar meus horizontes participando de um curso de Pentest, onde fui introduzido ao fascinante mundo da segurança cibernética. Embora na época eu ainda não dominasse a programação, absorvi valiosos conhecimentos sobre as ferramentas e técnicas utilizadas no universo do Pentest, a maioria delas baseada em Python.

Hoje, olhando para trás, percebo o quão distante estou das minhas origens, mas ao mesmo tempo, o quão enriquecido estou em conhecimento. Essa sensação de voltar às raízes é surpreendentemente reconfortante e estimulante. Refiro-me às origens não apenas no sentido de onde comecei, mas também à compreensão aprofundada que adquiri sobre as ferramentas que outrora constituíam minha rotina profissional.

### Sintaxe

Parece bobeira, eu ainda acho lindo a sintaxe do `PHP` que me obriga a por ponto e virgula a cada linha, mas cara, que loucura é quando você se acostuma a não por mais nada, nem mesmo parênteses nos `if`, e pior que eu achava estranhão antes, parecia faltar algo. Mas agora eu vejo com outros olhos, isso agrega bastante valor no aprendizado. É muito comum para quem está começando se perder por conta desses detalhes, programação por sí só já é um tanto que complexa, se você puder focar em programar e puder pular alguns detalhes como esses, faz toda diferença. De qualquer forma, isso não faz a lingaguem ser melhor ou pior, nem mais feia ou mais bonita, mas quero deixar esse ponto aqui pois agora que eu já me acostumei, eu realmente acho legal.

## Nem tudo é sobre Linguagens

Isso é muito louco, eu evolui muito como desenvolvedor nos últimos dois anos, em especial por dois fatores: 

### Trabalhando com um time internacional

Isso é enriquecedor de um jeito imensurável. Tanto no sentido do idioma por ter trocado o idioma padrão para Inglês, quanto pelo modo de pensar e programar.

Cada cultura tem seu jeito de fazer determinadas coisas, no meu caso, minha percepção é que a percepção de qualidade das entregas é muito superior agora em comparação às minhas experiências anteriores. Não somente pelo time de tecnologia que está com a mão na massa, mas também pelo time de produto e quase toda a empresa, isso faz com que a gente não saia programando igual louco para entregar logo e bora pro próximo, dá pra fazer as coisas com mais dedicação e realmente colocar o foco na qualidade. Isso fica explicito nos code-reviews do time.

O trabalho é parte da vida, é importante que ele nos deixe felizes também, seja no contato com os outros ou nas tarefas pessoais. Eu acho sensacional conversar e trabalhar com pessoas de diferentes culturas e pontos de vistas diferentes. Algumas coisas são detalhes simples mas que eu acho muito legal, um exemplo simbólico e receber um "Bom dia" de um colega de trabalho que não fala português ou então poder saudar alguém com um "Namastê". Talvez isso não seja interessante para ninguém além de mim mas eu acho irado.

### Fugindo do padrão

Juntando a linguagem nova, um framework novo e a nova percepção de qualidade, precisei me reenquadrar e me desenvolver para acompanhar o ritmo e isso foi muito legal.

Como já disse acima, coisas que antes já estava muito bem feita por estar no 'padrão Laravel', agora precisei reaprender e pensar em como poderia ser feito, considerando arquiteturas diferentes e também a linguagem.

### A maturidade dos processos

Às vezes sinto que nasci fazendo deploy na mão, antes do git. Era ssh, rsync, ftp, etc. Depois veio o git e ficou mais profissional.
Estou dizendo isso pois eu sempre gostei de fazer isso, a sensação de subir o Ubuntu lá na cloud e fazer o setup de tudo sempre foi legal pra mim.
Mas agora, com tudo rodando liso, pipelines, kubernetes, sentry, datadog, etc...

Caramba, é lindo ver tudo funcionando e não precisar se preocupar, podendo usar o tempo total para otimizar código e fluxos.

Juntando isso com processos de discovery, desenvolvimento e release bem definidos, o time decola de um jeito realmente que dá gosto. As coisas funcionam, o time fica com a sensação de missão cumprida e quando tem algum problema, é fácil e rápido colocar de volta aos trilhos.

## Finalizando

Atualmente meu dia-a-dia profissional como backend tem sido criando e mantendo aplicações com ênfase em `Python`, mas ainda cuido de alguns serviços essenciais da nossa stack que foram escritos em `PHP`. Então, serviços novos, são tudo em `Python` e o que já estava 'vivo' ficou em `PHP`.

Agora, pessoalmente, eu tenho meus próprios projetos de estimação e lab, neles tenho muita coisa em `JavaScript`, tanto em `VueJS` quanto serviços `Node`. Alguma coisa em `Rust` e também projetos `PHP`, como falei lá em cima, a grande virada agora têm sido que estou fazendo muitas coisas novas em `Python` quando dá para encaixar e funcionar bem, isso tem sido muito legal e me deixa ainda mais confortável com a linguagem. Ao mesmo tempo que, por conta de manter contato com meu bom e velho `PHP` e `JS`, eu não vou esquecendo tudo completamente e me mantenho ativo nas múltiplas stacks, menos do que antes, mas continuo dando conta do recado.

Agora para você que foi paciente e chegou até aqui, obrigado por me acompanhar nessa jornada, tentei dar uma resumida e te mostrar que pode sim ser de grande valor dar uma chance para algo novo, isso vai te fazer pensar diferente e aumentar seus poderes. Não posso dizer que seja fácil nem tão pouco confortável, pois é realmente complexo, mas é muito legal quando a fase dolorida passa.