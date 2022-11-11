# Apagando o cache do Redis

Se você não usa cache na sua aplicação, considere usar. Otimiza muito a performance e, se bem aplicado, vai te polpar bons recursos e ainda deixar o usuário bem feliz pela agilidade na entrega das requisições. Mas hoje não vamos falar de como implementar isso, é só um artigo rápido para te ajudar a limpar o cache caso precise.

## Como listar todo o cache

```
redis-cli keys * 
```

## Como apagar todo cache

```
redis-cli FLUSHALL ASYNC
```

## Como filtrar a lista do cache

```
redis-cli keys "*ALGUMA_PALAVRA_NO_MEIO*"
```

## Como apagar entradas específicas 

```
redis-cli --raw keys "*ALGUMA_PALAVRA_NO_MEIO*" | xargs redis-cli del
```

É isso aí! Como falei, é só um guia para consulta rápida!

Até a próxima!