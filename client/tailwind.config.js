module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        // fontFamily: {
        //     sans: ['"Open Sans"', "sans-serif"],
        // },
        extend: {
            width: {
                "9/20": "45%",
                "3/20": "15%",
                "17/20": "85%",
            },
            height: {
                "9/20": "45%",
                "3/20": "15%",
                "17/20": "85%",
                "1/10": "10%",
                "9/10": "90%",
                800: "800px",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require("@tailwindcss/forms")],
};
