import { useNotification, useNotificationActions } from "../stores/useNotificationStore.js";
import { useEffect } from "react";


const baseStyle = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
}

const errorStyle = {
    ...baseStyle,
    color: "red",
}

const successStyle = {
    ...baseStyle,
    color: "green",
}


const Notification = () => {
    const notification = useNotification()
    const { resetNotification } = useNotificationActions()

    useEffect(() => {
        const timeOutID = setTimeout( () => {
            if (notification) resetNotification()
        }, 5000)
        return () => {
            clearTimeout(timeOutID)
        }
    }, [notification, resetNotification]);
    

    const style = notification?.type === 'error' ? errorStyle : successStyle
    
    return (
        <div style={style} data-testid="notification">
            { notification?.message }
        </div>
    )
}

export default Notification
