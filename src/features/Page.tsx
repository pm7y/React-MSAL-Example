import { ReactNode } from "react";

export const Page = ({
  header,
  content,
}: {
  header: ReactNode;
  content: ReactNode;
}) => {
  return (
    <>
      <header className="px-8 pt-6 pb-8 -mb-2 bg-stone-200 dark:bg-zinc-800 rounded-t-xl">
        {header}
      </header>
      <section className="p-8 -mx-0  bg-stone-50 dark:bg-zinc-600 rounded-xl border-2 border-stone-200 dark:border-zinc-800">
        {content}
      </section>
    </>
  );
};
