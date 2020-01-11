import { useState } from "react";

export function useLanguage(defaultLanguage: string) {
    const lang = useState(defaultLanguage);

    // TODO https://blog.usejournal.com/internationalization-with-react-hooks-af37bed9f195
}