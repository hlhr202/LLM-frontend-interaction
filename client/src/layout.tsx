import React from "react";
import { useHandleCommand } from "./handler";
import { ToastContainer, toast } from "react-toastify";

const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [input, setInput] = React.useState("");
    const handleCommand = useHandleCommand();
    const handleSend: React.FormEventHandler<{}> = async (e) => {
        e.preventDefault();
        const id = toast.loading("Loading");
        try {
            const res = await fetch("/api/query", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query: input }),
            });

            const data = await res.json();
            handleCommand(data);
        } finally {
            toast.done(id);
        }
    };
    return (
        <div className="h-full flex flex-col p-2">
            <div className="flex-1 flex justify-center items-center">
                {children}
            </div>
            <form onSubmit={handleSend} className="w-full flex mt-2">
                <input
                    className="bottom-0 border-solid border-[2px] justify-end flex-1"
                    value={input}
                    onChange={(evt) => setInput(evt.target.value)}
                />
                <button
                    type="submit"
                    onClick={handleSend}
                    className="border-solid border-[2px] ml-2 w-20"
                >
                    Send
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Layout;
