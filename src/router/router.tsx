import {createBrowserRouter} from "react-router-dom";
import PokemonsPage from "../pages/PokemonsPage";
import MainLayout from "../layouts/MainLayout";
import ErrorComponent from "../components/ErrorComponent";
import PokemonPageByName from "../pages/PokemonPageByName";


export const router = createBrowserRouter(
    [
        {path: '/', element:<MainLayout/>,
            errorElement:<ErrorComponent/>,
            children:[
                // {index:true, element:<HomePage/>},
                {path:'pokemon', element:<PokemonsPage/>},
                {path:'pokemon/:name', element:<PokemonPageByName/>}
            ]
        }
        ]
)