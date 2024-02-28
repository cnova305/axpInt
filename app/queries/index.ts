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
}

async function insertSchool(schoolData: SchoolData) {
  // const schoolData = {
  //   name: "Example Organization",
  //   emailDomain: "example.org",
  //   juniorSchool: true,
  //   seniorSchool: false,
  //   nameOrNumber: "123",
  //   street: "Example Street",
  //   street2: "Example Street 2",
  //   townOrCity: "Example Town",
  //   region: "Example Region",
  //   country: "Example Country",
  //   addressCode: "12345",
  // }
  const insertQuery = `
    INSERT School {
        name := <str>$name,
        emailDomain :=<str>$emailDomain,
        juniorSchool := <bool>$juniorSchool,
        seniorSchool := <bool>$seniorSchool,
    };
    `

  const data = await client.execute(insertQuery, {
    name: schoolData.name,
    emailDomain: schoolData?.emailDomain || "",
    juniorSchool: schoolData?.juniorSchool ? true : false,
    seniorSchool: schoolData?.seniorSchool ? true : false,
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
