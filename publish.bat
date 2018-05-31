if(Test-Path lib){
  del lib -Recurse -Force -Confirm:$false;
}
cd ./src;
npm version patch;
cd ../;
./node_modules/.bin/babel src --out-dir lib --source-maps --extensions .es6,.es,.jsx,.js --copy-files;
cd lib;
if(Test-Path out){
  rm out -Recurse -Force -Confirm:$false;
}
if(Test-Path demo){
  rm demo -Recurse -Force -Confirm:$false;
}
if(Test-Path ui){
  rm ui -Recurse -Force -Confirm:$false;
}
npm publish;
cd ../;