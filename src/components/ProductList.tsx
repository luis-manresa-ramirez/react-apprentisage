import { useEffect, useMemo, useState } from 'react';
import { useUser } from './UserContext';

interface Product {
    id: number;
    name: string;
    price: number;
    internal: boolean;
}

export function ProductList() {
    // 1️⃣ État local
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    // 2️⃣ État global
    const { role } = useUser();

    // 3️⃣ Effet : appel API
    useEffect(() => {
        let cancelled = false;

        async function loadProducts() {
            const response = await fetch('/api/products');
            const data: Product[] = await response.json();

            if (!cancelled) {
                setProducts(data);
                setLoading(false);
            }
        }

        loadProducts();

        return () => {
            cancelled = true;
        };
    }, []);

    // 4️⃣ Calcul optimisé
    const visibleProducts = useMemo(() => {
        console.log('recalcul des produits visibles');

        if (role === 'ADMIN') {
            return products;
        }

        return products.filter(p => !p.internal);
    }, [products, role]);

    // 5️⃣ Render
    if (loading) {
        return <p>Chargement...</p>;
    }

    return (
        <ul>
            {visibleProducts.map(product => (
                <li key={product.id}>
                    {product.name} – {product.price} €
                </li>
            ))}
        </ul>
    );
}
