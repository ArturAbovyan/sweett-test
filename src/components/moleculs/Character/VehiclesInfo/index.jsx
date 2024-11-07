import styles from "./style.module.css";
import {useEffect, useState} from "react";
import axios from "axios";

const VehiclesInfoSection = ({urlList}) => {
	const [vehiclesArray, setVehiclesArray] = useState([]);
	const fetchVehiclesInfo = async (urlList) => {
		for (let i = 0; i < urlList.length; i++) {
			const response = await axios.get(urlList[i]);
			setVehiclesArray((prevDataArray) => [...prevDataArray, response.data]);
		}
	}
	useEffect(() => {
		if(urlList){
			fetchVehiclesInfo(urlList);
		}
	}, [urlList])

	return(
		<div className={styles.vehicles_wrapper}>
			<h4 className={styles.heading}>
				Vehicles Information
			</h4>
			<div className={styles.vehicles_container}>
				{vehiclesArray.length > 0 && vehiclesArray.map((vehicle, index) => (
					<div key={index} className={styles.vehicle_card}>
						<h4>
							Name: {vehicle.name}
						</h4>
						<p>
							Model: {vehicle.model}<br/>
							Class: {vehicle.vehicle_class}<br/>
							Manufacturer: {vehicle.manufacturer}<br/>
							Cost: {vehicle.cost_in_credits}
						</p>
					</div>
				))}
			</div>
			{urlList.length === 0 &&
				<div className={styles.vehicle_card}>
					No Vehicles Found
				</div>
			}
		</div>
	);
};

export default VehiclesInfoSection;