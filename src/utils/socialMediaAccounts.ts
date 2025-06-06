import type { IconType } from "react-icons"
import { ICONS } from "./common/icons"

interface socialMediaAccTypes {
    id: number,
    media: string,
    icon: IconType,
    link: string
}

export const socialMediaAcc: socialMediaAccTypes[] = [
    {
        id: 1,
        media: "Google",
        icon: ICONS.GOOGLE,
        link: "https://accounts.google.com/"
    },
    {
        id: 2,
        media: "Facebook",
        icon: ICONS.FACEBOOK,
        link: "https://www.facebook.com/login/"
    },
    {
        id: 3,
        media: "LinkedIn",
        icon: ICONS.LINKEDIN,
        link: "https://www.linkedin.com/login/"
    },
    {
        id: 4,
        media: "Twitter",
        icon: ICONS.TWITTER,
        link: "https://twitter.com/login"
    }
];
