import {createBrowserRouter} from "react-router-dom";
import PokemonsPage from "../pages/PokemonsPage";
import MainLayout from "../layouts/MainLayout";
import ErrorComponent from "../components/ErrorComponent";
import PokemonSearchPage from "../pages/PokemonSearchPage";
import PokemonPageByName from "../pages/PokemonByName/PokemonPageByName";


export const router = createBrowserRouter(
    [
        {path: '/', element:<MainLayout/>,
            errorElement:<ErrorComponent/>,
            children:[
                // {index:true, element:<HomePage/>},
                {path:'pokemon', element:<PokemonsPage/>},
                {path:'pokemon/:name', element:<PokemonPageByName/>},
                {path:'pokemon/search', element:<PokemonSearchPage/>}
            ]
        }
        ]
)