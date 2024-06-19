# Sharding Database e SQLite

Recentemente, precisei buscar uma solução para distribuir uma única base de dados em múltiplos arquivos. Dadas algumas premissas e necessidades, fui buscar opções, entender um pouco sobre como isso funciona (limitações, prós, contras, etc.), e vou listar aqui um pouco desse aprendizado, apresentar os problemas e mostrar as soluções que fui encontrando.

Para contextualizar, isso se refere ao projeto [Coeur](https://github.com/sr2ds/coeur) e vou trazer exemplos de código de lá para cá.

## O problema
<iframe src="https://giphy.com/embed/ddugUSEmg5IFM8cPSD" width="480" height="360" style="" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/ProBitExchange-meme-running-joke-ddugUSEmg5IFM8cPSD">via GIPHY</a></p>

O GitHub limita o tamanho dos commits a 100 MB. Ou seja, se você está tentando fazer commit de uma base `SQLite` com mais de 100 MB, você não conseguirá.

Aliás, você vai conseguir depois de habilitar o [`LFS`](https://docs.github.com/en/repositories/working-with-files/managing-large-files/configuring-git-large-file-storage) no seu repositório, e de fato isso funcionará. O problema é que isso vai te levar à beira do upgrade do data plan do GitHub e, assim que você consumir `1 GB` de banda, precisará pagar para continuar seus commits.

Então, precisei ir em busca de uma forma para que o arquivo contendo os dados dos projetos fosse dividido em alguns arquivos menores, permitindo o uso do repositório comum do GitHub. E chegamos ao que significa Sharding.

> Sharding é uma técnica de particionamento de dados que distribui os dados por várias máquinas ou arquivos, o que pode ajudar a aumentar a escalabilidade e a performance de um banco de dados.

Se você está se perguntando por que eu estou armazenando dados em um repositório ao invés de subir uma instância em alguma cloud, é porque a premissa do `Coeur` é permitir que blogs sejam criados e mantidos utilizando o máximo de recursos gratuitos. Então, mantemos tudo que é necessário no repositório e fazemos deploy da build para o Netlify ou GitHub Pages.

Pronto, dada a compreensão do problema, vamos pesquisar por soluções.

## Buscando soluções

<iframe src="https://giphy.com/embed/L1ZqGzJDFYC7C" width="480" height="480" style="" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/mrw-dont-length-L1ZqGzJDFYC7C">via GIPHY</a></p>

Eu quero usar um banco de dados, ao invés de arquivos como os outros frameworks fazem, pois preciso fazer coisas como filtro, paginação e ordenação sem a necessidade de popular os dados na memória RAM e fazer isso em tempo de execução. O fato do design do `Coeur` ser baseado nessa premissa me permite ter um ótimo controle do uso dos recursos que minhas builds consomem, independente do tamanho do projeto.

Dito isso, pensando nas soluções mais comuns de banco de dados que conheço, seja relacionais ou não-relacionais, como `MySQL`, `PostgreSQL` ou `MongoDB`, por exemplo, todos carecem do serviço estar em execução para serem consumidos.

Ou seja, você precisa dar play no `mysqld` para poder manipular o banco de dados `MySQL`.

No final das contas, todos criam arquivos locais, mas possuem essa "interface" para que o banco de dados funcione. Essa "interface" é quem faz a gestão das conexões, processa consultas, etc. Honestamente, não sei se seria possível fazer query em qualquer um deles por baixo dos panos e, mesmo que fosse, a curva para fazer esse tipo de trâmite me parece muito maior. Então, as soluções que conhecia não iriam me ajudar.

Encontrei alguns nomes como: TiDB, RocksDB, Apache Derby e CockroachDB.

Belos nomes e também são legais e, com exceção do RocksDB, que é baseado em chave-valor, os outros poderiam talvez me atender bem e o TiDB até faz o sharding de forma automática. Ou seja, ele quebra o arquivo sozinho e faz a gestão disso por conta própria. De fato, seria uma mão na roda.

Mas aí me deparei com outro problema. Está planejado em meu roadmap fornecer uma maneira de administrar os dados de uma maneira bem simples depois, tipo um painel para manipular os dados, criar, editar, etc.
Eu poderia fazer um frontend para isso, criar as rotas, etc. Independente do banco de dados escolhido, vai funcionar se eu criar tudo na mão. Mas não faz muito sentido eu gastar muito tempo com essa parte visual de frontend, então considerei usar o `sqladmin` com `FastAPI` e `SQLAlchemy`. É super simples e amigável, não precisarei fazer nenhum frontend próprio e poderei resolver essa questão muito bem. É bonito, funcional e resolverá bem. Mas isso me colocou outro impasse, pois estes outros bancos não são exatamente compatíveis com `SQLAlchemy`. Então, se eu optasse pelo `TiDB`, por exemplo, ganharia o benefício de ter o sharding feito automaticamente, mas perderia o benefício de usar a interface `sqladmin`, a qual sei que é eficiente e me permitirá não me preocupar com isso depois. Nota: Talvez o projeto do painel ainda precisará de algum nível de personalização por conta do sharding, vamos ver.

Foi então que, após alguns dias pensando e analisando, considerei que o melhor cenário (talvez não seja o melhor, mas resolveu bem) seria eu abraçar o "sharding" manualmente e continuar no `SQLite` mesmo, o bom e velho `SQLite`. Ou seja, considerando que ele dê suporte a isso e eu já tinha as coisas funcionando com ele, bora fazer o `sharding` nele mesmo.

E foi o que fiz. Porém, ainda há uma ressalva, por padrão o SQLite só permite fazer attach de 10 bases de dados. Por hora, está ok. Mas no futuro, para utilizá-lo será necessário re-compilar o `sqlite` fazer aumento desse limite. E é algo relativamente simples, será tranquilo de criar uma instrução para isso depois, então vamos assim.

## SQLite

Se você nunca mexeu com SQLite, isso pode te ajudar a entender melhor:

> SQLite é um sistema de gerenciamento de banco de dados relacional (RDBMS) leve e autônomo que não requer um servidor separado para operar. Ele é amplamente utilizado em aplicações onde um banco de dados completo, com funcionalidades de um servidor, não é necessário, oferecendo uma solução simples, eficiente e de fácil implantação. Aqui estão algumas características e usos importantes do SQLite:
> 
> Autônomo e Sem Servidor: Diferente de muitos outros RDBMSs que requerem um servidor separado para funcionar (como MySQL ou PostgreSQL), o SQLite é integrado diretamente à aplicação. Ele armazena dados em um único arquivo de banco de dados no sistema de arquivos do host.
> 
> Portabilidade: Como o banco de dados é apenas um arquivo, é fácil de transportar entre diferentes sistemas operacionais. Basta copiar o arquivo para mover o banco de dados.
> 
> Desempenho: Para muitas aplicações, especialmente aquelas que não necessitam de um sistema de banco de dados complexo, o SQLite pode ser mais rápido que outros RDBMSs, devido à ausência de sobrecarga de comunicação entre um cliente e servidor.
> 
> Tamanho Compacto: O código-fonte do SQLite é muito pequeno em comparação com outros sistemas de gerenciamento de banco de dados, tornando-o adequado para dispositivos com recursos limitados, como smartphones e dispositivos IoT.
> 
> Facilidade de Uso: A instalação e a configuração são simples. Não há necessidade de um administrador de banco de dados (DBA) para configurar ou manter o SQLite.
> 
> ACID: SQLite é totalmente compatível com ACID (Atomicidade, Consistência, Isolamento, Durabilidade), garantindo a integridade dos dados, mesmo após falhas de sistema.

O `Coeur` basicamente possui duas operações: a primeira são os inserts que são feitos ao executar o script de importação de posts markdown. Ou seja, dado um diretório com os arquivos markdown, o script vai iterar recursivamente e converter cada markdown para uma entrada no banco de dados. 

A segunda é para fazer as builds, pois precisamos iterar de forma paginada em todos os registros gravados para fazer a criação dos arquivos estáticos.

A primeira operação, que faz o INSERT, é quem usa de forma excessiva a magia do sharding e é a responsável por fazer esse particionamento. As operações de consulta também precisam de alterações, pois agora a paginação será feita considerando bancos anexados ao primário, e não em um único mais. Além disso, infelizmente o `SQLAlchemy.orm` não simplifica esse tipo de operação, então também foi necessário alguma customização no Model que temos lá.

Não foi muito óbvio separar as responsabilidades, mas consegui chegar em um ponto aceitável de abstração e, por fim, temos duas classes: a `ShardingManager`, que é responsável por criar os bancos dinamicamente, analisar se está na hora de criar um novo banco, anexar os bancos na sessão principal e gerar a query que utiliza todos os bancos ao mesmo tempo e a `DatabaseManager`que cuida da sessão e operações.

Inclusive, vale aqui uma pausa para explicar isso.

Por conta do `SQLite` não fazer a gestão do particionamento sozinho, temos que construir a inteligência que vai analisar se o banco de dados atual já atingiu o máximo de tamanho desejado e, caso sim, criar o banco e anexá-lo na sessão utilizada. Ou seja, se os bancos já estão criados, a sessão precisa iniciar e já anexar todos. Caso não estejam, precisamos fazer isso automaticamente.

Além disso, precisamos customizar o SELECT principal para fazer UNION ALL em todos os SELECTs, banco por banco.

Você pode ver o arquivo completo [aqui: db.py](https://github.com/sr2ds/coeur/blob/main/coeur/apps/ssg/db.py), mas vou colar a classe aqui e fazer alguns comentários explicativos para analisarmos juntos cada método:


```python
class ShardingManager:
    # tamanho máximo em MB que eu quero considerar base para parar de usar o arquivo
    MAX_FILE_SIZE_MB = 80
    # nome do banco padrão
    DB1_NAME = "db1.sqlite"

    @staticmethod
    # simplesmente retorna todos os arquivos dentro do diretorio db, onde os bancos são criados
    # isso é usado para quase tudo, tipo anexar bancos, saber qual é o menor, etc
    def get_databases():
        return [filename for filename in os.listdir("db")]

    @staticmethod
    # baseado na lista de bancos que existem, eu preciso saber o que possui o tamanho menor
    # e retornar somente o nome dele, sem extencão
    def get_smallest_db():
        smallest_db = min(
            ShardingManager.get_databases(), key=lambda db: os.path.getsize(f"db/{db}")
        )
        return os.path.splitext(smallest_db)[0]

    @staticmethod
    # para fazer as queries precisa-se especificar o nome da tabela contendo o banco
    # com excessão do banco 1, que apenas o nome da tabela é necessário
    def _get_posts_table_by_db(db_file: str):
        db = os.path.splitext(db_file)[0]
        return "posts" if db == "db1" else f"{db}.posts"

    @staticmethod
    # cria o banco de dados novo
    # sendo que sempre será em númerica incremental: 1,2,3,4, etc
    # é necessário criar uma nova sessão para fazer isso pois esse método
    # é executado após um commit na sessão atual
    # o novo banco é criado utilizando a estrutura de um banco já existente
    def create_new_database():
        engine = create_engine(f"sqlite:///db/{ShardingManager.DB1_NAME}")
        Session = sessionmaker(bind=engine)
        session = Session()
        new_db_filename = f"db{len(ShardingManager.get_databases()) + 1}.sqlite"
        file_prefix = os.path.splitext(new_db_filename)[0]
        session.execute(text(f"ATTACH DATABASE 'db/{new_db_filename}' AS {file_prefix}"))
        session.execute(text(f"CREATE TABLE {file_prefix}.posts AS SELECT * FROM posts WHERE 0"))
        session.commit()
        session.close()

    @staticmethod
    # este método ajuda as futuras queries a serem executadas considerando todas as tabelas
    # lembrando que precisa especificar db.table para query, então aqui a gente faz para todos dbs
    def generate_union_posts_query(fields: str = "*") -> str:
        union_queries = []
        for filename in ShardingManager.get_databases():
            table_name = ShardingManager._get_posts_table_by_db(filename)
            union_queries.append(f"SELECT {fields} FROM {table_name}")
        return " UNION ALL ".join(union_queries)

    @staticmethod
    # esse método é responsável por fazer attach dos bancos na sessão atual
    # ele é chamada pelo evento de criação da conexão lá no create_engine
    def attach_databases(session: Session, *args):
        if databases := ShardingManager.get_databases():
            for filename in databases:
                if filename.endswith(".sqlite") and filename != ShardingManager.DB1_NAME:
                    session.execute(
                        f"ATTACH DATABASE 'db/{filename}' AS {os.path.splitext(filename)[0]}"
                    )

    @staticmethod
    # este método é chamado via evento após cada commit
    # ele é responsável por analisar se há necessidade de criar um novo banco de dados
    # e caso seja, chama o método create_new_database
    # que pensando agora nem precisaria existir o método create_new_database kkkk
    def manage_database_size(*args):
        smallest_db = ShardingManager.get_smallest_db()
        file_size = os.path.getsize(f"db/{smallest_db}.sqlite")
        if file_size > ShardingManager.MAX_FILE_SIZE_MB * 1024 * 1024:
            ShardingManager.create_new_database()
```

Já na classe `DatabaManager` eu mantive as coisas mais normais de banco de dados. Também precisei fazer uma gambiarrinha na classe do model para trocar o schema dinamicamente, mas já tive ideias melhores para isso isso, só que não mexi ainda.

```python

class DatabaseManager:
    def __init__(self):
        # aqui a gente faz setup da classe que é usada lá dentro do sistema
        # cria a conexão e define os métodos que serão chamados em determinados eventos para
        # gerir a questão do particionamento
        engine = create_engine(f"sqlite:///db/{ShardingManager.DB1_NAME}")
        event.listen(engine, "connect", ShardingManager.attach_databases)
        self.Session = sessionmaker(bind=engine)
        self.session = self.Session()
        event.listen(self.session, "after_commit", ShardingManager.manage_database_size)

    def new_post(self, title, content, content_format, path, extra, date, image):
        # aqui precisei fazer a gambiarra com o model do Post, mas da pra ficar mais abstrato
        # vou melhorar isso em breve
        smallest_db = ShardingManager.get_smallest_db()
        return Post(
            title=title,
            content=content,
            content_format=content_format,
            path=path,
            extra=extra,
            date=date,
            image=image,
            # would be nice do it better, but sqlalchemy orm has no support
            schema=smallest_db if smallest_db != "db1" else None,
        )

    def _fetch_pagination_mapped(self, offset: int = 0, limit: int = 200):
        # esse método executa as queries agrupadas de forma paginada e 
        # faz o map para o model sqlalchemy.orm no final 
        # fiz isso para não precisar alterar como o dado é acessado nos outros lugares
        # e manter o padrão
        union_query = ShardingManager.generate_union_posts_query()
        query = f"SELECT * FROM ({union_query}) AS all_posts LIMIT :limit OFFSET :offset"
        result = self.session.execute(text(query), {"limit": limit, "offset": offset})
        posts = result.fetchall()
        posts_dicts = []
        for post_tuple in posts:
            post_dict = {}
            for idx, column in enumerate(result.keys()):
                post_dict[column] = post_tuple[idx]
            posts_dicts.append(post_dict)
        return [Post(**post_dict) for post_dict in posts_dicts]

    def generator_page_posts(self, total_by_page: int = 200, max_posts_server: int = None):
        # esse método é responsável por fazer a paginação mas retornando um generator
        # então eu consigo iterar em todas as páginas sem carregar tudo na memória e 
        # abstrair de forma bem legal para ser consumido lá do outro lado
        total = self.count_total_posts()
        fetched = 0
        offset = 0

        if max_posts_server and total_by_page >= max_posts_server:
            total_by_page = max_posts_server

        while fetched < total:
            posts = self._fetch_pagination_mapped(offset=offset, limit=total_by_page)
            fetched += len(posts)
            offset = offset + total_by_page
            yield posts
            if max_posts_server and fetched >= max_posts_server:
                break

```

Então resumindo a funcionalidade, o que acontece é que após um commit ser executado, nosso analisador verifica se o banco atual já atingiu o tamanho permitido, caso sim, o novo banco será criado e anexado a sessão atual. Além disso, O INSERT precisa definir que o próximo INSERT será feito no novo banco pois isso não é automático.

E para fazer as consultas, precisamos fazer UNION dos selects de todos os bancos e aí podemos fazer consultas de forma global.

Falando assim parece bem simples, de fato talvez seja mesmo, principalmente agora que está pronto kkk

Te convido a dar uma olhada no [repositório](https://github.com/sr2ds/coeur) e aprender um pouco mais, caso tenha algumas ideias para melhorar algo, fique a vontade. Não sou ninja em nada e sempre podemos melhorar algo.

Valeu, até a próxima! 

<iframe src="https://giphy.com/embed/3o7qDEq2bMbcbPRQ2c" width="480" height="331" style="" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/mic-drop-peace-out-obama-3o7qDEq2bMbcbPRQ2c">via GIPHY</a></p>