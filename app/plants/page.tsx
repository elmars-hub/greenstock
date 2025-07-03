import { stackServerApp } from "@/stack";
import { SignUp } from "@stackframe/stack";

export default async function Plants() {
  const user = await stackServerApp.getUser();
  const app = stackServerApp.urls;

  return (
    <>
      {user ? (
        <h1>Inventory Table</h1>
      ) : (
        <div className="flex justify-center mt-16 items-center">
          <SignUp />
        </div>
      )}
    </>
  );
}
