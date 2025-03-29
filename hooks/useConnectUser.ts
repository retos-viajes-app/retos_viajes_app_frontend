import { sendConnectionRequest as apiSendConnectionRequest, cancelConnectionRequest as apiCancelConnectionRequest } from "@/services/user_connections_service";
export const useConnectUser = () => {

  const sendConnectionRequest = async (userId: number) => {

    const response = await apiSendConnectionRequest(userId);
    if(!response.success){
      throw new Error(response.error);
    }
    return response.data;
    
  };
  const cancelConnectionRequest = async (userId: number) => {

     const response = await apiCancelConnectionRequest(userId);
     if (!response.success) {
       throw new Error(response.error);
     }
     return response.data;
  }


  return {
    sendConnectionRequest,
    cancelConnectionRequest,
  };
};
