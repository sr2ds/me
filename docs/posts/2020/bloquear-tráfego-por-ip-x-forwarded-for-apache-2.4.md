# Bloquear Tráfego Por IP - X-Forwarded-For Apache 2.4

Quando seu apache recebe requisições de um LoadBalancer o IP de origem delas serão (claro) do LoadBalancer. Consequentemente, quando você precisar fazer algo como bloquear tráfegos indesejados por ip, o processo é um pouco diferente dos casos convencionais pois você não terá nas mãos o `REMOTE_ADDR` ou o simples `ip`, por exemplo.

No caso do exemplo abaixo, há um LoadBalancer redirecionando para o apache do servidor que ainda faz um proxy reverso para o container:

```
<VirtualHost *:443>
    <LocationMatch "/.*">
        Order Allow,Deny
        Allow from all
        ## você pode colocar uma lista de IPs
        SetEnvif X-Forwarded-For "xxx\.xxx\.xxx\.xxx" DenyAccess
        SetEnvif X-Forwarded-For "yyy\.yyy\.yyy\.yyy" DenyAccess
        Deny from env=DenyAccess
    </LocationMatch>

    ... # outras configs do seu serviço

    ProxyPreserveHost On
    ProxyRequests Off
    ProxyPass / http://container:port/ retry=1 timeout=180 nocanon
    ProxyPassReverse / http://container:port/
</VirtualHost>

```

Se isso lhe foi útil, deixe seu comentário! 
