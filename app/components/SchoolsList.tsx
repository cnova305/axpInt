import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { getSchools } from "../queries"

export async function loader() {
  return json(await getSchools())
}

export default function SchoolsList() {
  const schools = useLoaderData<typeof loader>()
  return (
    <>
      {schools &&
        schools.map((school, index) => {
          return (
            <div key={index} className="mt-10">
              <h1 className="font-montserrat text-2xl text-white drop-shadow-xl">
                {school.name}
              </h1>
            </div>
          )
        })}
    </>
  )
}
