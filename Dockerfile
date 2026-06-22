FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN addgroup -g 1000 -S nonroot &&     adduser -u 1000 -S nonroot -G nonroot &&     chown -R nonroot:nonroot /app
USER nonroot:nonroot

EXPOSE 3000

CMD ["npm", "run", "dev"]
