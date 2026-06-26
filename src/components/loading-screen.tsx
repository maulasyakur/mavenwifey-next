import { Spinner } from "./ui/spinner";

export default function LoadingScreen() {
  return (
    <div className="flex h-full items-center justify-center">
      <Spinner />
    </div>
  );
}
