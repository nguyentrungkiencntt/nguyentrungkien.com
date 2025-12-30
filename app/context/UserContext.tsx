"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { message, Spin } from "antd"
import type { MessageInstance } from "antd/es/message/interface";

interface UserContextType {
    valueSearch: string;
    isCreate: boolean;
    isAcctive: string;
    setValueSearch: (value: string) => void;
    setIsCreate: (value: boolean) => void;
    setIsAcctive: (value: string) => void;
    messageApi: MessageInstance;
}
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [valueSearch, setValueSearch] = useState<string>("");
    const [isCreate, setIsCreate] = useState<boolean>(false);
    const [isAcctive, setIsAcctive] = useState<string>("Đang xử lý ...");
    const [messageApi, contextHolder] = message.useMessage();


    return (
        <UserContext.Provider value={{ valueSearch, setValueSearch, messageApi, setIsAcctive, setIsCreate, isAcctive, isCreate }}>
            {contextHolder}
            {isCreate && <div className="min-h-screen flex flex-col font-semibold text-[10px] text-white gap-4 items-center justify-center w-full fixed top-0 right-0 bottom-0 left-0 bg-[#2523233f] z-50 ">
                <Spin size="large" />
                {isAcctive}
            </div>}
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within UserProvider");
    }
    return context;
};
