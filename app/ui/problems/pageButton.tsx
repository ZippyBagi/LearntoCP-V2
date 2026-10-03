
interface PageButtonProps{
    disabled: boolean;
    onClick: () => void;
    children: React.ReactNode;
}

export default function PageButton({ disabled, onClick, children}: PageButtonProps) {

    return (
        <button
            type="button"
            disabled={disabled ?? true}
            onClick={onClick}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-border-subtle bg-bg-surface px-3.5 py-2 text-sm font-semibold text-text-heading transition-colors hover:border-accent-border-hover hover:bg-bg-surface-hover disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border-subtle disabled:hover:bg-bg-surface"
        >
            {children}
        </button>
    );
}