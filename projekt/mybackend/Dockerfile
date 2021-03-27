# Pobieranie obrazu
FROM node:alpine

# Katalog roboczy dla mybackend
WORKDIR /opt/mybackend

# Kopiowanie package.json do /opt/mybackend
COPY ./package.json ./

# yarn instaluje paczki z pliku package.json
RUN yarn install

# Kopiowanie całego mybackend do /opt/mybackend (do WORKDIR)
COPY ./ ./

# Uruchom serwer node.js
CMD ["node", "index.js"]