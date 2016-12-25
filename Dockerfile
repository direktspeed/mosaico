FROM node:7

ADD . /opt/mosaico
WORKDIR /opt/mosaico

RUN  npm install grunt-cli -g \
 && npm install \
  --unsafe-perm \
 && npm cache clear

EXPOSE 9006

CMD ["grunt", "test", "default"]
