FROM node:7
WORKDIR /app
RUN git clone https://github.com/direktspeed/mosaico . \
 && npm install -g grunt-cli \
 && npm install grunt@^1.2.0 \
 && npm install
CMD grunt
