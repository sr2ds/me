# Publicando Imagens no OCIR - Registry Oracle Cloud

O processo de publicação de imagens no Registry da Oracle Cloud é similar ao processa da AWS e GCP, não foge do padrão de publicação do docker. Basta autenticar e dar `push`, sem segredos.

Após fazer login no seu painel do Oracle Cloud, clique no Menu Registry dentro de Developer Services.

![Menu Oracle Cloud - Registry OCIR](https://dev-to-uploads.s3.amazonaws.com/i/phh2kehe67eysuu4jqac.png)

O Painel é bem simples e amigável, para começar, crie um Repositório.

PS: Evite ter imagens imensas assim :rofl:

![Painel Registry - Oracle Cloud](https://dev-to-uploads.s3.amazonaws.com/i/9m03le8x5ckgjahqi85r.png)

Com o nome do repositório em mãos, precisamos tomar nota do sua região, do namespace da sua conta e criar um token de autenticação. Vamos lá!

## Região Conta Oracle Cloud

Para saber sua região é simples, basta ver o link de acesso. Exemplo:
`https://console.sa-saopaulo-1.oraclecloud.com/containers/registry/`

A região do meu registry é `sa-saopaulo-1`.

## NameSpace Tenancy

Clique sobre o ícone do Perfil (canto superior direito) e em seguida em `Tenany: Alguma coisa`.

Na página que abrir, note na sessão `Object Storage Settings`, tem um campo que contém o seu namespace: `Object Storage Namespace:`.

## Auth API Token Oracle Cloud

Para criar um token de autenticação, acesse seu perfil clicando no ícone e depois em seu usuário (canto superior direito).

Na página que abrir, clique em `Auth Tokens` da barra lateral esquerda. Em seguida, basta clicar em `Generate Token`, colocar um nome e copiar o token.

![Menu Auth Tokens - Oracle Cloud](https://dev-to-uploads.s3.amazonaws.com/i/oyxfj0fc8kdfhlvxms4y.png)

## Login Oracle Registry OCIR com Docker

Agora o login é simples, a sequência é a seguinte:

```
docker login SUAREGIAO.ocir.io
SEUNAMESPACE/SEULOGIN
TOKEN
```

### Tag e Push

Para gerar sua tag e publicar:

```
docker tag SUAIMAGEMLOCAL:<tag> SUAREGIAO.ocir.io/SEUNAMESPACE/SEUREPOSITORIO:<tag>

docker push SUAREGIAO.ocir.io/SEUNAMESPACE/SEUREPOSITORIO:<tag>
```

Se tiver dúvidas, não deixe de comentar!

Até a próxima!