import { CopyButton } from "./CopyButton";

export function CodeBox({
  code,
  copyValue,
  copyLabel,
}: {
  readonly code: string;
  readonly copyValue?: string | null;
  readonly copyLabel?: string | null;
}) {
  const copyText = copyValue ?? code;

  return (
    <div className="px-4 pt-2 pb-4 my-6 dark:bg-stone-900 bg-stone-200 rounded-2xl">
      {copyText && (
        <div className="flex justify-end">
          <CopyButton value={copyText} label={copyLabel ?? "Copy"} />
        </div>
      )}
      <pre className="pb-4 overflow-x-auto text-sm custom-scrollbar">
        {code}
      </pre>
    </div>
  );
}
