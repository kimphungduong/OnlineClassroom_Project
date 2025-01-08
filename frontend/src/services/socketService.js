import { io } from "socket.io-client";
import {store} from "~/store";
import { refreshToken, setTokens } from "~/store/slices/authSlice";

let socket;

const initializeSocket = () => {
  const { accessToken } = store.getState().auth;

  socket = io("http://localhost:3000", {
    auth: {
      token: accessToken,
    },
  });

  // Xử lý lỗi xác thực và làm mới token
  socket.on("connect_error", async (error) => {
    if (error.message === "Authentication error: Invalid token") {
      // Làm mới token
      const result = await store.dispatch(refreshToken());
      if (result.payload) {
        socket.auth.token = result.payload.accessToken; // Cập nhật token mới
        socket.connect(); // Kết nối lại
      } else {
        console.error("Failed to refresh token");
      }
    }
  });

  return socket;
};

export default initializeSocket;
