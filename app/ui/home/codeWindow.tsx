import { useTranslations } from "next-intl"
import { ReactNode } from "react";


export default function codeWindow(){

    return (
        <div className="pop [--pop-delay:240ms] relative hidden lg:block">
            <span className="absolute -top-5 right-6 z-10 inline-flex items-center gap-2.5 rounded-full px-6 py-2.5 font-mono text-base font-bold"
                style={{
                    background: "linear-gradient(135deg, #0a2c1c 0%, #06231b 100%)",
                    color: "var(--color-success)",
                    border: "1.5px solid rgba(80,250,123,0.55)",
                    boxShadow:
                    "0 0 14px rgba(80,250,123,0.22), 0 4px 20px rgba(0,0,0,0.45)",
                }}
            >
                ✓ Accepted
            </span>

            <div className="overflow-hidden rounded-xl"
                style={{
                    background: "var(--color-bg-code)",
                    border: "1px solid var(--color-border-subtle)",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
                }}
            >

                <div className="flex items-center justify-between px-5 py-3"
                    style={{
                        background: "var(--color-bg-code-header)",
                        borderBottom: "1px solid var(--color-border-subtle)",
                    }}
                >
                    <span className="font-mono text-base font-semibold" style={{ color: "var(--color-text-heading)" }}>
                        Solution.cpp
                    </span>

                    <span aria-hidden className="select-none rounded-md px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-widest"
                        style={{
                            color: "var(--color-accent-dim)",
                            border: "1px solid var(--color-accent-border)",
                            background: "rgba(124,158,248,0.06)",
                        }}
                    >
                        Copy
                    </span>
                </div>

                <pre className="overflow-x-auto px-6 py-6 font-mono text-[15px] leading-[1.9]">
                    <code style={{ color: "var(--color-text-heading)" }}>
                        {codeLines.map((line, i) => (
                            <div key={i} className="flex">
                                <span className="w-10 shrink-0 select-none pr-5 text-right" style={{ color: "rgba(124,158,248,0.35)" }}>
                                    {i + 1}
                                </span>
                                <span className="whitespace-pre">{line}</span>
                            </div>
                        ))}
                    </code>
                </pre>
            
            </div>
        </div>
    )

}

// Disclosure, AI did this conversion from text to ReactNode[], I think this was the simplest solustion

const Kw = ({ children }: { children: ReactNode }) => (
  <span style={{ color: "#ff79c6" }}>{children}</span>
);
const Ty = ({ children }: { children: ReactNode }) => (
  <span style={{ color: "#8be9fd" }}>{children}</span>
);
const St = ({ children }: { children: ReactNode }) => (
  <span style={{ color: "#f1fa8c" }}>{children}</span>
);
const Fn = ({ children }: { children: ReactNode }) => (
  <span style={{ color: "#50fa7b" }}>{children}</span>
);
const Nm = ({ children }: { children: ReactNode }) => (
  <span style={{ color: "#bd93f9" }}>{children}</span>
);

const codeLines: ReactNode[] = [ 
  <>
    <Kw>#include</Kw> <St>&lt;bits/stdc++.h&gt;</St>
  </>,
  <>
    <Kw>using namespace</Kw> std;
  </>,
  <>&nbsp;</>,
  <>
    <Kw>int</Kw> <Fn>main</Fn>() {"{"}
  </>,
  <>
    {"    "}
    <Kw>int</Kw> n, k;
  </>,
  <>
    {"    "}cin <Kw>&gt;&gt;</Kw> n <Kw>&gt;&gt;</Kw> k;
  </>,
  <>&nbsp;</>,
  <>
    {"    "}
    <Ty>vector</Ty>&lt;<Kw>int</Kw>&gt; <Fn>a</Fn>(n);
  </>,
  <>
    {"    "}
    <Kw>for</Kw> (<Kw>int</Kw>&amp; x : a) cin <Kw>&gt;&gt;</Kw> x;
  </>,
  <>&nbsp;</>,
  <>
    {"    "}
    <Ty>unordered_set</Ty>&lt;<Kw>int</Kw>&gt; seen;
  </>,
  <>
    {"    "}
    <Kw>for</Kw> (<Kw>int</Kw> x : a) {"{"}
  </>,
  <>
    {"        "}
    <Kw>if</Kw> (seen.<Fn>count</Fn>(k - x)) {"{"}
  </>,
  <>
    {"            "}cout <Kw>&lt;&lt;</Kw> <St>&quot;Accepted\n&quot;</St>;
  </>,
  <>
    {"            "}
    <Kw>return</Kw> <Nm>0</Nm>;
  </>,
  <>
    {"        "}
    {"}"}
  </>,
  <>
    {"        "}seen.<Fn>insert</Fn>(x);
  </>,
  <>
    {"    "}
    {"}"}
  </>,
  <>
    {"    "}cout <Kw>&lt;&lt;</Kw> <St>&quot;Keep going\n&quot;</St>;
  </>,
  <>{"}"}</>,
];