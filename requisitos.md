# Teste Front - 2026

## 🧪 Teste Prático – Front-end (Next.js)

---

# 🎯 Objetivo

Construir uma mini-aplicação com `/login` e `/produtos`, fiel às referências visuais enviadas, consumindo os mesmos endpoints de login e listagem com autenticação via Bearer Token.

---

# ✅ Requisitos Funcionais (Obrigatórios)

## 1) 🔐 Autenticação e Guarda de Rotas

### Tela `/login`

- Campo de email
- Campo de senha
- Checkbox “manter logado”
- Link “esqueceu a senha?” (não precisa funcionar)

### Regras

- Chamar endpoint de login (POST)
- Em sucesso:
  - Salvar `token_de_acesso`
  - Redirecionar para `/produtos`
- Em erro (`status = 0`):
  - Exibir mensagem amigável
- Bloquear acesso a `/produtos` sem token
  - Redirect automático para `/login`
- Erro `401`:
  - Forçar logout
  - Redirecionar para `/login`

---

## 2) 🛍 Listagem de Produtos (Cards)

### Requisitos do Grid

Buscar via GET com Bearer Token e renderizar grid responsivo contendo:

- Imagem
- Nome
- Código
- Preço formatado em BRL (`R$ 4,60`)
- Botão **“CONFIRA”**
- Selo **“EXCLUSIVO!”**

### Funcionalidades

- Busca com debounce (300–500ms)
  - Filtrar por nome e/ou código usando POST com filtros
  - Exibir estado vazio quando não houver resultados
- Paginação **ou** Infinite Scroll (escolher um)
  - Carregar lotes
  - Indicar loading incremental
- Ordenação local:
  - Preço (asc/desc)
  - Nome (A→Z / Z→A)

---

## 3) 🔎 Detalhe Rápido do Produto

- Ao clicar em “CONFIRA”, abrir Modal ou Drawer
- Usar campos retornados pela API
- Se faltar algo, reutilizar campos do card
- Botão “Fechar”

### Acessibilidade da Modal

- Foco preso (focus trap)
- Tecla `Esc` fecha
- Uso correto de `aria-*`

---

## 4) ❤️ Favoritos (Persistência Local)

- Permitir favoritar produto (ícone no card)
- Persistir em `localStorage`
- Filtro: “Mostrar apenas favoritos”

---

## 5) 🎨 Estados da UI e Tratamento de Erros

- Skeleton / Loading:
  - Primeira carga
  - Carregamentos paginados
- Estado de erro com ação “Tentar novamente”
- Erro 401:
  - Logout automático
  - Redirect para `/login`
- Formatação de preço em BRL

---

# ⚙️ Requisitos Técnicos (Obrigatórios)

- Next.js (App Router ou Pages)
- TypeScript
- Zustand (estado global)
- Tailwind CSS
- React Query (cache, revalidação, loading/erro)
- Responsividade mobile-first
- Acessibilidade básica (labels, alt, foco visível)
- SEO:
  - `<title>`
  - `<meta name="description">`
- Lighthouse (DevTools) ≥ 90:
  - Performance (desktop)
  - Acessibilidade (desktop)
- Middleware para rotas protegidas
- Code Splitting
- Dockerizar aplicação
- Código legível e fácil de manter

---

# ⭐ Diferenciais (Valem Pontos Extras)

## Testes

- 1–2 testes unitários (Vitest/Jest + React Testing Library)
- 1 teste E2E (Playwright):
  - Fluxo: login → ver grid

## Estados Refinados
# Teste Front - 2026

## 🧪 Teste Prático – Front-end (Next.js)

---

# 🎯 Objetivo

Construir uma mini-aplicação com `/login` e `/produtos`, fiel às referências visuais enviadas, consumindo os mesmos endpoints de login e listagem com autenticação via Bearer Token.

---

# ✅ Requisitos Funcionais (Obrigatórios)

## 1) 🔐 Autenticação e Guarda de Rotas

### Tela `/login`

- Campo de email
- Campo de senha
- Checkbox “manter logado”
- Link “esqueceu a senha?” (não precisa funcionar)

### Regras

- Chamar endpoint de login (POST)
- Em sucesso:
  - Salvar `token_de_acesso`
  - Redirecionar para `/produtos`
- Em erro (`status = 0`):
  - Exibir mensagem amigável
- Bloquear acesso a `/produtos` sem token
  - Redirect automático para `/login`
- Erro `401`:
  - Forçar logout
  - Redirecionar para `/login`

---

## 2) 🛍 Listagem de Produtos (Cards)

### Requisitos do Grid

Buscar via GET com Bearer Token e renderizar grid responsivo contendo:

- Imagem
- Nome
- Código
- Preço formatado em BRL (`R$ 4,60`)
- Botão **“CONFIRA”**
- Selo **“EXCLUSIVO!”**

### Funcionalidades

- Busca com debounce (300–500ms)
  - Filtrar por nome e/ou código usando POST com filtros
  - Exibir estado vazio quando não houver resultados
- Paginação **ou** Infinite Scroll (escolher um)
  - Carregar lotes
  - Indicar loading incremental
- Ordenação local:
  - Preço (asc/desc)
  - Nome (A→Z / Z→A)

---

## 3) 🔎 Detalhe Rápido do Produto

- Ao clicar em “CONFIRA”, abrir Modal ou Drawer
- Usar campos retornados pela API
- Se faltar algo, reutilizar campos do card
- Botão “Fechar”

### Acessibilidade da Modal

- Foco preso (focus trap)
- Tecla `Esc` fecha
- Uso correto de `aria-*`

---

## 4) ❤️ Favoritos (Persistência Local)

- Permitir favoritar produto (ícone no card)
- Persistir em `localStorage`
- Filtro: “Mostrar apenas favoritos”

---

## 5) 🎨 Estados da UI e Tratamento de Erros

- Skeleton / Loading:
  - Primeira carga
  - Carregamentos paginados
- Estado de erro com ação “Tentar novamente”
- Erro 401:
  - Logout automático
  - Redirect para `/login`
- Formatação de preço em BRL

---

# ⚙️ Requisitos Técnicos (Obrigatórios)

- Next.js (App Router ou Pages)
- TypeScript
- Zustand (estado global)
- Tailwind CSS
- React Query (cache, revalidação, loading/erro)
- Responsividade mobile-first
- Acessibilidade básica (labels, alt, foco visível)
- SEO:
  - `<title>`
  - `<meta name="description">`
- Lighthouse (DevTools) ≥ 90:
  - Performance (desktop)
  - Acessibilidade (desktop)
- Middleware para rotas protegidas
- Code Splitting
- Dockerizar aplicação
- Código legível e fácil de manter

---

# ⭐ Diferenciais (Valem Pontos Extras)

## Testes

- 1–2 testes unitários (Vitest/Jest + React Testing Library)
- 1 teste E2E (Playwright):
  - Fluxo: login → ver grid

## Estados Refinados

- Placeholder de imagem
- Retry/backoff automático

---

# 📊 O que Será Avaliado

- Testes unitários e integração
- Renderização e performance
- Separação de responsabilidades
- Arquitetura e organização
- Componentização
- Consumo de API
- Qualidade de código

---

# 🔌 Endpoints

---

# 🔐 Endpoint de Login

**METHOD:** POST  
**URL:**  
`https://apihomolog.innovationbrindes.com.br/api/innova-dinamica/login/acessar`

## Headers

```json
Content-Type: application/json
```

## Body

```json
{
  "email": "dinamica",
  "senha": "123"
}
```

## Response

```json
{
  "status": 1,
  "message": "Sucesso.",
  "token_de_acesso": "XXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "dados_usuario": {
    "codigo_usuario": "30",
    "nome_usuario": "DINAMICA",
    "codigo_grupo": "0",
    "nome_grupo": "ADMIN"
  }
}
```

### Campos

- `status` → 1 = sucesso, 0 = erro
- `message` → mensagem da API
- `token_de_acesso` → token para autenticação
- `dados_usuario`:
  - `codigo_usuario`
  - `nome_usuario`
  - `codigo_grupo`
  - `nome_grupo`

---

# 📦 Endpoint Listagem de Produtos (GET)

**METHOD:** GET  
**URL:**  
`https://apihomolog.innovationbrindes.com.br/api/innova-dinamica/produtos/listar`

## Headers

```json
Content-Type: application/json
Authorization: Bearer {{token_de_acesso}}
```

## Body

```json
{}
```

## Response

```json
[
  {
    "codigo": "3419",
    "nome": "COPO PLÁSTICO 700ML",
    "referencia": "10151373419",
    "codigo_categoria": "1015137",
    "imagem": "https://innovationbrindes.com.br/images/produtos/3419/copo-plastico-ml-brindes-personalizados 1-1.jpg",
    "preco": "4.5999999999999996",
    "descricao": "copo plástico 700ml"
  }
]
```

---

# 🔎 Endpoint Listagem de Produtos com Filtro (POST)

**METHOD:** POST  
**URL:**  
`https://apihomolog.innovationbrindes.com.br/api/innova-dinamica/produtos/listar`

## Headers

```json
Content-Type: application/json
Authorization: Bearer {{token_de_acesso}}
```

## Body

```json
{
  "nome_produto": "",
  "codigo_produto": ""
}
```

## Response

```json
[
  {
    "codigo": "3419",
    "nome": "COPO PLÁSTICO 700ML",
    "referencia": "10151373419",
    "codigo_categoria": "1015137",
    "imagem": "https://innovationbrindes.com.br/images/produtos/3419/copo-plastico-ml-brindes-personalizados 1-1.jpg",
    "preco": "4.5999999999999996",
    "descricao": "copo plástico 700ml"
  }
]
```

---

# 🚀 Entrega

- Repositório GitHub público

## O README deve conter:

- Passos para rodar o container Docker
- Decisões técnicas
- O que ficou pendente
- Screenshot do Lighthouse (desktop)
- GIF ou MP4 curto demonstrando o fluxo da aplicação

- Placeholder de imagem
- Retry/backoff automático

---

# 📊 O que Será Avaliado

- Testes unitários e integração
- Renderização e performance
- Separação de responsabilidades
- Arquitetura e organização
- Componentização
- Consumo de API
- Qualidade de código

---

# 🔌 Endpoints

---

# 🔐 Endpoint de Login

**METHOD:** POST  
**URL:**  
`https://apihomolog.innovationbrindes.com.br/api/innova-dinamica/login/acessar`

## Headers

```json
Content-Type: application/json
```

## Body

```json
{
  "email": "dinamica",
  "senha": "123"
}
```

## Response

```json
{
  "status": 1,
  "message": "Sucesso.",
  "token_de_acesso": "XXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "dados_usuario": {
    "codigo_usuario": "30",
    "nome_usuario": "DINAMICA",
    "codigo_grupo": "0",
    "nome_grupo": "ADMIN"
  }
}
```

### Campos

- `status` → 1 = sucesso, 0 = erro
- `message` → mensagem da API
- `token_de_acesso` → token para autenticação
- `dados_usuario`:
  - `codigo_usuario`
  - `nome_usuario`
  - `codigo_grupo`
  - `nome_grupo`

---

# 📦 Endpoint Listagem de Produtos (GET)

**METHOD:** GET  
**URL:**  
`https://apihomolog.innovationbrindes.com.br/api/innova-dinamica/produtos/listar`

## Headers

```json
Content-Type: application/json
Authorization: Bearer {{token_de_acesso}}
```

## Body

```json
{}
```

## Response

```json
[
  {
    "codigo": "3419",
    "nome": "COPO PLÁSTICO 700ML",
    "referencia": "10151373419",
    "codigo_categoria": "1015137",
    "imagem": "https://innovationbrindes.com.br/images/produtos/3419/copo-plastico-ml-brindes-personalizados 1-1.jpg",
    "preco": "4.5999999999999996",
    "descricao": "copo plástico 700ml"
  }
]
```

---

# 🔎 Endpoint Listagem de Produtos com Filtro (POST)

**METHOD:** POST  
**URL:**  
`https://apihomolog.innovationbrindes.com.br/api/innova-dinamica/produtos/listar`

## Headers

```json
Content-Type: application/json
Authorization: Bearer {{token_de_acesso}}
```

## Body

```json
{
  "nome_produto": "",
  "codigo_produto": ""
}
```

## Response

```json
[
  {
    "codigo": "3419",
    "nome": "COPO PLÁSTICO 700ML",
    "referencia": "10151373419",
    "codigo_categoria": "1015137",
    "imagem": "https://innovationbrindes.com.br/images/produtos/3419/copo-plastico-ml-brindes-personalizados 1-1.jpg",
    "preco": "4.5999999999999996",
    "descricao": "copo plástico 700ml"
  }
]
```

---