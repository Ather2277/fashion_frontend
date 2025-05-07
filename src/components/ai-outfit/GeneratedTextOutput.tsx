
interface GeneratedTextOutputProps {
  output: string;
}

export function GeneratedTextOutput({ output }: GeneratedTextOutputProps) {
  return (
    <div className="mt-4 p-4 border rounded bg-gray-50">
      <p className="text-lg font-semibold">Generated Outfit:</p>
      <p className="text-gray-700">{output}</p>
    </div>
  );
}
