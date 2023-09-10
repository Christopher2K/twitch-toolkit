#!/bin/bash
#
mkcert -install
mkcert twitchtoolkit.local
mkdir -p docker/certs
cp twitchtoolkit.local.pem twitchtoolkit.local-key.pem docker/certs 
rm -rf twitchtoolkit.local*
