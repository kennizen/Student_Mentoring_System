const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
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
            colors: {
                rose: colors.rose,
                fuchsia: colors.fuchsia,
                emerald: colors.emerald,
                teal: colors.teal,
                cyan: colors.cyan,
                sky: colors.sky,
                orange: colors.orange,
                trueGray: colors.trueGray,
                warmGray: colors.warmGray,
                blueGray: colors.blueGray,
                coolGray: colors.coolGray,
            },
            zIndex: {
                "-10": "-10",
            },
            fontFamily: {
                sans: ["natoSans", ...defaultTheme.fontFamily.sans],
            },
            inset: {
                12.8: "12.8rem",
                13.5: "13.5rem",
            },
            width: {
                "9/20": "45%",
                "3/20": "15%",
                "17/20": "85%",
                "9/10": "90%",
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
            maxWidth: {
                500: "500px",
                600: "600px",
                700: "700px",
                800: "800px",
                900: "900px",
                "3/5": "60%",
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
            transform: ["hover", "focus", "group-hover"],
            translate: ["active", "group-hover"],
            display: ["group-hover"],
            opacity: ["disabled"],
            backgroundColor: ["active", "group-hover", "hover"],
            textColor: ["active", "hover", "group-hover"],
            fontSize: ["hover", "focus"],
            transitionTimingFunction: ["hover", "focus", "group-hover"],
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
