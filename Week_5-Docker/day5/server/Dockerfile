FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --only==production

COPY . .

USER node

EXPOSE 5000

CMD [ "node", "index.js" ]
