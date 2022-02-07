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
        flex: {
            2: "2 2 0%",
            3: "3 3 0%",
            4: "4 4 0%",
        },
        extend: {
            width: {
                "9/20": "45%",
                "3/20": "15%",
                "17/20": "85%",
                800: "800px",
                650: "650px",
                450: "450px",
                845: "845px",
            },
            height: {
                "9/20": "45%",
                "3/20": "15%",
                "17/20": "85%",
                "1/10": "10%",
                "9/10": "90%",
                cal: "calc(100% - 100px)",
                800: "800px",
                650: "650px",
                450: "450px",
                845: "845px",
                "200v": "200vh",
            },
            maxHeight: {
                500: "500px",
                600: "600px",
                700: "700px",
                800: "800px",
                900: "900px",
            },
            boxShadow: {
                m32: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
            },
            gridTemplateColumns: {
                // custom grid column for showing mentee info on mentor
                custom: "80px 200px 1fr 1fr 1fr 300px 1fr 1fr 1fr",
                chatTab: "max-content 1fr max-content",
            },
            outline: {
                zero: "0px solid #0000ff",
            },
        },
    },
    variants: {
        extend: {
            display: ["group-hover"],
            opacity: ["disabled"],
            backgroundColor: ["active"],
            textColor: ["active"],
        },
    },
    plugins: [require("@tailwindcss/forms"), require("tw-elements/dist/plugin")],
};
