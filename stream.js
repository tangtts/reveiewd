

const {Transform,Duplex} = require("stream")

const crypto = require("crypto")
const fs = require("fs")
const path = require("path")

class MyTransform extends Transform {
  _transform(chunk,encoding,clearBuffer){
    console.log(encoding)
    let r = crypto.createHash("md5").update(chunk).digest("base64")
    this.push(r)
    clearBuffer()
  }
}

const myTransform = new MyTransform

// process.stdin.pipe(myTransform).pipe(process.stdout)

class myDuplex extends Duplex {
  _write(content){
    console.log("_write",content.toString())
    this.push(content)
  }
  _read(content){
    console.log("_read",content)
  }
}
let my = new myDuplex
my.on("data",function(content){
  console.log("data",content.toString())
})
my.write("hello")



// function removeDir(filePath){
//   return new Promise((resolve,reject)=>{
//     fs.stat(filePath,(err,data)=>{
//       if(err) reject(err)
//       if(data.isDirectory()){
//         fs.readdir(filePath,(err,data)=>{
//           if(err)reject(err)
//           let dirs = data.map(item=>removeDir(path.join(filePath,item))) 
//           Promise.all(dirs).then(()=>fs.rmdir(filePath,resolve))
//         })
//       }else {
//         fs.unlink(filePath,resolve)
//       }
//     })
//   })
// }


function Race(arr){
  return new Promise((resolve,reject)=>{
    for(let i = 0;i<arr.length;i++){
      Promise.resolve(arr[i]).then(resolve,reject)
    }
  })
}

// 

Race([Promise.resolve(1),Promise.resolve(5)]).then(res=>{
  console.log(res)
})


// removeDir("a").then(res=>{
//   console.log("删除成功")
// })
