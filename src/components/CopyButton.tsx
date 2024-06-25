
export function CopyButton({ value, label }: { value: string; label?: string; }) {
  return (
    <button
      type="button"
      title="Copy to clipboard"
      onClick={() => {
        navigator.clipboard.writeText(value);
      }}
      className="hover:scale-110 active:scale-95"
    >
      📄 {label}
    </button>
  );
}
