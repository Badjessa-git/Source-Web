# local deploy script for the web front-end

# This file is responsible for preprocessing all TypeScript files, making
# sure all dependencies are up-to-date, copying all necessary files into a
# local deploy directory, and starting a web server

#Same as deploy.sh we need to define a target folder
TARGETFOLDER=./local

#update npm
npm update

rm -rf $TARGETFOLDER
mkdir $TARGETFOLDER

#Files to be copied into our target folder
cp index.html $TARGETFOLDER
cp node_modules/jquery/dist/jquery.min.js $TARGETFOLDER
cp ./css/app.css $TARGETFOLDER/css/
cp ./js/script.js $TARGETFOLDER/js/

#launch local_server
node_modules/.bin/http-server $TARGETFOLDER -c-1