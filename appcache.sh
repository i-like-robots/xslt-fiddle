#!/bin/sh

APPCACHE='public/fiddle.appcache'

# Manifest
echo 'CACHE MANIFEST' > $APPCACHE
date +'# %Y-%m-%d %H:%M:%S' >> $APPCACHE
echo >> $APPCACHE

# Cache
echo 'CACHE:' >> $APPCACHE

cat <<EOF >> $APPCACHE
/
/favicon.ico
/bundle.css
/bundle.js
EOF

# echo >> $APPCACHE
