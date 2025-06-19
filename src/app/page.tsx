import { GetStartedButton } from "@/components/get-started-button";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-dvh">
      <div className="flex flex-col gap-8 items-center justify-center">
        <h1 className="text-4xl font-bold">Welcome to the Home Page</h1>
        <p className="text-lg text-gray-600">
          This is the home page of the application.
        </p>
        <GetStartedButton />
      </div>
    </div>
  );
}
