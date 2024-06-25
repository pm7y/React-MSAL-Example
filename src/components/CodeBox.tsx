import { CopyButton } from "./CopyButton";

export function CodeBox({ code, copyValue }: { code: string; copyValue?: string | null; }) {
  const copyText = copyValue ?? code;

  return (
    <div className="dark:bg-gray-900 bg-gray-200 my-6 px-4 pb-4 pt-2 rounded-2xl">
      {copyText && (
        <div className="flex justify-end ">
          <CopyButton value={copyText} />
        </div>
      )}
      <pre className="whitespace-pre-wrap break-all">{code}</pre>
    </div>
  );
}
