"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";

export function CustomBreadcrumb(items, title, subtitle, className) {
  if (!items?.length) {
    return null;
  }

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-white/90 p-4 shadow-sm backdrop-blur-sm sm:p-5",
        className,
      )}
    >
      <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <Breadcrumb className="overflow-hidden">
            <BreadcrumbList className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.24em] text-muted-foreground md:text-sm">
              {items.map((item, index) => {
                const isLast = index === items.length - 1;

                return (
                  <Fragment key={item.href ?? item.label}>
                    <BreadcrumbItem>
                      {item.href && !isLast ? (
                        <BreadcrumbLink asChild>
                          <Link
                            href={item.href}
                            className="text-sm font-medium text-foreground transition-colors hover:text-primary"
                          >
                            {item.label}
                          </Link>
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage className="text-sm font-semibold text-foreground">
                          {item.label}
                        </BreadcrumbPage>
                      )}
                    </BreadcrumbItem>

                    {!isLast && (
                      <BreadcrumbSeparator className="text-muted-foreground">
                        /
                      </BreadcrumbSeparator>
                    )}
                  </Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>

          {title ? (
            <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl lg:text-3xl">
              {title}
            </h1>
          ) : null}

          {subtitle ? (
            <p className="max-w-3xl text-sm text-muted-foreground sm:text-base">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
