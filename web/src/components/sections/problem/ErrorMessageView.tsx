import { cn } from "@/lib/utils";
import { ErrorMessage, ErrorMessageColor, ErrorMessageStyle } from "@/lib/problems";

interface ErrorMessageViewProps {
  message?: ErrorMessage;
  className?: string;
}

const colorClass: Record<ErrorMessageColor, string> = {
  default: "text-foreground",
  red: "text-red-600 dark:text-red-400",
  yellow: "text-amber-600 dark:text-amber-400",
  cyan: "text-cyan-600 dark:text-cyan-400",
  green: "text-emerald-600 dark:text-emerald-400",
};

const styleClass: Record<ErrorMessageStyle, string> = {
  normal: "font-normal not-italic",
  bold: "font-semibold not-italic",
  italic: "font-normal italic",
};

export function ErrorMessageView({ message, className }: ErrorMessageViewProps) {
  if (!message || message.length === 0) {
    return <div className="text-muted-foreground text-sm italic">No error details available.</div>;
  }
  return (
    <div
      className={cn(
        "wrap-break-word whitespace-pre-wrap",
        "font-mono text-sm leading-6 tracking-normal",
        className
      )}
      role="note"
    >
      {message.map((part, i) => (
        <span
          key={i}
          className={cn(colorClass[part.color], styleClass[part.style])}
        >
          {part.text}
        </span>
      ))}
    </div>
  );
}
