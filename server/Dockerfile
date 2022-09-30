# syntax=docker/dockerfile:1
FROM node:16-alpine AS development
ENV NODE_ENV development

WORKDIR /mission-control-server

COPY ["package.json", "package-lock.json", "./"]
RUN npm install

COPY . .
EXPOSE 5000

CMD ["npm", "start"]