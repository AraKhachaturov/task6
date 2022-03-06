let moment=require("moment");
let i=0;


const stream =require('stream');
const { Readable } = require('stream');
const {Transform} =require("stream");

const myReadableStream=new Readable({
    read(size){
        setTimeout(() => {
            this.push('now');
        }, 1000);
        
    }
});

const myTransform=new Transform({
transform(chunk,encoding,callback){
    let formatedDate=moment(chunk.toString()).format('yyyy-MM-DD');
    console.log(formatedDate);
}

});

let date=new Date();
console.log(moment(date).format('yyyy/MM/DD'));

myTransform.write(date.toISOString());


