type TagsProps = {
  text: string;
} & React.HTMLAttributes<HTMLButtonElement>;

export function Tags({ text }: TagsProps) {
  return (
    <button
      className="flex items-center justify-center bg-background-normal rounded-lg px-8 py-2 text-[14px]
    hover:bg-secondary-normal hover:text-white text-secondary-normal cursor-pointer transition-colors"
    >
      {text}
    </button>
  );
}
