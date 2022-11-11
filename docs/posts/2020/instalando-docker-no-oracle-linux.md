# Instalando Docker no Oracle Linux

Se você também está utilizando a Oracle Cloud, provavelmente vai precisar instalar o docker em algum momento.

A propósito, as instâncias gratuitas da OCI rodam com Oracle Linux e elas podem servir para fazer testes. Só possuem 1Gb de memória RAM mas, para você ter ideia, eu já subi containers de backend com `nodejs` e containers de entregas estáticas com `nginx` no mesmo servidorzinho e dá para brincar.

A instalação do Docker é simples e vai funcionar exatamente nesta sequência:

```  
## Incluir Repositório Docker
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

## Instalar docker-engine e docker-compose
sudo yum install docker-engine docker-compose

## Habilitar uso do Docker para o usuário atual (sem sudo)
sudo usermod -aG docker $USER

## Subir o docker na inicialização do sistema
sudo systemctl enable docker

## Reinicie pra tudo entrar em vigor
reboot
```
