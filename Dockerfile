FROM node:12.19.0-alpine3.9 AS development

WORKDIR /usr/src/app

COPY ./package.json package.json

RUN npm install glob rimraf

RUN npm install --only=development

COPY devops .

CMD ["npm", "run", "start:prod"]

FROM node:12.19.0-alpine3.9 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY ./package.json package.json

RUN npm install --only=production

COPY devops .

COPY --from=development /usr/src/app/dist/src ./dist

CMD ["npm", "run", "start:prod"]
