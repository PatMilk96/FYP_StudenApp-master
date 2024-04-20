import React, {useState} from 'react';


const Context = React.createContext();

const ContextProvider = ({children}) => {
    const [user, setUser] = useState();
    return(
        <Context.Provider value={{
            val, setVal, val1, setVal1, val2, setVal2
        }}>
            {children}
        </Context.Provider>
    )
}

export {Context, ContextProvider}; //Practice can be named AppProvider or EcommerceProvider etc