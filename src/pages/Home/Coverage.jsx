import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const Coverage = () => {

    const position = [23.8103, 90.4125];

    const data = [
        {
            city: "Dhaka",
            latitude: 23.8103,
            longitude: 90.4125,
            covered_area: ["Mirpur", "Uttara", "Dhanmondi"]
        },
        {
            city: "Chattogram",
            latitude: 22.3569,
            longitude: 91.7832,
            covered_area: ["Agrabad", "GEC", "Pahartali"]
        },
        {
            city: "Sylhet",
            latitude: 24.8949,
            longitude: 91.8687,
            covered_area: ["Zindabazar", "Amberkhana"]
        }
    ];

    return (
        <div className="p-4">

            <h2 className="text-2xl font-bold mb-4">
                Service Coverage Map
            </h2>

            <div className="w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm z-0" style={{ height: "500px" }}>
                <MapContainer
                    center={position}
                    zoom={7}
                    scrollWheelZoom={false}
                    style={{ height: "100%", width: "100%" }}
                >
                    <TileLayer
                        attribution='&copy; OpenStreetMap contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {
                        data.map((c, index) => (
                          <Marker
                              key={index}
                              position={[c.latitude, c.longitude]}
                          >
                              <Popup>
                                  <div>
                                      <h3 className="font-bold">{c.city}</h3>
                                      <p>{c.covered_area.join(', ')}</p>
                                  </div>
                              </Popup>
                          </Marker>
                        ))
                    }

                </MapContainer>
            </div>
        </div>
    );
};

export default Coverage;