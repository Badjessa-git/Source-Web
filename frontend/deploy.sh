# deploy script for the front-edn modified from SPEAR'S Tutorial

#Resource folder where our files will be stored
TARGETFOLDER=../backend/source-web/src/main/resources

##WebFolder holding our frontendcode
WEBFOLDERNAME=frontend

#Remake the folder with our updated files everytime so we will delete it
rm -rf $TARGETFOLDER
mkdir $TARGETFOLDER
mkdir $TARGETFOLDER/$WEBFOLDERNAME

#update our dependencies
npm update

#copy js & css files
cp node_modules/jquery/dist/jquery.min.js $TARGETFOLDER/$WEBFOLDERNAME
cp -r ./js/ $TARGETFOLDER/$WEBFOLDERNAME/js/
cp -r ./css/ $TARGETFOLDER/$WEBFOLDERNAME/css/
cp node_modules/jquery/dist/jquery.min.js $TARGETFOLDER/$WEBFOLDERNAME
cp node_modules/bootstrap/dist/js/bootstrap.min.js $TARGETFOLDER/$WEBFOLDERNAME
cp node_modules/bootstrap/dist/css/bootstrap.min.css $TARGETFOLDER/$WEBFOLDERNAME
cp -R node_modules/bootstrap/dist/fonts $TARGETFOLDER/$WEBFOLDERNAME

#put our index.html into the resources of backend
cp index.html $TARGETFOLDER/$WEBFOLDERNAME
