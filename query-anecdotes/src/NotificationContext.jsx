import {createContext, useState} from "react";

const NotificationContext = createContext(null)

export default NotificationContext

export const NotificationContextProvider = (props) => {
    const [notification, setNotification] = useState('defaultNotification')

    return (
        <NotificationContext.Provider value={{notification, setNotification}}>
            {props.children}
        </NotificationContext.Provider>
    )
}