// src/components/PageBar.tsx
type Props = { title: string };

export default function PageBar({ title }: Props) {
  return (
    <div className="h-8 w-full bg-green-700 text-white border-b border-green-800">
      <div className="h-full px-4 flex items-center text-sm font-medium">
        {title}
      </div>
    </div>
  );
}
