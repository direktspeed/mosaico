FROM node:7
WORKDIR /app
RUN git clone https://github.com/direktspeed/mosaico /app \
 && npm install -g grunt-cli
WORKDIR /app
npm install grunt@^1.0.0
npm install
CMD grunt
