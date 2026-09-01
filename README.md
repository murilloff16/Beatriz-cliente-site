# Beatriz Camillo — Avaliação de Imóveis

Site institucional estático (HTML/CSS/JS puro, sem build step).

- **Produção (Vercel):** https://beatriz-camillo-site.vercel.app
- **Domínio canônico:** https://www.beatrizcamillo.com.br

## Estrutura

```
index.html                                          # home (8 seções: início, sobre, serviços,
                                                    # como funciona, FAQ, atuação, credibilidade, contato)
styles.css                                          # folha de estilos principal
script.js                                           # interações
robots.txt · sitemap.xml                            # SEO

parecer-de-valor-de-mercado.html                    # páginas de serviço
avaliacao-imovel-inventario-santo-andre.html
avaliacao-imovel-divorcio-partilha-santo-andre.html
avaliacao-imovel-financiamento-santo-andre.html
consultoria-compra-venda-imovel-santo-andre.html
intermediacao-venda-aluguel-imovel-santo-andre.html
organizacao-documentacao-imovel-santo-andre.html

assets/
  beatriz.jpg · logo.jpg                            # imagens de marca
  hero-casa-desktop.png · hero-casa-mobile.png      # hero responsivo
  og-image.png                                      # Open Graph / Twitter card
  favicon.svg · favicon-180.png
  checklist-documentos-avaliacao.html               # material de apoio (noindex)
```

## Desenvolvimento local

Não há build. Basta servir a pasta:

```bash
npx serve .
# ou
python -m http.server 8000
```

## Observações

- O CSS crítico *above the fold* está inline no `<head>` de cada página; `styles.css` carrega o restante.
- `robots.txt` e `sitemap.xml` apontam para o domínio `www.beatrizcamillo.com.br` — ajustar `<lastmod>` a cada publicação relevante.
- `assets/checklist-documentos-avaliacao.html` está com `Disallow` no robots.txt (material de apoio, não indexável).
