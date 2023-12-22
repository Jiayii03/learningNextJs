import { ClassValue, clsx} from "clsx";
import { twMerge } from "tailwind-merge";

// for conditional classnames
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}