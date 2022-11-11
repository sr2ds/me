import{_ as s,c as a,o,d as e}from"./app.a6b88af1.js";const C=JSON.parse('{"title":"Bloquear Tr\xE1fego Por IP - X-Forwarded-For Apache 2.4","description":"","frontmatter":{},"headers":[],"relativePath":"posts/2020/bloquear-tr\xE1fego-por-ip-x-forwarded-for-apache-2.4.md"}'),n={name:"posts/2020/bloquear-tr\xE1fego-por-ip-x-forwarded-for-apache-2.4.md"},r=e(`<h1 id="bloquear-trafego-por-ip-x-forwarded-for-apache-2-4" tabindex="-1">Bloquear Tr\xE1fego Por IP - X-Forwarded-For Apache 2.4 <a class="header-anchor" href="#bloquear-trafego-por-ip-x-forwarded-for-apache-2-4" aria-hidden="true">#</a></h1><p>Quando seu apache recebe requisi\xE7\xF5es de um LoadBalancer o IP de origem delas ser\xE3o (claro) do LoadBalancer. Consequentemente, quando voc\xEA precisar fazer algo como bloquear tr\xE1fegos indesejados por ip, o processo \xE9 um pouco diferente dos casos convencionais pois voc\xEA n\xE3o ter\xE1 nas m\xE3os o <code>REMOTE_ADDR</code> ou o simples <code>ip</code>, por exemplo.</p><p>No caso do exemplo abaixo, h\xE1 um LoadBalancer redirecionando para o apache do servidor que ainda faz um proxy reverso para o container:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">&lt;VirtualHost *:443&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;LocationMatch &quot;/.*&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        Order Allow,Deny</span></span>
<span class="line"><span style="color:#A6ACCD;">        Allow from all</span></span>
<span class="line"><span style="color:#A6ACCD;">        ## voc\xEA pode colocar uma lista de IPs</span></span>
<span class="line"><span style="color:#A6ACCD;">        SetEnvif X-Forwarded-For &quot;xxx\\.xxx\\.xxx\\.xxx&quot; DenyAccess</span></span>
<span class="line"><span style="color:#A6ACCD;">        SetEnvif X-Forwarded-For &quot;yyy\\.yyy\\.yyy\\.yyy&quot; DenyAccess</span></span>
<span class="line"><span style="color:#A6ACCD;">        Deny from env=DenyAccess</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/LocationMatch&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    ... # outras configs do seu servi\xE7o</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    ProxyPreserveHost On</span></span>
<span class="line"><span style="color:#A6ACCD;">    ProxyRequests Off</span></span>
<span class="line"><span style="color:#A6ACCD;">    ProxyPass / http://container:port/ retry=1 timeout=180 nocanon</span></span>
<span class="line"><span style="color:#A6ACCD;">    ProxyPassReverse / http://container:port/</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/VirtualHost&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>Se isso lhe foi \xFAtil, deixe seu coment\xE1rio!</p>`,5),p=[r];function l(c,t,i,d,A,y){return o(),a("div",null,p)}const f=s(n,[["render",l]]);export{C as __pageData,f as default};
