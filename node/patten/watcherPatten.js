
// 被观察者
class Watcher {
  constructor(){
    this.value = 0
    this.observer = []
  }
  notifyObserverAll(){
    this.observer.forEach(o=>{
      o.update(this.State)
    })
  }
  setState(value){
    this.value = value
    // 自己状态发生了变化，通知观察者，调动 观察者的update 方法
    this.notifyObserverAll()
  }
  get State(){
    return this.value
  }
  attach(o){
    this.observer.push(o)
  }
}
// 观察者
class Observer {
  constructor(name){
    this.name = name
    // this.w = w
    // w.attach(this)
  }
  update(data){
    console.log(this.name,data)
  }
}
let w = new Watcher
// let o = new Observer('o2',w)
let o = new Observer('o2',w)
w.attach(o) // 可以直接使用 attach 方法
w.setState(10)