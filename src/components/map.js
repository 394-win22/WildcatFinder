import React, {useState} from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import Geocode from "react-geocode";
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import LocSelectDialog from "./LocSelectDialog";
Geocode.setApiKey("AIzaSyDt5t_GXecbTnSz5f_gOdSHKhNbIK4UCfw");

const MapContainer = ({mapOpen, setMapOpen, location, setLocation, isMobile}) => {
    const [dialogOpen, setDialogOpen] = useState(false);

    const mapStyles = {
        position: "absolute",
        margin: "auto",
        left: "0",
        right: "0",
        top: "0",
        bottom: "0",
        height: isMobile ? "60vh" : "88vh",
        width: isMobile ? "100%" : "80%"
    };

    const defaultCenter = {
        lat: 42.055984, lng: -87.675171
    };

    return (
        <div data-cy="map">
            <LoadScript
                googleMapsApiKey= 'AIzaSyDt5t_GXecbTnSz5f_gOdSHKhNbIK4UCfw'>
                <Modal
                    open={mapOpen}
                    onClose={() => {
                        setMapOpen(false);
                    }}
                    style={{ overflow: 'scroll'}}
                >
                    <Box>
                        <GoogleMap
                            className="googleMap"
                            mapContainerStyle={mapStyles}
                            zoom={16}
                            center={defaultCenter}
                            onClick={(e) => {
                                Geocode.fromLatLng(e.latLng.lat(), e.latLng.lng()).then(
                                    (response) => {
                                        const address = response.results[0].formatted_address;
                                        setDialogOpen(true);
                                        setLocation(address);
                                    },
                                    (error) => {
                                        console.error(error);
                                    }
                                )
                            }
                            }
                        />
                    </Box>
                </Modal>
            </LoadScript>
            <LocSelectDialog open={dialogOpen}
                             setOpen={setDialogOpen}
                             location={location}
                             setLocation={setLocation}
                             setMapOpen={setMapOpen}/>
        </div>
    )
}

export default MapContainer;