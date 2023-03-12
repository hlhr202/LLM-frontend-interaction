import { useNavigate } from "react-router-dom";

export const useHandleCommand = () => {
    const navigate = useNavigate();
    return (cmd: { command: string; path: string }) => {
        switch (cmd.command) {
            case "redirect":
                navigate(cmd.path);
            default:
            // do nothing
        }
    };
};
