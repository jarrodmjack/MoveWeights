export const fetchGlobalCurrencyData = async () => {
	const url =
		"https://coinranking1.p.rapidapi.com/stats?referenceCurrencyUuid=yhjMzLPhuIDl"
	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": process.env.NEXT_PUBLIC_COINRANKING_API_KEY!,
			"X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
		},
	}

	try {
		const response = await fetch(url, options)
		const result = await response.json()
		return result.data
	} catch (error) {
		console.error(error)
	}
}
fetchGlobalCurrencyData()
