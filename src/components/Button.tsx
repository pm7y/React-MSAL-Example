export function Button({
  label,
  onClick,
  disabled,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      className="px-4 py-2.5 leading-none flex items-center justify-center text-base font-medium transition-colors bg-gray-100 border border-transparent rounded-md cursor-pointer hover:border-blue-300 duration-250 dark:bg-gray-900"
      onClick={onClick}
    >
      {label}
    </button>
  );
}
