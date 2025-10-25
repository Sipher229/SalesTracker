import { useEffect } from "react";
import { apiObject } from "../API-calling-functions/Api";

function useLogVisit(url) {
    useEffect(() => {
        const logVisit = async () => {
            try {
                await apiObject.LogVisit(url);
            } catch (error) {
                console.error("Error logging visit:", error);
            }
        };

        logVisit();
    }, [url]);
}

export default useLogVisit;