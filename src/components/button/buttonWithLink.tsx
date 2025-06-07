import React from 'react'
import type { IconType } from 'react-icons'

interface ButtonWithLinkTypes {
    id: number,
    link: string,
    icon: IconType
}

const ButtonWithLink: React.FC<ButtonWithLinkTypes> = ({ id, link, icon: Icon }) => {
    return (
        <a
            key={id}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="d-flex justify-content-center align-items-center border border-black rounded-circle"
            style={{
                width: '40px',
                height: '40px',
                textDecoration: 'none',
                color: 'inherit'
            }}
        >
            <Icon size={20} />
        </a>
    )
}

export default ButtonWithLink