import { useState, useEffect, useContext, createContext } from 'react'

const ThemeContext = createContext();
const ThemeContextFun = createContext();

export function useTheme(){
    return useContext(ThemeContext);
}

export function useThemeFun(){
    return useContext(ThemeContextFun);
}

function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'theme1');
    const [themeFun, ] = useState(() => toogleTheme)

    function toogleTheme(toogledTheme) {
        setTheme(toogledTheme)
    }

    useEffect(() => {
        theme === 'theme2'? document.body.className='theme2-clr': 
        theme === 'theme3' ? document.body.className = 'theme3-clr': document.body.className = '';
        localStorage.setItem('theme', theme);
    }, [theme])
    return (
        <ThemeContext.Provider value={theme}>
            <ThemeContextFun.Provider value={themeFun}>
                {children}
            </ThemeContextFun.Provider>
        </ThemeContext.Provider>
    )
}

export default ThemeProvider