import { toast } from "sonner";
import { sendUserDataLogin } from "./login.action";

export default async function sendUserLogin(data) {

    const message = await sendUserDataLogin(data);
    
    return message

    
}