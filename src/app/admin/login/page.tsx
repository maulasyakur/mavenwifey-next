import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import AboutMeIcon from "@/assets/about-me.png";
import LoginForm from "./form";

export default function Login() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center gap-2 justify-center">
          <Image src={AboutMeIcon} alt="Login logo" />
          <h1 className="text-2xl font-bold">mavenwifey</h1>
        </div>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              Welcome back, Nadita!
            </CardTitle>
            <CardDescription>Login to admin dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
