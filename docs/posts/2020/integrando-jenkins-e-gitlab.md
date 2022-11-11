# Integrando Jenkins e Gitlab

Automatizar certas tarefas fará sua vida ser muito mais prática e produtiva. Um exemplo bom de tarefas que DEVEM ser automatizadas é o deploy.

Talvez você ainda não tenha os `stages` ideais para fazer a build e publicar em produção de forma automática, mas isso não pode te impedir de automatizar os ambientes de desenvolvimento e homologação, por exemplo.

Se você já tem tarefas no Jenkins e usa o GitLab, isso pode ser feito de uma forma bem simples e rápida:

## Configuração Jenkins

Vamos precisar de um token para a autenticação acontecer, acesse a configuração de um usuário que tenha permissão no seus jobs. Algo como:  `http://LINK_JENKINS/user/admin/configure`

Nesta página você poderá administrar os tokens.

![Administração de Usuário no Jenkins - Input de criação de Token](https://dev-to-uploads.s3.amazonaws.com/i/8ghaee1xyhsalqtusl4i.png)

Agora que temos o token e usuário em mãos, só precisamos configurar o projeto lá no GitLab.

## Configuração gitlab

No gitlab, acesse seu projeto e vá no Menu `Configurações > Integrações`.

Nesta tela você poderá definir integrações de plugins que estão configuradas no seu Jenkins e também cadastrar Hooks manuais, como faremos.

No meu caso, quero que quando houver Merge Requests com uma branch específica, o script de deploy seja executado. Veja a imagem abaixo:

![Configuração de Webhook de um projeto no GitLab](https://dev-to-uploads.s3.amazonaws.com/i/7t404qhxtb7cdqxvybto.png)

Seu link deverá ser a combinação de um usuário, token e o Job do Jenkins: `http://USER:TOKEN@LINK_JENKINS/view/Fronted/job/Frontend/build`

Nesse caso, `view/Fronted/job/Frontend/build` é um atalho para meu Job. Também pode ser o link direto do Job: `/job/NOME/build`.

Isso é o suficiente para as rotinas acontecerem automaticamente. Claro que é uma configuração básica mas poderá simplificar um pouco sua vida.

Até a próxima.

Créditos da capa: https://letztest.blogspot.com/2017/09/how-to-integrate-jenkins-and-gitlab.html