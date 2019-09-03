const fs = require('fs');
const { createCanvas } = require('canvas');
const gm = require('gm').subClass({
    imageMagick:true
});

var fileNames = [];
for(let i=1;i<19;i++){
    fileNames.push(`../../${i<10?'0'+i:i}.jpeg`);
}

var gmEntity = gm();

for(let i=0;i<fileNames.length;i++){
    gmEntity.in(fileNames[i]).delay(10000);
}

gmEntity.write('demo.gif',function(error){
    if(error) throw error;
    console.log('done');
});
