// components/ui/Loading.tsx
export default function Loading() {
  return (
    <div className="flex w-full items-center justify-center py-12">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
    </div>
  );
}
