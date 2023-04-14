import { stat } from "fs";
import React, { useContext, useReducer } from "react";

const defaultValue = {
    value : "Hello",
    clickButton : () => {alert()}
};

const StateContext = React.createContext();

const DispatchContext = React.createContext();

function reducer(state, action) {
    switch(action.type) {
        case 'clickHello' : {
            const v = state.value == 'Hello' ? 'Hello World' : 'Hello'
            console.log(state);
            return { value : v }
        }

        default : {
            throw new Error()
        }
    }
}

function Provider({children}) {
    const [state, dispatch] = React.useReducer(reducer, {value : "Hello"});

    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                {children}
            </DispatchContext.Provider>
        </StateContext.Provider>
    )
}

function useContextState() {
    const context = React.useContext(DispatchContext);
    return context;
}

function useContextDispatch() {
    const context = React.useContext(DispatchContext);
    return context;
}

export {
    Provider,
    useContextState,
    useContextDispatch
}