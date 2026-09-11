import { useEffect } from "react";
import useNotification from "../hooks/useNotification.js";

const Notification = () => {

    const { notification, setNotification } = useNotification()

    useEffect(() => {
        const timeOutID = setTimeout(() => setNotification(null), 5000)

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
