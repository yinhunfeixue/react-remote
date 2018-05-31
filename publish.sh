rm -rf lib && 
cd ./src && 
npm version patch && 
cd ../  && 
./node_modules/.bin/babel src --out-dir lib --source-maps --extensions .es6,.es,.jsx,.js --copy-files && 
cd lib  && 
rm -rf out  && 
rm -rf demo  && 
rm -rf ui  && 
npm publish  && 
cd ../