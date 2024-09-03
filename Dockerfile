FROM node:lts

WORKDIR /app

COPY . .

RUN npm install --registry=https://registry.npmmirror.com
# RUN npm install 

EXPOSE 3000

CMD npm run build && npm start
