#!/usr/bin/env bash
# ==============================================================================
# OpenInfra Atlas — Automated AWS EC2 Ubuntu Deployment Script
# ==============================================================================
set -e

echo "=== [1/5] Updating system packages & installing prerequisites ==="
sudo apt-get update -y
sudo apt-get install -y curl nginx git

# Install Node.js LTS if missing
if ! command -v node &> /dev/null; then
    echo "=== Installing Node.js LTS via NodeSource ==="
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

echo "=== [2/5] Installing application dependencies ==="
npm ci || npm install

echo "=== [3/5] Compiling production build with Vite ==="
npm run build

echo "=== [4/5] Deploying build artifacts to webroot ==="
sudo mkdir -p /var/www/openinfra-atlas
sudo rm -rf /var/www/openinfra-atlas/*
sudo cp -r dist/* /var/www/openinfra-atlas/
sudo chown -R www-data:www-data /var/www/openinfra-atlas

echo "=== [5/5] Configuring Nginx web server ==="
if [ -f deployment/nginx.conf ]; then
    sudo cp deployment/nginx.conf /etc/nginx/sites-available/openinfra-atlas
    sudo ln -sf /etc/nginx/sites-available/openinfra-atlas /etc/nginx/sites-enabled/
    sudo rm -f /etc/nginx/sites-enabled/default
    sudo nginx -t
    sudo systemctl restart nginx
fi

echo "=== Deployment Complete! ==="
echo "OpenInfra Atlas is running and accessible on port 80."
