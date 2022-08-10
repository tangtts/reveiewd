

let json = [
  {id:0,name:'zs',parentId:null},
  {id:1,name:'zs1',parentId:0},
  {id:2,name:'zs2',parentId:1},
  {id:3,name:'zs3',parentId:2},
  {id:4,name:'zs4',parentId:2},
]

/**
 * map:{ id:item }
 * for i of json
 * i[parentId] in map
 * map[i[parentId]].children.push(i)
 * 
 * @param {Array} 
 */
function jsonToTree(arr){
  let map = {},result = []

  for (const i of arr) {
      map[i.id] = i
  }

  for (const i of arr) {
    if(i.parentId == null){
      result.push(i)
      continue
    }

    if(i.parentId in map){
      map[i.parentId].children ??= []
      map[i.parentId].children.push(i)
    }
  }
  return result
}

 jsonToTree(json)



 const tree = [
  {id:1,name:'zs',children:[
    {id:2,name:'zs2',children:[{
      id:3,name:'zs3',children:[]
    }]}
  ]}
 ]

/**
 * 
 * @param {Object} obj 
 */
function treeToJson(obj){
  let res = []
  function inner(o){
    if(o.children.length){
      res.push(o)
      o.children.forEach(i=>{
        inner(i)
      })
    }else {
       res.push(o)
       return
    }
  }
  inner(obj[0])
}
treeToJson(tree)



/**
 *
 * @param {Array} arr
 * @param {*} [pid=null]
 * @return {Array<{Object}>} 
 */
function arrayToJson2(arr,pid = null){
  return arr.reduce((prev,cur)=>{
    if(cur.parentId == pid){
    const children = arrayToJson2(arr,cur.id)
     if(children.length){
      cur.children = children
     }
     prev.push(cur)
    }
    return prev
  },[])
}

function json2ToArray(tree){
  return tree.reduce((prev,cur)=>{
    if(cur.children && cur.children.length){
      const subList = json2ToArray(cur.children)
      delete cur.children
      prev.push(cur,...subList)
    }else {
      prev.push(cur)
    }
    return prev
  },[])
}

console.dir(json2ToArray(arrayToJson2(json)))