#!/usr/bin/env bash
# exit on error
set -o errexit

bundle install
# clean
rm -rf public
# build
npm install --prefix client && npm run build --prefix client
# migrate
bundle exec rake db:migrate
#seed
bundle exec rake db:seed
# postbuild
cp -a client/build/. public/