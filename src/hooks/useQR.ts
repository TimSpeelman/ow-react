import { useEffect, useState } from "react";
import { callbackService } from "../services";


export function useCallbackReference(callback: (callbackId: string) => any, options: Options) {

    const [value, setValue] = useState<string>("");

    useEffect(() => {
        const handle = callbackService.register(callback);

        handle.onNewReference(ref => setValue(ref.id));
        handle.refreshAtInterval(options.refreshIntervalMillis);

        return () => options.destroyOnUnmount ? handle.destroy() : handle.stopRefreshing();
    }, [callback]);

    return value;
}

interface Options {
    refreshIntervalMillis: number;
    destroyOnUnmount?: boolean;
}