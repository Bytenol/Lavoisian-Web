import { Route, Routes } from 'react-router-dom';
import './App.css'
import SnackbarLayout from './layout/SnackbarLayout';
import PeriodicTableView from './features/periodicTable/PeriodicTableView';
import KhemBalanceView from './features/khemBalance/KhemBalanceView';
import Footer from './layout/Footer';
import Header from './layout/Header';
import Aside from './layout/Aside';


const App = () => {

	return (
		<Routes>
			<Route path="/" element={<SnackbarLayout aside={<Aside />} header={<Header />} footer={<Footer />} />}>
				<Route index element={<PeriodicTableView />} />
				<Route path="khembalance" element={<KhemBalanceView />}/>
			</Route>
		</Routes>
	);
}

export default App
