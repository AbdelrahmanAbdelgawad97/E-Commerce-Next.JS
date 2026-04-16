import * as zod from "zod"

export const schema = zod.object({
    name: zod.string("").nonempty("Entry Your Name"),
    email: zod.string("").regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    password: zod.string("").regex(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,"Entry Valid Password"),
    rePassword: zod.string(""),
    phone: zod.string("").regex(/^01[0125][0-9]{8}$/,"should be an egyption number")
}).refine(function(data){
    return data.password === data.rePassword;
},{
    path: ["rePassword"],
    error: "Passwords dosn't match"
})