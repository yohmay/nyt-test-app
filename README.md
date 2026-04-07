# 📰 NYT News App

Aplicação mobile desenvolvida com **React Native + Expo** que consome a API pública do New York Times para exibir artigos mais populares e permitir busca e favoritos.

### Tecnologias utilizadas
- **React Native** (0.81.5)
- **Expo** (54.0.33)
- **React** (19.1.0)
- **TypeScript** (5.9.3)
- **Redux Toolkit** (2.11.2)
- **React Redux** (9.2.0)
- **Axios** (1.14.0)
- **Expo Router** (6.0.23)
- **AsyncStorage** (2.2.0)

### Ambiente de desenvolvimento
- **VS Code** (1.114.0)
- **Node.js** (v24.14.1)
- **npm / npx** (9.9.4)
- **create-expo-app** (3.5.3)

### Funcionalidades
- Listagem de artigos mais populares (Viewed, Shared, Emailed)
- Busca de artigos por palavra-chave
- Tela de detalhes do artigo
- Favoritar/desfavoritar artigos
- Persistência de favoritos entre sessões
- Skeleton loading
- Tratamento de erro (offline / API)

## Como configurar a API Key
Por questões de segurança, a API Key não está incluída no repositório.
Adicione o arquivo `.env` na raiz do projeto com a seguinte variável:

**Observação:**
O arquivo `.env` não está versionado no repositório por motivos de segurança.

## Como rodar o projeto
1. Instalar dependências
```bash
npm install
```

2. Iniciar o projeto
```bash
npx expo start
```
ou
```bash
npm start
```

3. Executar em dispositivos

📱 Android
```bash
npm run android
```

🍎 iOS
```bash
npm run ios
```

🌐 Web
```bash
npm run web
```

# Decisões técnicas
### Arquitetura
O projeto foi estruturado separando responsabilidades em camadas:
- **components** → UI reutilizável
- **hooks** → lógica de negócio
- **services** → comunicação com API
- **store (Redux)** → gerenciamento global de estado
- **utils / types / constants** → suporte e padronização

### Gerenciamento de estado (Redux Toolkit)
Utilizado para:
- Evitar **re-fetch desnecessário**
- Controlar estados de **loading / error / success**
- Centralizar dados da aplicação
💡 Importante: implementado controle para respeitar o limite da API (10 req/min)

### Navegação
Utilizado **Expo Router** para organização baseada em arquivos, facilitando escalabilidade.

### Persistência de dados
Favoritos são armazenados localmente utilizando:
- AsyncStorage

### Performance e UX
- Skeleton loading durante carregamento
- Debounce na busca
- Tratamento de estados vazios e erro

### Estrutura do projeto
```bash
src/
  components/
  hooks/
  services/
  store/
  types/
  utils/
  constants/
  styles/
  app/ (expo-router)
```

## Observações
- A API do NYT possui limite de requisições (10/min)
- Certifique-se de configurar corretamente a API Key
- Aplicação testada para estados offline e erros de API


