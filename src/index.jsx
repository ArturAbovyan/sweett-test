import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from 'react-redux';
import store from "./redux/store";
import reportWebVitals from './reportWebVitals';
import {GoogleOAuthProvider} from "@react-oauth/google"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<GoogleOAuthProvider clientId={"841259442375-k383nf312frarl1e4ld4346eju01unrm.apps.googleusercontent.com"}>
		<Provider store={store}>
			<App/>
		</Provider>
	</GoogleOAuthProvider>
);

reportWebVitals();
