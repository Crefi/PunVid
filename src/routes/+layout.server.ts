import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
    return {
        // This ensures the theme class is always present in SSR
        themeClass: 'default'
    };
};