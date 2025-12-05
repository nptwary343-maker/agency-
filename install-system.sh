#!/bin/bash

# Exit on error
set -e

echo "Starting WordPress Setup..."

# Wait for WordPress to be ready (DB connection)
# wp-cli will fail if DB is not ready, so we retry
max_retries=30
count=0
while ! wp db check; do
    echo "Waiting for database connection..."
    sleep 5
    count=$((count+1))
    if [ $count -ge $max_retries ]; then
        echo "Timeout waiting for database."
        exit 1
    fi
done

echo "Database connected."

# Install WordPress if not installed
if ! wp core is-installed; then
    echo "Installing WordPress Core..."
    wp core install \
        --url="${WP_URL}" \
        --title="${WP_TITLE:-Asthar Hat Headless}" \
        --admin_user="${WP_ADMIN_USER}" \
        --admin_password="${WP_ADMIN_PASSWORD}" \
        --admin_email="${WP_ADMIN_EMAIL}" \
        --skip-email
else
    echo "WordPress is already installed."
fi

# Install and Activate Plugins
echo "Installing and Activating Plugins..."
PLUGINS=(
    "wp-graphql"
    "advanced-custom-fields"
    "wordpress-seo"
    "elementor"
    "woocommerce"
    "wordfence"
    "wp-fastest-cache"
)

for plugin in "${PLUGINS[@]}"; do
    if ! wp plugin is-installed "$plugin"; then
        wp plugin install "$plugin" --activate
    else
        if ! wp plugin is-active "$plugin"; then
            wp plugin activate "$plugin"
        fi
    fi
done

# Configure Permalinks for Headless
echo "Configuring Permalinks..."
wp rewrite structure '/post-name/'
wp rewrite flush

# CORS Setup (Inject into active theme's functions.php)
# Note: In a real production setup, this should be a custom plugin (mu-plugin), 
# but for this request, I will append to functions.php as requested.
ACTIVE_THEME=$(wp theme list --status=active --field=name)
THEME_FUNCTIONS_PATH="/var/www/html/wp-content/themes/$ACTIVE_THEME/functions.php"

if [ -f "$THEME_FUNCTIONS_PATH" ]; then
    if ! grep -q "Headless CORS Support" "$THEME_FUNCTIONS_PATH"; then
        echo "Injecting CORS headers into $ACTIVE_THEME functions.php..."
        cat <<EOT >> "$THEME_FUNCTIONS_PATH"

// Headless CORS Support
add_action('init', function() {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
});
EOT
    else
        echo "CORS headers already present."
    fi
else
    echo "Warning: Active theme functions.php not found at $THEME_FUNCTIONS_PATH"
fi

echo "WordPress Setup Complete!"
