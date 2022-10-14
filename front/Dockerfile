FROM node:18-alpine as build-base
WORKDIR /srv/app
COPY package*.json ./
RUN npm install
COPY . .

FROM build-base as build
WORKDIR /srv/app
RUN npm run build


FROM build-base as dev
WORKDIR /srv/app
EXPOSE 3000
CMD ["npm", "run", "dev"]

FROM caddy:2.4.5-alpine as prod
WORKDIR /srv/app
COPY --from=build /srv/app/dist ./public
CMD ["caddy", "file-server", "--root", "public", "--listen", ":3000"]
