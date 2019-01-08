# deploy script for the front-edn modified from SPEAR'S Tutorial

#Resource folder where our files will be stored
TARGETFOLDER=../backend/source-web/src/main/resources

##WebFolder holding our frontendcode
WEBFOLDERNAME=frontend

#Remake the folder with our updated files everytime so we will delete it
echo 'Deleting and remaking our resource folder'
rm -rf $TARGETFOLDER
mkdir $TARGETFOLDER
mkdir $TARGETFOLDER/$WEBFOLDERNAME

#update our dependencies
npm update

#copy js & css files
echo 'Started copy'
cp node_modules/jquery/dist/jquery.min.js $TARGETFOLDER/$WEBFOLDERNAME
cp -r ./raw/ $TARGETFOLDER/$WEBFOLDERNAME/raw/
cp -r ./js/ $TARGETFOLDER/$WEBFOLDERNAME/js/
cp -r ./css/ $TARGETFOLDER/$WEBFOLDERNAME/css/

#Compiling our handlebars and typescript
echo 'Compiling files'
node_modules/handlebars/bin/handlebars ./hb/PrintList.hb >> $TARGETFOLDER/$WEBFOLDERNAME/js/templates.js
node_modules/handlebars/bin/handlebars ./hb/EntryItem.hb >> $TARGETFOLDER/$WEBFOLDERNAME/js/templates.js
node_modules/handlebars/bin/handlebars hb/GraphicList.hb >> $TARGETFOLDER/$WEBFOLDERNAME/js/templates.js
node_modules/handlebars/bin/handlebars hb/GraphicItem.hb >> $TARGETFOLDER/$WEBFOLDERNAME/js/templates.js
node_modules/handlebars/bin/handlebars hb/RequestList.hb >> $TARGETFOLDER/$WEBFOLDERNAME/js/templates.js
node_modules/typescript/bin/tsc ./ts/PrintList.ts --strict --outFile $TARGETFOLDER/$WEBFOLDERNAME/js/PrintList.js

#Copying all the libraries
echo 'Copying libraries'
cp node_modules/jquery/dist/jquery.min.js $TARGETFOLDER/$WEBFOLDERNAME
cp node_modules/bootstrap/dist/js/bootstrap.min.js $TARGETFOLDER/$WEBFOLDERNAME
cp node_modules/bootstrap/dist/css/bootstrap.min.css $TARGETFOLDER/$WEBFOLDERNAME
cp -R node_modules/bootstrap/dist/fonts $TARGETFOLDER/$WEBFOLDERNAME
cp -R bower_components $TARGETFOLDER/$WEBFOLDERNAME
cp source-web-226303-d47f6cf48e20.json $TARGETFOLDER
cp node_modules/handlebars/dist/handlebars.min.js $TARGETFOLDER/$WEBFOLDERNAME


#put our index.html into the resources of backend
echo 'Adding the html files'
cp index.html $TARGETFOLDER/$WEBFOLDERNAME
cp printjob.html $TARGETFOLDER/$WEBFOLDERNAME
cp graphicreq.html $TARGETFOLDER/$WEBFOLDERNAME
cp print.html $TARGETFOLDER/$WEBFOLDERNAME

if [ $? != 0 ];
then 
    echo 'Encountered some problem'
    exit 99
fi

echo 'Success'
 
echo 'Starting backend deployment'
oldidr=$(pwd)
cd ../backend/source-web
echo 'Packing files'
rm -f packageLog
mvn package 2> packageLog
if [ $? == 0 ];
then 
echo 'No Errors, Starting heroku deploy'
rm -f deployLog
mvn heroku:deploy 2> deployLog
    if [ $? != 0 ];
    then 
        echo 'There was an error deploying to heroku'
    fi
    echo 'Successful Deployment'
    cd $a
    exit 0
fi

echo 'No Deployment'