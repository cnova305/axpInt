import type { ActionFunction, MetaFunction } from "@remix-run/node"

import { json } from "@remix-run/node"
import { Form, useLoaderData } from "@remix-run/react"
import { getSchools, postSchool } from "../queries"

export const meta: MetaFunction = () => [{ title: "Interview Project" }]

export async function loader() {
  return json(await getSchools())
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const extractedData: any = {}
  for (const [key, value] of formData.entries()) {
    extractedData[key] = (value as string) || null
  }
  postSchool(extractedData)
  return null
}

export default function Index() {
  const schools = useLoaderData<typeof loader>()

  return (
    <div className="min-h-screen  py-3">
      <div className="flex">
        <div className="w-1/2 p-4">
          <h1 className="mt-10 font-montserrat text-5xl text-white drop-shadow-xl">
            School Form
          </h1>
          <Form method="post">
            <p>
              <label>
                Name: <input type="text" name="name" />
              </label>
            </p>
            <p>
              <label>
                Email Domain: <input type="text" name="emailDomain" />
              </label>
            </p>
            <p>
              <label>
                Junior School: <input type="checkbox" name="juniorSchool" />
              </label>
            </p>
            <p>
              <label>
                Senior School: <input type="checkbox" name="seniorSchool" />
              </label>
            </p>
            <p>
              <label>
                Name or Number: <input type="text" name="nameOrNumber" />
              </label>
            </p>
            <p>
              <label>
                Street: <input type="text" name="street" />
              </label>
            </p>
            <p>
              <label>
                Street 2: <input type="text" name="street2" />
              </label>
            </p>
            <p>
              <label>
                Town or City: <input type="text" name="townOrCity" />
              </label>
            </p>
            <p>
              <label>
                Region: <input type="text" name="region" />
              </label>
            </p>
            <p>
              <label>
                Address Code: <input type="text" name="addressCode" />
              </label>
            </p>
            <p>
              <label>
                Country: <input type="text" name="country" />
              </label>
            </p>

            <p>
              <button type="submit">Create</button>
            </p>
          </Form>
        </div>
        <div className="w-1/2 p-4">
          <h1 className="mt-10 font-montserrat text-5xl text-white drop-shadow-xl">
            School List
          </h1>
          <div>
            {schools.map((school, index) => {
              return (
                <div key={index} className="mt-10">
                  <h1 className="font-montserrat text-2xl text-white drop-shadow-xl">
                    {school.name}
                  </h1>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
    // <div className="min-h-screen  py-3">
    //   <div>
    //     <h1 className="mt-10 font-montserrat text-5xl text-white drop-shadow-xl">
    //       School Form
    //     </h1>
    //   </div>
    //   <Form method="post">
    //     <p>
    //       <button type="submit">Create</button>
    //     </p>
    //   </Form>
    //   {schools.map((school, index) => {
    //     return (
    //       <div key={index} className="mt-10">
    //         <h1 className="font-montserrat text-2xl text-white drop-shadow-xl">
    //           {school.name}
    //         </h1>
    //       </div>
    //     )
    //   })}
    //   {/* <SchoolsList /> */}
    // </div>
  )
}
