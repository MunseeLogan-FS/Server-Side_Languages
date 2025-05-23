// This function fetches geolocation data from OpenStreetMap's Nominatim API

async function getGeoData(lati, long) {
  console.log(lati, long);
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lati}&lon=${long}&format=json`
    );
    if (!response.ok) {
      throw new Error("Network response not OK");
    }
    const data = await response.json();

    const lat = data.lat;
    const lon = data.lon;
    const name = data.name;
    const preAddress = `${data.address.road}, ${data.address.city}, ${data.address.state}, ${data.address.postcode}, ${data.address.country}`;

    const address = preAddress.replace(/ undefined,/g, "");

    return {
      lat,
      lon,
      name,
      address,
    };
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

module.exports = {
  getGeoData,
};
