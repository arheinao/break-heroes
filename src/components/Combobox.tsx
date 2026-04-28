"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { ChevronDown } from "lucide-react";

export interface ComboboxOption {
  value: string;
  label: string;
  flag?: string;
}

interface ComboboxProps {
  options: ComboboxOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
  className?: string;
}

function normalize(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

export default function Combobox({
  options,
  value,
  onChange,
  placeholder = "Search…",
  ariaLabel,
  className = "",
}: ComboboxProps) {
  const selected = options.find((o) => o.value === value);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listboxId = useId();

  const filtered = useMemo(() => {
    if (!query) return options;
    const q = normalize(query);
    return options.filter((o) => normalize(o.label).includes(q));
  }, [options, query]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    setHighlight(0);
  }, [query, open]);

  useEffect(() => {
    if (!open) return;
    const list = listRef.current;
    if (!list) return;
    const item = list.children[highlight] as HTMLElement | undefined;
    if (item)
      item.scrollIntoView({ block: "nearest", behavior: "instant" as ScrollBehavior });
  }, [highlight, open]);

  function commit(opt: ComboboxOption) {
    onChange(opt.value);
    setOpen(false);
    setQuery("");
    inputRef.current?.blur();
  }

  function handleKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setHighlight((h) => Math.min(h + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const opt = filtered[highlight];
      if (opt) commit(opt);
    } else if (e.key === "Escape") {
      setOpen(false);
      setQuery("");
      inputRef.current?.blur();
    }
  }

  const display = open
    ? query
    : selected
      ? `${selected.flag ? selected.flag + " " : ""}${selected.label}`
      : "";

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="flex items-center gap-1">
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-label={ariaLabel}
          value={display}
          placeholder={placeholder}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            setOpen(true);
            setQuery("");
          }}
          onKeyDown={handleKey}
          className="w-full bg-transparent font-medium outline-none placeholder:text-muted-foreground"
        />
        <ChevronDown
          className="h-4 w-4 text-muted-foreground shrink-0"
          aria-hidden
        />
      </div>

      {open && (
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          className="absolute left-0 right-0 top-full mt-2 z-50 max-h-72 overflow-y-auto rounded-xl border border-border bg-card shadow-float py-1"
        >
          {filtered.length === 0 ? (
            <li className="px-3 py-2 text-sm text-muted-foreground">
              No matches.
            </li>
          ) : (
            filtered.map((o, i) => (
              <li
                key={o.value}
                role="option"
                aria-selected={highlight === i}
                onMouseDown={(e) => {
                  e.preventDefault();
                  commit(o);
                }}
                onMouseEnter={() => setHighlight(i)}
                className={`px-3 py-2 cursor-pointer text-sm flex items-center gap-2 ${
                  highlight === i
                    ? "bg-muted text-foreground"
                    : "text-foreground/80"
                }`}
              >
                {o.flag && <span className="shrink-0">{o.flag}</span>}
                <span className="truncate">{o.label}</span>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
