import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Navbar() {
    const { cartItems } = useCart()

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <nav className="p-4 shadow-md flex justify-between items-center">
            <Link to="/" className="text-xl font-bold">
                BuildPro
            </Link>

            <div className="flex gap-4">
                <Link to="/">Accueil</Link>
                <Link to="/catalogue">Catalogue</Link>
                <Link to="/panier">Panier ({totalItems})</Link>
            </div>
        </nav>
    )
}