export interface ShippingAddressType {
    UserShippingAddress: UserShippingAddress,
}


export interface UserShippingAddress {
    details: string,
    phone: string,
    city: string,
    postalCode: string
}