# /var/www/token-tap/token-tap-app/start.sh
#!/bin/bash
set -e

pnpm install --frozen-lockfile
NEXT_DISABLE_PWA=1 pnpm run build

exec node_modules/.bin/next start -p 3020
