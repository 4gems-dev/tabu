import Container from "@/components/ui/container";
import { cn } from "@/lib/utils";
import Head from "next/head";

import Link from "next/link";

import { PropsWithChildren } from "react";

type PropsType = PropsWithChildren<{
  title: string;

  /**
   * className for `<main>`
   */
  className?: string;
  classNames?: Partial<{
    main: string;
    footer: string;
    header: string;
  }>;
}>;

export default function Layout({
  children,
  title,
  className = "",
  classNames,
}: PropsType) {
  return (
    <>
      <Head>
        <title>{title} | Tabu</title>
      </Head>
      <header
        className={cn(
          "w-full bg-black z-[9990] border-b  h-24",
          classNames?.header
        )}
      >
        <Container className="!py-0 flex items-center h-full">
          <Link className="flex items-center gap-1" href="/">
            <img
              src={`/logo-tatra-banka.png`}
              alt="Landing page image"
              className="w-full h-full max-h-16 object-fil" // Set the width for desktop view
            />
          </Link>

          <nav className="ml-auto flex items-center gap-1">
            <ul className="sm:flex hidden items-center gap-1 flex-shrink-0">
              {/* <li>
                <Button asChild variant="link" className="flex-shrink-0">
                  <Link href="/example">Example</Link>
                </Button>
              </li> */}
            </ul>
          </nav>
        </Container>
      </header>

      <main className={`${className} ${classNames?.main ?? ""}`}>
        {children}
      </main>

      <footer
        className={`${classNames?.header ?? ""} mt-auto border-t text-white `}
      >
        <Container className="">
          <p className="text-center text-sm font-semibold">
            Copyright © 2024 TABU. All Rights Reserved
          </p>
        </Container>
      </footer>
    </>
  );
}
