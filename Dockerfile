FROM node:22-alpine

WORKDIR /app

COPY --chown=node:node package*.json ./
RUN npm ci

COPY --chown=node:node . .

RUN chown node:node /app

USER node

EXPOSE 3000

CMD ["npm", "run", "dev"]
