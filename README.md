# site-marketing (Static Site)

Este projeto é o **site de apresentação** (Static Site no Render) do seu **Controle Financeiro**.

## Como publicar no Render

- Tipo: **Static Site**
- Build command: (vazio)
- Publish directory: `.`

## Ajustar domínio do app

Edite `assets/js/config.js` e troque o domínio pelo domínio real do seu app (Web Service).

Exemplo:

```js
window.APP_BASE_URL = 'https://site-de-orcamento.onrender.com';
```

O site usa esse domínio para redirecionar o visitante para:

- `/login`
- `/register?plan=basic|plus|pro`

## Como colocar prints reais do sistema

A seção **Produto** já tem cards prontos (placeholders). Para usar prints:

1. Coloque as imagens em `assets/img/` (ex.: `dashboard.png`, `entradas.png`).
2. Em `index.html`, dentro de cada `.shot-frame`, substitua o conteúdo por:

```html
<img src="assets/img/dashboard.png" alt="Dashboard do Controle Financeiro" />
```

Dica: mantenha a imagem em proporção horizontal (ex.: 1440×900) para ficar mais “produto”.
