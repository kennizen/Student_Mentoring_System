module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        // fontFamily: {
        //     sans: ['"Open Sans"', "sans-serif"],
        // },
        fontSize: {
            xs: ["12px", "unset"],
            sm: ["14px", "unset"],
            base: ["16px", "unset"],
            lg: ["18px", "unset"],
            xl: ["20px", "unset"],
            "2xl": ["24px", "unset"],
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
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require("@tailwindcss/forms")],
};
