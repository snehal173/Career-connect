
let io;
const userSocketMap = new Map();
function setSocketInstance(ioInstance) {
  io = ioInstance;
}

function getSocketInstance() {
    if (!io) {
        console.warn("⚠️ Socket.io instance is not initialized yet!");
      }
  return io;
}

module.exports = { userSocketMap, setSocketInstance, getSocketInstance };

