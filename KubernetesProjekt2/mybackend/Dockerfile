# Zaciągnij obraz alpine z wbudowanym node
FROM node:alpine

# Ustaw katalog roboczy w /opt/myapp
WORKDIR /opt/myapp

# Skopiuj package.json do katalogu roboczego /opt/myapp
COPY ./package.json ./

# Uruchom instalację yarn (która zainstaluje również zdefiniowane paczki w package.json)
RUN yarn install

# Skopiuj zawartość tego katalogu do katalogu roboczego /opt/myapp
COPY ./ ./

# Uruchom polecenie
CMD yarn start