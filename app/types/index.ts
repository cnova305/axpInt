export interface Timestamped {
  createdAt: Date
  updatedAt: Date
}
export interface Address extends Timestamped {
  addressCode: string
  country: string
  nameOrNumber: string
  region?: string | null
  street2?: string | null
  street?: string | null
  townOrCity: string
  organisation?: Organisation | null
}
export interface Organisation extends Timestamped {
  name: string
  address: Address[]
}
export interface School extends Organisation {
  emailDomain?: string | null
  juniorSchool?: boolean | null
  seniorSchool?: boolean | null
}
