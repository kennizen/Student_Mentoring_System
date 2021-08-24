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
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require("@tailwindcss/forms")],
};
