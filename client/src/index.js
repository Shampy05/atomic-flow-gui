import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {configureStore} from "@reduxjs/toolkit";
import globalReducer from "state";
import {Provider} from "react-redux";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

const store = configureStore({
    reducer: {
        global: globalReducer,
    }
})

/**
 * Renders the app component to the root element in the index.html file.
 * 
 * @returns {Object} JSX representation of the app component
 */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <Provider store={store}>
            <DndProvider backend={HTML5Backend}>
                <App/>
            </DndProvider>
        </Provider>
);
