import * as zod from "zod"

export const schema = zod.object({
    email: zod.string("").regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    password: zod.string("").regex(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,"Entry Valid Password"),
})