export interface IShipment {
  deliveryPerson: string
  item: {
    title: string
    description: string
    shipmentDate?: Date
  }[];
  locations?: string[];
}
