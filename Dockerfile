# Etapa 1: Build do TypeScript
FROM node:16 AS builder

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia os arquivos de dependências para o container
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código para o container
COPY . .

# Compila o código TypeScript para JavaScript
RUN npm run build

# Etapa 2: Execução da Aplicação
FROM node:16

# Define o diretório de trabalho para a execução
WORKDIR /usr/src/app

# Copia apenas os arquivos necessários da etapa de build
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist

# Instala somente as dependências de produção
RUN npm install --only=production

# Expõe a porta do servidor
EXPOSE 8000

# Comando para iniciar o servidor
CMD ["node", "dist/server.js"]
