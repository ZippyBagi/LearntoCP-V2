'use client'

import Image from 'next/image';
import parse, { HTMLReactParserOptions, Element } from 'html-react-parser';

interface OptimizedContentProps {
  htmlContent : string;
}

//copy button for code blocks
const handleCopy = async (button: HTMLElement) => {
    const wrapper = button.closest(".code-block-wrapper");
    const code = wrapper?.querySelector("pre code")?.textContent;

    if (!code) return;

    await navigator.clipboard.writeText(code);

    button.textContent = "Copied!";
    button.classList.add("copied");

    setTimeout(() => {
        button.textContent = "Copy";
        button.classList.remove("copied");
    }, 1800);
};

export default function OptimizedContent({htmlContent} : OptimizedContentProps){

    const options : HTMLReactParserOptions = {
        replace: (domNode) => {

            if(domNode instanceof Element && domNode.name === 'img'){

                const {src, alt, width, height} = domNode.attribs;

                const formatedSrc = src.startsWith('/') ? src : "/" + src;
                if (!width || !height) {
                    return (
                        <div className="relative w-full h-64">
                            <Image
                                src={formatedSrc}
                                alt={alt || 'Optimized CMS Image'}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                    );
                }

                return (
                    <Image
                        src={formatedSrc}
                        alt={alt || 'Optimized CMS Image'}
                        width={parseInt(width, 10)}
                        height={parseInt(height, 10)}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className='rounded-sm ml-8'
                    />
                );

            }
            
            if(domNode instanceof Element && domNode.name === "button" && domNode.attribs?.class === "code-copy-btn"){

                return (
                    <button
                        className="code-copy-btn"
                        onClick={(e) => handleCopy(e.currentTarget)}
                    >
                        Copy
                    </button>
                )
            }
        }
    }

    return <article className="prose prose-slate dark:prose-invert max-w-none">{parse(htmlContent, options)}</article>;

}