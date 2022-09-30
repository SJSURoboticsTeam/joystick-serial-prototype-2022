# syntax=docker/dockerfile:1
FROM node:16-alpine AS development
ENV NODE_ENV development

WORKDIR /mission-control-ui

COPY ["package.json", "package-lock.json", "./"]
RUN npm install --legacy-peer-deps

COPY . .
EXPOSE 3000

CMD ["npm", "start"]