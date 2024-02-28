import type { MetaFunction } from "@remix-run/node"

import SchoolsList from "../components/SchoolsList"

export const meta: MetaFunction = () => [{ title: "Interview Project" }]

export default function Index() {
  return (
    <div className="min-h-screen  py-3">
      <div>
        <h1 className="mt-10 font-montserrat text-5xl text-white drop-shadow-xl">
          School Form
        </h1>
      </div>

      <SchoolsList />
    </div>
  )
}
