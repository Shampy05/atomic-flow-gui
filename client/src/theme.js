export const tokensDark = {
    gray: {
        0: "#FFFFFF",
        100: "#F7F7F7",
        200: "#E0E0E0",
        300: "#C2C2C2",
        400: "#A3A3A3",
        500: "#858585",
        600: "#666666",
        700: "#474747",
        800: "#2B2B2B",
        900: "#0F0F0F",
        1000: "#000000"
    },
    primary: {
        100: "#FFF0B2",
        200: "#FFE066",
        300: "#FFD633",
        400: "#FFCC00",
        500: "#E6B800",
        600: "#CCA300",
        700: "#B38F00",
        800: "#997A00",
        900: "#806600",
        1000: "#665200"
    },
    secondary: {
        100: "#F2E0FF",
        200: "#DAB6FF",
        300: "#C28CFF",
        400: "#AA61FF",
        500: "#9236FF",
        600: "#7A0BE6",
        700: "#6200CC",
        800: "#4A00B3",
        900: "#320099",
        1000: "#1A0080"
    }
}

function reverseTokens(tokensDark) {
    const reversedTokens = {}
    Object.entries(tokensDark).forEach(([key, value]) => {
    const keys = Object.keys(value)
    const values = Object.values(value)
    const length = keys.length
    const reversedValue = {}
    for (let i = 0; i < length; i++) {
        reversedValue[keys[i]] = values[length - 1 - i]
    }
    reversedTokens[key] = reversedValue
    })
    return reversedTokens
}

export const tokensLight = reverseTokens(tokensDark)

export const themeSettings = (mode) => {
    return {
        palette:
            // {
            // mode: mode,
            // ...(mode === "dark"
            // ? {
            //         primary: {
            //             ...tokensDark.primary,
            //             main: tokensDark.primary[500],
            //             light: tokensDark.primary[500],
            //         },
            //         secondary: {
            //             ...tokensDark.secondary,
            //             main: tokensDark.secondary[500],
            //         },
            //         neutral: {
            //             ...tokensDark.gray,
            //             main: tokensDark.gray[500],
            //         },
            //         background: {
            //             default: tokensDark.primary[800],
            //             paper: tokensDark.primary[500],
            //         },
            //     }
            // :
                {
                    primary: {
                        ...tokensLight.primary,
                        main: tokensDark.primary[100],
                        light: tokensDark.primary[200],
                    },
                    secondary: {
                        ...tokensLight.secondary,
                        main: tokensDark.secondary[600],
                        light: tokensDark.secondary[700],
                    },
                    neutral: {
                        ...tokensLight.gray,
                        main: tokensDark.gray[600],
                    },
                    background: {
                        default: tokensDark.gray[0],
                        alt: tokensDark.gray[100],
                    },
                },
        typography: {
            fontFamily: ["Inter", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 40
            },
            h2: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 32
            },
            h3: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 24
            },
            h4: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 20
            },
            h5: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 16
            },
            h6: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 14
            }
        }
    }
}