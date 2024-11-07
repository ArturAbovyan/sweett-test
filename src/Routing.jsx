import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {
	HomePage,
	FavoritesPage,
	CharacterPage
} from "./pages";
import DefaultLayout from "./layouts/Default";

const Routing = ({isAuthenticated}) => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<DefaultLayout/>}>
					<Route path="/" element={<HomePage/>}/>
					<Route path="/:page" element={<HomePage/>}/>
					{isAuthenticated && <Route path="/favorites" element={<FavoritesPage/>}/>}

					<Route path="/character/:id" element={<CharacterPage/>}/>
					<Route exact path="*" element={<Navigate to="/"/>}></Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default Routing;
