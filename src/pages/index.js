import { store } from "@/store/store";
import { Provider } from "react-redux";
import App from "../components/App";

export default function Home() {

	return (
		<Provider store={store}>
			<App />
		</Provider>
	)
}
