export const getCurrentTime = () => {
    const current = new Date();
    return current.toLocaleTimeString()
}