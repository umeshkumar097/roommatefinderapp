import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";
import { NextApiResponse } from "next";

export type NextApiResponseServerIo = NextApiResponse & {
    socket: any & {
        server: NetServer & {
            io: ServerIO;
        };
    };
};

export const config = {
    api: {
        bodyParser: false,
    },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
    if (!res.socket.server.io) {
        const path = "/api/socket/io";
        const httpServer: NetServer = res.socket.server as any;
        const io = new ServerIO(httpServer, {
            path: path,
            addTrailingSlash: false,
        });
        res.socket.server.io = io;

        io.on("connection", (socket) => {
            console.log("Socket connected:", socket.id);

            socket.on("join-room", (room) => {
                socket.join(room);
                console.log(`User joined room: ${room}`);
            });

            socket.on("send-message", (message) => {
                io.to(message.receiverId).emit("new-message", message);
                // Also emit to sender (or handle optimistically on client)
            });
        });
    }
    res.end();
};

export default ioHandler;
