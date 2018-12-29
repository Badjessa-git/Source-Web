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
cp graphicreq.html $TARGETFOLDER
cp printjob.html $TARGETFOLDER
cp print.html $TARGETFOLDER
node_modules/typescript/bin/tsc ./ts/printjob.ts --strict --outFile $TARGETFOLDER/js/printjob.js
node_modules/typescript/bin/tsc ./ts/graphicreq.ts --strict --outFile $TARGETFOLDER/js/graphicreq.js
cp node_modules/jquery/dist/jquery.min.js $TARGETFOLDER
cp -r ./raw/ $TARGETFOLDER/raw/
cp -r ./js/*.js $TARGETFOLDER/js/
cp -r ./css/ $TARGETFOLDER/css/
cp node_modules/bootstrap/dist/js/bootstrap.min.js $TARGETFOLDER
cp node_modules/bootstrap/dist/css/bootstrap.min.css $TARGETFOLDER
cp -R node_modules/bootstrap/dist/fonts $TARGETFOLDER
cp -R bower_components $TARGETFOLDER

#launch local_server
node_modules/.bin/http-server $TARGETFOLDER -c-1