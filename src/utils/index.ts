export const createData = (
    brokerTitle: string,
    type: string,
    price: number,
    beds: number,
    bath: number,
    propertySqft: number,
    address: string,
) => {
    return { brokerTitle, type, price, beds, bath, propertySqft, address };
}
