import { useMemo, useState } from 'react';
import type { Product } from './products';

export const useShopFilters = (products: Product[]) => {
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Все');

    const categories = useMemo(
        () => ['Все', ...Array.from(new Set(products.map(p => p.category)))],
        [products]
    );

    const filteredProducts = useMemo(() => {
        return products
            .filter(p => selectedCategory === 'Все' || p.category === selectedCategory)
            .filter(p =>
                p.title.toLowerCase().includes(search.toLowerCase())
            );
    }, [products, search, selectedCategory]);

    return {
        search,
        setSearch,
        selectedCategory,
        setSelectedCategory,
        categories,
        filteredProducts,
    };
};
