FROM node:12.19.0-alpine3.9 AS development

WORKDIR /usr/src/app

RUN file="$(ls)" && echo $file

COPY ./package.json package.json

RUN npm install glob rimraf

RUN npm install --only=development

COPY ./ .

RUN npm run build

FROM node:12.19.0-alpine3.9 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY ./package.json package.json

RUN npm install --only=production

COPY ./ .

RUN file1="$(ls -1 /usr/src/app/)" && echo $file1

COPY --from=development /usr/src/app/dist/ ./dist

CMD ["npm", "run", "start:prod"]
