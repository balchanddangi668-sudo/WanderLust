const mapElement = document.getElementById("map");

if (mapElement) {
    const locationName = mapElement.dataset.location;

    fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(locationName)}`
    )
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                console.log("Location not found");
                return;
            }

            const latitude = Number(data[0].lat);
            const longitude = Number(data[0].lon);

            // Map create
            const map = L.map("map").setView(
                [latitude, longitude],
                12
            );

            // Map tiles
            L.tileLayer(
                "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                {
                    attribution: "&copy; OpenStreetMap contributors"
                }
            ).addTo(map);

            // Red marker icon
            const redIcon = L.icon({
                iconUrl:
                    "https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-red.png",

                shadowUrl:
                    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });

            // Marker + White popup message
            L.marker([latitude, longitude], {
                icon: redIcon
            })
                .addTo(map)
                .bindPopup(`
                    <div class="custom-popup">
                        <h3>${locationName}</h3>
                        <p>
                            Exact location will be provided after booking.
                        </p>
                    </div>
                `)
                .openPopup();
        })
        .catch(error => {
            console.log("Map error:", error);
        });
}