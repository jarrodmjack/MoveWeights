// import React from "react"
// import LoadingDots from "../loading/LoadingDots"

// type ButtonOwnProps = {
// 	disabled?: boolean
// 	text?: string
// 	icon?: JSX.Element
// 	variant: string
// 	handleClick?: any
// }

// const Button: React.FC<ButtonOwnProps> = ({
// 	text = "",
// 	disabled,
// 	icon,
// 	variant,
// 	handleClick,
// }) => {
// 	enum buttonVariant {
// 		primary = "bg-primary",
// 		primaryFocus = "bg-primary-focus",
// 		secondary = "bg-secondary",
// 	}
// 	const variantClass =
// 		(buttonVariant as { [key: string]: string })[variant] ||
// 		buttonVariant.primary
// 	return (
// 		<button
// 			// onClick={(e) => {
// 			// 	e.preventDefault()
// 			// 	handleClick && handleClick()
// 			// }}
// 			className={`btn text-white ${variantClass}`}
// 			disabled={disabled}
// 		>
// 			{disabled ? (
// 				<LoadingDots />
// 			) : (
// 				<span>
// 					{icon}
// 					{text}
// 				</span>
// 			)}
// 		</button>
// 	)
// }

// export default Button
