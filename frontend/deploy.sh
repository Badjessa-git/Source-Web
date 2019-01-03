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

#Compiling our handlebars and typescript
echo 'Compiling files'
node_modules/handlebars/bin/handlebars hb/PrintList.hb >> $TARGETFOLDER/$WEBFOLDERNAME/js/templates.js
node_modules/typescript/bin/tsc ./ts/printjob.ts --strict --outFile $TARGETFOLDER/$WEBFOLDERNAME/js/printjob.js
node_modules/typescript/bin/tsc ./ts/graphicreq.ts --strict --outFile $TARGETFOLDER/$WEBFOLDERNAME/js/graphicreq.js

#copy js & css files
echo 'Started copy'
cp node_modules/jquery/dist/jquery.min.js $TARGETFOLDER/$WEBFOLDERNAME
cp -r ./raw/ $TARGETFOLDER/$WEBFOLDERNAME/raw/
cp -r ./js/ $TARGETFOLDER/$WEBFOLDERNAME/js/
cp -r ./css/ $TARGETFOLDER/$WEBFOLDERNAME/css/

#Copying all the libraries
echo 'Copying libraries'
cp node_modules/jquery/dist/jquery.min.js $TARGETFOLDER/$WEBFOLDERNAME
cp node_modules/bootstrap/dist/js/bootstrap.min.js $TARGETFOLDER/$WEBFOLDERNAME
cp node_modules/bootstrap/dist/css/bootstrap.min.css $TARGETFOLDER/$WEBFOLDERNAME
cp -R node_modules/bootstrap/dist/fonts $TARGETFOLDER/$WEBFOLDERNAME
cp -R bower_components $TARGETFOLDER/$WEBFOLDERNAME
cp credentials.json $TARGETFOLDER
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

## Starting the backend deploy
echo 'Enter 1 if you want to deploy to heroku'
read input
if [ $input == 1 ];
then 
    echo 'Starting backend deployment'
    oldidr=$(pwd)
    cd ../backend/source-web
    echo 'Packing files'
    rm -f packageLog
    mvn package >> packageLog
    if [ $? == 0 ];
    then 
        echo 'No Errors, Starting heroku deploy'
        rm -f deployLog
        mvn heroku:deploy >> deployLog
        if [ $? != 0 ];
        then 
            echo 'There was an error deploying to heroku'
        fi
        echo 'Successful Deployment'
        cd $a
        exit 0
    fi
fi

echo 'No Deployment'