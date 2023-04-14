// Generates entire shipping address based on
// street address; city; region, such as province or state;
// postal code; and country or region
const createShippingAddress = (address, city, region, postalCode, countryRegion) => {
    // Shipping address
    let shippingAddress = `${address}, ${city} ${region} ${postalCode}, ${countryRegion}`;

    return shippingAddress;
}

export default createShippingAddress;