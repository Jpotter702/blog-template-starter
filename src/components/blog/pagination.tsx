import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl: string
  className?: string
}

export function Pagination({ currentPage, totalPages, baseUrl, className }: PaginationProps) {
  if (totalPages <= 1) return null

  const getPageUrl = (page: number) => {
    if (page === 1) return baseUrl
    return `${baseUrl}/page/${page}`
  }

  const renderPageNumbers = () => {
    const pages = []
    const showEllipsis = totalPages > 7

    if (!showEllipsis) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Show ellipsis logic for more than 7 pages
      if (currentPage <= 4) {
        // Show 1-5, ..., last
        for (let i = 1; i <= 5; i++) {
          pages.push(i)
        }
        pages.push(-1) // Ellipsis
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 3) {
        // Show 1, ..., last-4 to last
        pages.push(1)
        pages.push(-1) // Ellipsis
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        // Show 1, ..., current-1, current, current+1, ..., last
        pages.push(1)
        pages.push(-1) // Ellipsis
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push(-2) // Ellipsis
        pages.push(totalPages)
      }
    }

    return pages.map((page, index) => {
      if (page === -1 || page === -2) {
        return (
          <Button
            key={`ellipsis-${index}`}
            variant="ghost"
            size="icon"
            disabled
            className="w-10 h-10"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        )
      }

      const isActive = page === currentPage

      return (
        <Button
          key={page}
          variant={isActive ? "default" : "ghost"}
          size="icon"
          className="w-10 h-10"
          asChild={!isActive}
        >
          {isActive ? (
            <span>{page}</span>
          ) : (
            <Link href={getPageUrl(page)}>{page}</Link>
          )}
        </Button>
      )
    })
  }

  return (
    <nav
      className={cn("flex items-center justify-center gap-2", className)}
      aria-label="Pagination"
    >
      {/* Previous button */}
      <Button
        variant="ghost"
        size="icon"
        className="w-10 h-10"
        disabled={currentPage === 1}
        asChild={currentPage > 1}
      >
        {currentPage > 1 ? (
          <Link href={getPageUrl(currentPage - 1)} aria-label="Previous page">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        ) : (
          <span aria-label="Previous page (disabled)">
            <ChevronLeft className="h-4 w-4" />
          </span>
        )}
      </Button>

      {/* Page numbers */}
      {renderPageNumbers()}

      {/* Next button */}
      <Button
        variant="ghost"
        size="icon"
        className="w-10 h-10"
        disabled={currentPage === totalPages}
        asChild={currentPage < totalPages}
      >
        {currentPage < totalPages ? (
          <Link href={getPageUrl(currentPage + 1)} aria-label="Next page">
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : (
          <span aria-label="Next page (disabled)">
            <ChevronRight className="h-4 w-4" />
          </span>
        )}
      </Button>
    </nav>
  )
}