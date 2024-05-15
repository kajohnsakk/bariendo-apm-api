FROM node:lts-alpine as development

WORKDIR /usr/src/app

RUN npm install -g @nestjs/cli

COPY package*.json ./

RUN npm install

COPY . .

FROM development as dev

EXPOSE 3000

CMD ["npm", "run", "start:dev"]

FROM development as build

RUN npm run build

FROM node:lts-alpine as production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package*.json ./

COPY --from=build /usr/src/app/dist ./dist

RUN npm install --only=production

EXPOSE 3000

CMD ["npm", "run", "start:prod"]