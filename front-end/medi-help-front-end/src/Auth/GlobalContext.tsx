import React, {createContext} from "react";

export const GlobalContext = createContext({
    globalUserId: '',
    setglobalUserId:(value: string) => {},
    globalThreadId: '',
    setglobalThreadId:(value: string) => {},
    globalThreadDate: '',
    setglobalThreadDate:(value: string) => {},
    globalBlogId: '',
    setglobalBlogId:(value: string) => {},
    globalBlogDate: '',
    setglobalBlogDate:(value: string) => {},
    globalSearchText: "",
    setglobalSearchText:(value: string) => {},
});