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

async function insertSchool() {
  const schoolData = {
    name: "Example Organization",
    emailDomain: "example.org",
    juniorSchool: true,
    seniorSchool: false,
  }
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
    emailDomain: schoolData.emailDomain,
    juniorSchool: schoolData.juniorSchool,
    seniorSchool: schoolData.seniorSchool,
  })

  return data
}

export async function postSchool() {
  try {
    const data = await insertSchool()
    return data
  } catch (error) {
    console.error(error)
  }
}
