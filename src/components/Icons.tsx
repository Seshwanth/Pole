import { LucideProps, UserPlus, ClipboardCheck, ShieldCheck, Upload } from "lucide-react";

export const Icons = {
    Logo: (props: LucideProps) => (
        <svg viewBox="0 0 24 24" width="20%" {...props}><title/><g data-name="Layer 2" id="Layer_2"><path d="M15.3,2H8.7L2,6.46V10H4V8H8v2.79l-4,9V22H6V20.59l6-3.27,6,3.27V22h2V19.79l-4-9V8h4v2h2V6.46ZM14,4V6H10V4ZM6.3,6,8,4.87V6Zm8,6L15,13.42,12,15,9,13.42,9.65,12ZM7.11,17.71,8.2,15.25l1.71.93Zm8.68-2.46,1.09,2.46-2.8-1.53ZM14,10H10V8h4Zm2-5.13L17.7,6H16Z"/></g></svg>
    ),
    UserPlus,
    ClipboardCheck,
    ShieldCheck,
    Upload
}

export type Icon = keyof typeof Icons;