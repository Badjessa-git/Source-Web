# deploy script for the front-edn modified from SPEAR'S Tutorial

#Resource folder where our files will be stored
TARGETFOLDER=../backend/source-web/src/main/resources

##WebFolder holding our frontendcode
WEBFOLDERNAME=frontend

#Remake the folder with our updated files everytime so we will delete it

rm -rf $TARGETFOLDER
mkdir $TARGETFOLDER
mkdir $TARGETFOLDER/$WEBFOLDERNAME


#put our index.html into the resources of backend
cp index.html $TARGETFOLDER/$WEBFOLDERNAME