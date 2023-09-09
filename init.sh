#!/bin/bash
#
mkcert -install
mkcert "twitchtoolkit.local" "*.twitchtoolkit.local"
mkdir -p docker/certs
cp twitchtoolkit.local+1.pem twitchtoolkit.local+1-key.pem docker/certs 
rm -rf twitchtoolkit.local+1*
