# Get Root
sudo su -
# Install dev tools
yum groupinstall -y 'Development Tools'
# Install NodeJS + ImageMagick + php5.4 + httpd
curl --silent --location https://rpm.nodesource.com/setup_7.x | bash -
yum install -y nodejs ImageMagick ImageMagick-devel php-devel php-pear httpd php
# php5.4 imagemagick integration
echo | pecl install imagick
echo "extension=imagick.so" > /etc/php.d/imagick.ini

# Install mosaico NodeJS Part
mkdir -p /srv
cd /srv
git clone https://github.com/direktspeed/mosaico
cd mosaico
npm install grunt@^1.0.0
npm install -g grunt-cli
npm install
rm -rf /var/www/html
grunt build && ln -s $PWD /var/www/html
# cd /var/www/html
curl -L https://raw.githubusercontent.com/direktspeed/mosaico-php-backend/master/backend-php/config.php > config.php
curl -L https://raw.githubusercontent.com/direktspeed/mosaico-php-backend/master/backend-php/index.php > index.php
curl -L https://raw.githubusercontent.com/direktspeed/mosaico-php-backend/master/backend-php/premailer.php > premailer.php
curl -L https://raw.githubusercontent.com/direktspeed/mosaico-php-backend/master/backend-php/.htaccess > .htaccess
mkdir -p uploads/thumbnails
chown apache:apache /srv/mosaico
chown -R apache:apache /srv/mosaico
chown apache:apache /var/www
#allow overide check if enabled should be     AllowOverride All
sed -i 's/AllowOverride None/AllowOverride All/g' /etc/httpd/conf/httpd.conf
sed -i 's/AllowOverride none/AllowOverride All/g' /etc/httpd/conf/httpd.conf
sed -i 's/enforcing/Permissive/g' /etc/sysconfig/selinux
setenforce Permissive
firewall-cmd --permanent --zone=public --add-port=80/tcp
firewall-cmd --permanent --zone=public --add-port=443/tcp
firewall-cmd --reload
systemctl enable httpd && systemctl start httpd
echo "ALL DONE"
