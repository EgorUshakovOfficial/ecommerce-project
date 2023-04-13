const createShippingAddress = (address, city, region, postalCode, countryRegion) => {
    // Shipping address
    let shippingAddress = `${address}, ${city} ${region} ${postalCode}, ${countryRegion}`;

    return shippingAddress;
}

export default createShippingAddress;