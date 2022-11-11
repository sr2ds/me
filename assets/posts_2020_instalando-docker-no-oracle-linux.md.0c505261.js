import{_ as s,c as a,o as n,d as e}from"./app.d643be22.js";const C=JSON.parse('{"title":"Instalando Docker no Oracle Linux","description":"","frontmatter":{},"headers":[],"relativePath":"posts/2020/instalando-docker-no-oracle-linux.md"}'),o={name:"posts/2020/instalando-docker-no-oracle-linux.md"},c=e(`<h1 id="instalando-docker-no-oracle-linux" tabindex="-1">Instalando Docker no Oracle Linux <a class="header-anchor" href="#instalando-docker-no-oracle-linux" aria-hidden="true">#</a></h1><p>Se voc\xEA tamb\xE9m est\xE1 utilizando a Oracle Cloud, provavelmente vai precisar instalar o docker em algum momento.</p><p>A prop\xF3sito, as inst\xE2ncias gratuitas da OCI rodam com Oracle Linux e elas podem servir para fazer testes. S\xF3 possuem 1Gb de mem\xF3ria RAM mas, para voc\xEA ter ideia, eu j\xE1 subi containers de backend com <code>nodejs</code> e containers de entregas est\xE1ticas com <code>nginx</code> no mesmo servidorzinho e d\xE1 para brincar.</p><p>A instala\xE7\xE3o do Docker \xE9 simples e vai funcionar exatamente nesta sequ\xEAncia:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">## Incluir Reposit\xF3rio Docker</span></span>
<span class="line"><span style="color:#A6ACCD;">sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">## Instalar docker-engine e docker-compose</span></span>
<span class="line"><span style="color:#A6ACCD;">sudo yum install docker-engine docker-compose</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">## Habilitar uso do Docker para o usu\xE1rio atual (sem sudo)</span></span>
<span class="line"><span style="color:#A6ACCD;">sudo usermod -aG docker $USER</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">## Subir o docker na inicializa\xE7\xE3o do sistema</span></span>
<span class="line"><span style="color:#A6ACCD;">sudo systemctl enable docker</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">## Reinicie pra tudo entrar em vigor</span></span>
<span class="line"><span style="color:#A6ACCD;">reboot</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div>`,5),l=[c];function r(p,t,i,d,u,m){return n(),a("div",null,l)}const _=s(o,[["render",r]]);export{C as __pageData,_ as default};
