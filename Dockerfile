FROM node:8-alpine AS build_base

WORKDIR /tmp/tadpole

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY public ./public/
COPY src ./src/

ARG REACT_APP_API_URL
ARG REACT_APP_ENV

RUN npm run build

FROM node:12-alpine

RUN apk add ca-certificates
RUN npm install -g serve

COPY --from=build_base /tmp/tadpole/build /app/tadpole

EXPOSE 3000

CMD ["serve", "-s", "/app/tadpole", "-l", "3000"]
