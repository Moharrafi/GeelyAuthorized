/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}", // In this project, components seem to be in root/components
        "./**/*.{js,ts,jsx,tsx}", // Catch-all for flat structures if needed
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
            },
            colors: {
                primary: '#0f172a', // Slate 900
                accent: '#38bdf8', // Sky 400
                luxury: '#e2e8f0', // Slate 200
            }
        }
    },
    plugins: [],
}
