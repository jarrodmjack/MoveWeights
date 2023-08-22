/** @type {import('next').NextConfig} */
// import httpProxy from "http-proxy"

module.exports = {
	reactStrictMode: false,
	images: {
		domains: ["cdn.coinranking.com"],
	},
	rewrites() {
		return [
			{
				source: "/api/",
				destination: "http://localhost:4001/api/",
			},
		]
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
}
