FROM node:7

ADD . /app
WORKDIR /app

RUN npm install grunt-cli -g \
 && npm install \
 && npm cache clear

EXPOSE 9006

CMD ["npm", "start"]
