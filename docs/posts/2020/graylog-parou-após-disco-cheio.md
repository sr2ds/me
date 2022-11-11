# GrayLog parou após disco cheio?

Se você tiver um problema com disco cheio no servidor, precisará reativar o modo de escrita do elasticSearch pois ele ficará parado até que isso seja feito.

No meu caso, este problema ocasionou no stop completo do `GrayLog`. Se você tiver o mesmo problema, basta realizar a seguinte chamada para seu servidor do Elastic.

```
curl -XPUT -H "Content-Type: application/json" https://SEU_ELASTIC:9200/_all/_settings -d '{"index.blocks.read_only_allow_delete": null}'
```

Para identificar esse problema no Graylog, acessei a tela de falhas dos índices `http://GRAYLOG:9000/system/indices/failures`.

E lá tinha uma lista de mensagens como esta:

`{"type":"cluster_block_exception","reason":"blocked by: [FORBIDDEN/12/index read-only / allow delete (api)];"}`

![Tela de Erros de Indice do Graylog](https://dev-to-uploads.s3.amazonaws.com/i/851afjbxmyz58rf20i25.png)

