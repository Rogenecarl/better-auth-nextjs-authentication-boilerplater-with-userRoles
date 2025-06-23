export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">
        Success! You have successfully registered
      </h1>
      <p className="text-sm text-muted-foreground">
        Please check your email for a verification link.
      </p>
    </div>
  );
}
