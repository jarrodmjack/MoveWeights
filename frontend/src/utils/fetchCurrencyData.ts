export const fetchCurrencyData = async () => {
	const url =
		"https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=100&offset=0"
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
