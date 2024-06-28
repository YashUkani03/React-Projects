import React from 'react'

function Button({
    children,
    type = "button",
    textColor = "text-white",
    bgColor = "bg-gray-600",
    className = "",
    ...props
}) {
    return (
        <button className={`px-4 py-2 rounded-lg ${className} ${textColor} ${bgColor}`} type={type} {...props}>
            {children}
        </button>
    )
}

export default Button
