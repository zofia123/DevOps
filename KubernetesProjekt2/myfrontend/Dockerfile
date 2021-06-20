# Zaciągnij obraz alpine z wbudowanym node i używaj później pod nazwą: mybuild
FROM node:alpine as mybuild

# Ustaw katalog roboczy w /opt/myapp
WORKDIR /opt/myapp

# Skopiuj package.json do katalogu roboczego /opt/myapp
COPY ./package.json ./

# Uruchom instalację yarn (która zainstaluje również zdefiniowane paczki w package.json)
RUN yarn install

# Skopiuj zawartość tego katalogu do katalogu roboczego /opt/myapp
COPY ./ ./

# Uruchom polecenie generujące wersję produkcyjną frontendu
CMD yarn build



FROM nginx

COPY --from=mybuild /opt/myapp/build /usr/share/nginx/html
