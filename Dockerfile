FROM php:8.2.0-fpm as php_stage

# Arguments defined in docker-compose.yml
ENV user=sammy
ENV uid=1000

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    zip \
    unzip \
    libonig-dev \
    libzip-dev

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Modify the php.ini file to set the upload_max_filesize and post_max_size values
RUN echo "upload_max_filesize = 100M" >> /usr/local/etc/php/php.ini
RUN echo "post_max_size = 100M" >> /usr/local/etc/php/php.ini

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring pcntl bcmath zip

# Create system user to run Composer and Artisan Commands
RUN useradd -G www-data,root -u $uid -d /home/$user $user
RUN mkdir -p /home/$user/.composer && \
    chown -R $user:$user /home/$user

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

COPY ./server .

# Adjust permissions
RUN chown -R $user:www-data storage bootstrap/cache
RUN chmod -R 775 storage bootstrap/cache

# Install dependencies
RUN composer install --no-interaction --optimize-autoloader

EXPOSE 8080

USER $user

CMD php artisan serve --host=0.0.0.0 --port=8080
