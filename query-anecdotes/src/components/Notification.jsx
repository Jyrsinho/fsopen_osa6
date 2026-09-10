import { useContext, useEffect } from "react";
import NotificationContext from "../NotificationContext.jsx";

const Notification = () => {

    const { notification, setNotification } = useContext(NotificationContext)

    useEffect(() => {
        const clearNotification = () => {
            setNotification(null)
        }

        const timeOutID = setTimeout(clearNotification, 5000)

        return () => {
            clearTimeout(timeOutID)
        }

    }, [notification, setNotification]);

    const style = {
        border: "solid",
        padding: 10,
        borderWidth: 1,
        marginBottom: 5,
    }

    if (!notification) return null

    return(
        <div data-testid="notification" style={style}>
            {notification}
        </div>
    )
}

export default Notification
