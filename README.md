# ⚽ FutVision

FutVision é uma aplicação web desenvolvida em **React** que permite visualizar, explorar e comparar informações de futebol em tempo real, utilizando dados de APIs externas.

O sistema consome dados de uma API de futebol para fornecer informações detalhadas sobre ligas, times, jogadores e partidas, oferecendo uma experiência moderna e interativa ao usuário.

---

## 🚀 Funcionalidades

* 🏆 Listagem de ligas e times
* 📄 Página de detalhes de jogadores e times
* ⚽ Comparação entre jogadores
* 📊 Exibição de tabelas de classificação
* 📅 Visualização de partidas e resultados
* 📱 Interface responsiva

---

## 🛠️ Tecnologias Utilizadas

* **React**
* **Vite**
* **Axios**
* **React Router DOM**
* **JavaScript (ES6+)**
* **CSS**

---

## 🌐 API Utilizada

* ⚽ TheSportsDB API → Dados de futebol (ligas, times, jogadores, partidas)

---

## 📦 Como Executar o Projeto

Clone o repositório:

```bash
git clone https://github.com/seuusuario/futvision.git
```

Acesse a pasta:

```bash
cd futvision
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

---

## 🏗️ Arquitetura da Aplicação

A aplicação segue uma estrutura baseada em componentes reutilizáveis e separação de responsabilidades:

```
src/
 ├── pages/        # Páginas principais (Home, Detalhes, Compare)
 ├── components/   # Componentes reutilizáveis (Card, Navbar)
 ├── services/     # Configuração e consumo de APIs
 ├── App.jsx       # Definição das rotas
 └── main.jsx      # Ponto de entrada
```

---

## 🔀 Rotas da Aplicação

| Rota       | Descrição                          |
| ---------- | ---------------------------------- |
| `/`        | Página inicial com lista de ligas  |
| `/league/:id` | Página de detalhes da liga       |
| `/team/:id` | Página de detalhes do time        |
| `/player/:id` | Página de detalhes do jogador    |
| `/compare` | Comparação entre jogadores         |

---

## 📷 Prints da Aplicação

(INSIRA PRINTS AQUI)

Exemplo:

* Home
* Detalhes do jogador
* Comparação

---

## 🎯 Objetivo do Projeto

Este projeto foi desenvolvido como atividade acadêmica com o objetivo de aplicar conceitos de:

* Consumo de APIs REST
* Componentização em React
* Rotas dinâmicas
* Organização de projeto frontend
* Deploy de aplicações web

---

## 📈 Melhorias Futuras

* 🔍 Sistema de busca avançada
* ❤️ Favoritar jogadores e times
* 📊 Estatísticas detalhadas de jogadores
* 🌙 Modo escuro

---

## 👨‍💻 Autor

Desenvolvido por Eduardo Colombari Elias

---

## 📄 Licença

Este projeto está sob a licença MIT.
