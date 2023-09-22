import React, { createContext, useState } from "react";

export const UserContext = createContext({
    isAuthorised: 'false',
    setisAuthorised:(value: string) => {},
    current_user_id: "",
    setcurrent_user_id:(value: string) => {},
    current_user_type: "",
    setcurrent_user_type:(value: string) => {},
});