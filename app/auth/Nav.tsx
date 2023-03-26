import Link from "next/link";
import Login from "./Login";
import LoggedIn from "./LoggedIn";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

async function Nav() {
  const session = await getServerSession(authOptions);

  // Get the user's session based on the request
  return (
    <nav className="flex justify-between items-center py-8">
      <Link href="/">
        <h1 className="font-bold text-lg">Send</h1>
      </Link>
      <ul className="flex items-center gap-6">
        {!session?.user && <Login />}
        {session?.user && <LoggedIn {...session.user} />}
      </ul>
    </nav>
  );
}

export default Nav;
