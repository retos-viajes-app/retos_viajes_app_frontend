import { useState } from "react";
import { sendConnectionRequest as apiSendConnectionRequest, cancelConnectionRequest as apiCancelConnectionRequest } from "@/services/user_connections_service";
export const useConnectUser = () => {

  const sendConnectionRequest = async (userId: number) => {

    try {
      const response = await apiSendConnectionRequest(userId);
      return response;
    } catch (err) {
      throw err;
    }
  };
  const cancelConnectionRequest = async (userId: number) => {
     try {
       const response = await apiCancelConnectionRequest(userId);
       return response;
     } catch (err) {
       throw err;
     } 
  }


  return {
    sendConnectionRequest,
    cancelConnectionRequest,
  };
};
