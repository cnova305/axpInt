import * as edgedb from "edgedb"
import { School } from "../types"

const client = edgedb.createClient()

async function querySchools() {
  const data = await client.query<School>(
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

interface SchoolData {
  name: string
  emailDomain?: string
  juniorSchool?: string
  seniorSchool?: string
  nameOrNumber: string
  street?: string
  street2?: string
  townOrCity: string
  region?: string
  addressCode: string
  country: string
}

async function insertSchool(schoolData: SchoolData) {
  const insertQuery = `
  INSERT Address {
    nameOrNumber := <str>$nameOrNumber,
    street := <str>$street,
    street2 := <str>$street2,
    townOrCity := <str>$townOrCity,
    region := <str>$region,
    addressCode := <str>$addressCode,
    country := <str>$country,
    organisation := (
      INSERT School {
        name := <str>$name,
        emailDomain := <str>$emailDomain,
        juniorSchool := <bool>$juniorSchool,
        seniorSchool := <bool>$seniorSchool,
      }
    )
  };
  `

  const data = await client.execute(insertQuery, {
    name: schoolData.name,
    emailDomain: schoolData?.emailDomain || "",
    juniorSchool: schoolData?.juniorSchool ? true : false,
    seniorSchool: schoolData?.seniorSchool ? true : false,
    nameOrNumber: schoolData?.nameOrNumber || "",
    street: schoolData?.street || "",
    street2: schoolData?.street2 || "",
    townOrCity: schoolData?.townOrCity || "",
    region: schoolData?.region || "",
    addressCode: schoolData?.addressCode || "",
    country: schoolData?.country || "",
  })

  return data
}

export async function postSchool(schoolData: SchoolData) {
  try {
    const data = await insertSchool(schoolData)
    return
  } catch (error) {
    console.error(error)
  }
}
