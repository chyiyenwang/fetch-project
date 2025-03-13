import { Button } from "@heroui/react";
import Link from "next/link";

interface PaginationProps {
  next?: string;
  previous?: string;
}

export default function Pagination({ next, previous }: PaginationProps) {
  return (
    <div className="w-full mt-auto py-4 px-8 flex justify-between items-center">
      {previous ? (
        <Link href={previous}>
          <Button
            variant="bordered"
            size="lg"
          >
            Previous
          </Button>
        </Link>
      ) : (
        <div className="w-[120px]" />
      )}

      <div className="flex-1 text-center text-gray-500" />

      {next ? (
        <Link href={next}>
          <Button
            variant="bordered"
            size="lg"
          >
            Next
          </Button>
        </Link>
      ) : (
        <div className="w-[120px]" />
      )}
    </div>
  )
}