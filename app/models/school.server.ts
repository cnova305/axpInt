import * as edgedb from "edgedb"
import { School } from "../types"

const client = edgedb.createClient()

async function querySchools() {
  const data = await client.query<School[]>(
    `select default::School {
      name,
      id,
      emailDomain,
      juniorSchool,
      seniorSchool,
      address: {
        updatedAt,
        createdAt,
        id,
        addressCode,
        country,
        nameOrNumber,
        region,
        street2,
        street,
        townOrCity
      }
    }`,
  )

  return data
}

export async function getSchools() {
  try {
    const data = await querySchools()
    return data
  } catch (error) {
    console.error(error)
  }
}
