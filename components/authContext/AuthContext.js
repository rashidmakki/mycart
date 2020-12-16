import * as React from 'react';

export const ThemeManagerContext=React.createContext({
  isDark:false,
  toggleTheme:()=>{}
});

export const ThemeManagerProvider=({children})=>{
   const[isDark,setDark]=React.useState(false);
   const toggleTheme=()=>setDark(!isDark);
   return(
   	<ThemeManagerContext.Provider value={{isDark,toggleTheme}}>
       {children}
   	</ThemeManagerContext.Provider>
   	);
};