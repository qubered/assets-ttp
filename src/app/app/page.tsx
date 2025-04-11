import { UserButton } from '@clerk/nextjs'

export const metadata = {
    title: "TwoToned RMS"
  }


export default function AppPage() {
    return(
        <div>
            <h1>Hello</h1>
            <UserButton />
        </div>
    )
}