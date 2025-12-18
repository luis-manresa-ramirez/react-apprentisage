import { UserContext } from './components/UserContext';
import './App.css'
//import Init from "./Init.tsx";
import {ProductList} from "./components/ProductList.tsx";

function App() {

    return (
        <UserContext.Provider value={{ role: 'ADMIN' }}>
            <ProductList />
        </UserContext.Provider>
    );
}

export default App
