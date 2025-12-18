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
            setProducts([
                {
                    id: 2,
                    name: 'Produit test',
                    price: 10,
                    internal: false,
                },
                {
                    id: 3,
                    name: 'Produit test3',
                    price: 10,
                    internal: true,
                },
            ]);

            setLoading(false);
        },
        []);

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
