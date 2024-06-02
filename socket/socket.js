import { Server } from "socket.io";

let onlineUsers = {};

const socketServer = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
        },
    });
    io.on("connection", (socket) => {
        console.log("User connected", socket.id);
        const userId = socket.handshake.query.userId;
        console.log("userId", userId);
        if(userId){
            onlineUsers[userId] = socket.id;
        };
        console.log(onlineUsers);
        io.emit("onlineUsers", onlineUsers);
        socket.on("disconnect", () => {
            console.log("User disconnected", socket.id);
            delete onlineUsers[userId];
            io.emit("onlineUsers", onlineUsers);
        });
    });

    return io;
}

export {socketServer , onlineUsers};
