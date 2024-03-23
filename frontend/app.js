const socket=io()
function test() {
  socket.emit("message","uigdiuew")
socket.on("show",(mess)=>{
  alert(mess)
})
}
export default test
