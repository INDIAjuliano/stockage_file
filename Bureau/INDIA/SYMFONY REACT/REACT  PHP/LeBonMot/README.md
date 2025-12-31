sudo -u postgres psql


CREATE DATABASE le_bon_mot;
CREATE USER lbm_user WITH PASSWORD 'strong_password';
GRANT ALL PRIVILEGES ON DATABASE le_bon_mot TO lbm_user;


## test Vérifier accès PHP ↔ PostgreSQL

- php -r "new PDO('pgsql:host=127.0.0.1;dbname=le_bon_mot','lbm_user','strong_password'); echo 'OK';"

#### Composer (gestion dépendances PHP)

- Autoload PSR-4
- PHPMailer
- Dotenv
- Futures libs sécurité

#### Vérifier
```
composer -V
```
#### Installer
```
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
```

#### SMTP / Email (OBLIGATOIRE pour vérification email)

Exemple Gmail (dev)
```
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=xxx@gmail.com
MAIL_PASS=app_password
```

