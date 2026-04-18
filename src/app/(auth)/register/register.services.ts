import { toast } from "sonner";
import { RegisterResponse, User, userDataTypes } from "./register";
import { handleUserRegister } from "./register.action";
import { redirect } from "next/navigation";

export async function sendUserData(userData:userDataTypes) {

    const response = await handleUserRegister(userData);
    
    if (response === true) {
        toast.success("User Created Successfully You Can Login Now",{
            position: "top-center"
        });
        redirect("/login");
    } else {
        toast.error(response,{
            position: "top-center"
        });
    }
}