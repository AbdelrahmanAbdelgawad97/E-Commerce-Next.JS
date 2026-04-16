import { toast } from "sonner";
import { RegisterResponse, User, userDataTypes } from "./register";
import { handleUserRegister } from "./register.action";

export async function sendUserData(userData:userDataTypes) {

    const response = await handleUserRegister(userData);
    
    if (response === true) {
        toast.success("User Created Successfully",{
            position: "top-center"
        });
    } else {
        toast.error(response,{
            position: "top-center"
        });
    }
}