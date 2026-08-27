import { create } from 'zustand'

const useNotificationStore = create( (set) => ({
    notification: null,
    actions: {
        setNotification: (newNotification) => {
            set( ()=> ({ notification: newNotification }))
        },
        resetNotification: () => {
            set( ()=> ({ notification: null }))
        },
    }
}))

export const useNotification = () => useNotificationStore((state) => state.notification)
export const useNotificationActions = () => useNotificationStore((state) => state.actions)