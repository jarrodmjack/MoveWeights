export const formatNumToHumanReadable = (value: number) => {
	
	let formatter = Intl.NumberFormat("en", { notation: "compact" })
	let formattedNum = formatter.format(value)
    return formattedNum
}