# Portfólio — Kaique Fontiny

Site-portfólio profissional de **Kaique Augusto (Kaique Fontiny)** — Social Media, Direção Criativa e Produção Audiovisual. Portfólio geral (serve para candidaturas em qualquer empresa/agência).

> **Importante:** é um site **estático** (HTML/CSS/JS puro). **Não tem build e não usa React/Vite**,
> por isso não existe dependência pra instalar. Não rode `npm install` — só sirva a pasta.

## Como abrir (3 formas)
- **Mais rápido:** dê duplo clique em `index.html` (abre direto no navegador).
- **Com `npm` (o que você tentou):** dentro da pasta, rode
  ```bash
  npm run dev
  ```
  e acesse `http://localhost:5500`. (Esse script só chama o `python -m http.server`; não instala nada.)
- **Sem npm:** `python -m http.server 5500` e acesse `http://localhost:5500`.

## Como publicar (grátis)
Arraste a pasta inteira para **Netlify Drop** (app.netlify.com/drop) ou **Vercel**, ou use **GitHub Pages**.
Como é estático, não precisa de build.

## Estrutura
```
index.html          → página única (todas as seções)
css/style.css       → sistema de design + componentes + responsivo
js/main.js          → animações (preloader, cursor, reveals, contadores, parallax, marquee)
assets/img/         → retratos e cases reais (extraídos do portfólio original)
```

## Direção de design
- **Suíço / minimalista moderno**, com a **paleta enviada**: warm white `#FFFEFE`, graphite `#0E0D0A`,
  stone gray `#5F6B79`.
- Aplicação: **branco dominante** em quase tudo; faixas cinza-branco sutil (`#F4F5F6`) em marquee,
  serviços e carta; **Números** em branco com números graphite grandes; **Contato = bloco graphite**
  (o único momento escuro, pontual); rodapé graphite; texto graphite; **stone gray** como acento
  (ênfases, hover, métricas) e nos rótulos.
- Tipografia: **Archivo** (grotesca única, Google Fonts, pesos Black→Light), como no guia de estilo.
  Se você tiver a fonte exata do guia (parece Helvetica/Aeonik/Neue Montreal), me passe que eu troco.
- Animações discretas: preloader, reveal por scroll, split-text, retrato recortado com parallax,
  contadores animados, marquee de marcas, cursor custom e botões magnéticos. Tudo respeita `prefers-reduced-motion`.
- **Textos com voz humana**, em primeira pessoa e sem travessões ("—"), para não soar genérico/IA.

## Conteúdo
Copy modernizada com o vocabulário atual da comunicação e **sob medida para a Jacobs**
(seção "Por que a Jacobs"): marketing de influência, briefing de creator, UGC, cobertura em tempo real,
"transformar seguidores em clientes". Cases reais de beleza/varejo (L'Oréal Paris, Pantene,
Drogaria São Paulo, everyou, ClickBus, Samsung, Absolut) — o mesmo universo dos clientes da Jacobs.

## Notas da pesquisa (para o Kaique conferir antes de enviar)
- A grafia oficial da agência é **"Jacobs Comunicação"** (singular). Fundada por **Ana Jacobs** (São Paulo,
  Consolação), foco em **marketing de influência** e clientes de **beleza/cosméticos**. Mote: *"Conectando
  criadores & marcas"*. Valores: diversidade, inovação, profissionalismo, honestidade.
- Não foi possível recuperar o texto exato do anúncio da vaga. **Confirme os requisitos** no LinkedIn da
  "Jacobs Comunicação" e em trampos.co antes de personalizar mais a candidatura.
- Ajuste livremente qualquer métrica/afirmação para refletir os números mais recentes.
