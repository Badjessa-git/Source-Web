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
cp ./js/app.js $TARGETFOLDER/$WEBFOLDERNAME/js/
cp ./css/app.cs $TARGETFOLDER/$WEBFOLDERNAME/css/

#put our index.html into the resources of backend
cp index.html $TARGETFOLDER/$WEBFOLDERNAME
