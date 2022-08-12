import { useCallback, useState } from 'react';

export const useToggle = (initialState = false) => {
    const [state, setState] = useState(initialState);
    return [state, setState(!state)]
}