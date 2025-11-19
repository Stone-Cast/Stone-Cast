import { FaPlus } from "react-icons/fa6";

export default function Underline() {
    return (
        <div className="flex items-center w-[110%]">
            <Line />
            <FaPlus className="mx-auto animate-[spin_1.5s_linear_infinite] text-[var(--custom-cyan)]" />
            <Line />
        </div>
    );
}
function Line() {
    return (
        <div className="h-[4px] grow bg-[var(--custom-cyan)] rounded-xl"></div>
    );
}
