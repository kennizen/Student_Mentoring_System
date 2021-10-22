module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        fontFamily: {
            sans: ['"Open Sans"', "sans-serif"],
        },
        fontSize: {
            xs: ["0.556vw", "unset"],
            sm: ["0.875rem", "unset"],
            base: ["1rem", "unset"],
            lg: ["1.125rem", "unset"],
            xl: ["1.25rem", "unset"],
            "2xl": ["1.5rem", "unset"],
        },
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
                650: "650px",
                450: "450px",
                845: "845px",
            },
            maxHeight: {
                500: "500px",
                600: "600px",
                700: "700px",
                800: "800px",
                900: "900px",
            },
        },
    },
    variants: {
        extend: {
            display: ["group-hover"],
            opacity: ["disabled"],
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
