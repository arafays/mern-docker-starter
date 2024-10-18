import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		host: true,
		// if dev, proxy to server on port 3000
		proxy: {
			"/api": "http://localhost:3000",
		},
	},
})
