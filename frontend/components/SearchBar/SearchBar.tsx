"use client"

import type React from "react"

interface SearchBarProps {
  placeholder?: string
  onSearch?: (value: string) => void
  className?: string
}

export default function SearchBar({ placeholder = "Search...", onSearch, className = "" }: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const searchValue = formData.get("search") as string
    if (onSearch) {
      onSearch(searchValue)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={`search-bar-container ${className}`}>
        <div className="input-group">
          <span className="input-group-text bg-white border-end-0">
            <i className="fas fa-search text-muted"></i>
          </span>
          <input
            type="text"
            name="search"
            className="form-control border-start-0 border-end-0"
            placeholder={placeholder}
            style={{
              paddingLeft: "0",
              boxShadow: "none",
            }}
          />
          <span className="input-group-text bg-white border-start-0">
            <button type="button" className="btn btn-link p-0 text-muted border-0">
              <i className="fas fa-microphone"></i>
            </button>
          </span>
        </div>
      </form>

      <style jsx>{`
        .search-bar-container .input-group {
          border-radius: 25px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          border: 1px solid #e9ecef;
        }
        
        .search-bar-container .input-group-text {
          border-radius: 0;
          border: none;
        }
        
        .search-bar-container .input-group-text:first-child {
          border-top-left-radius: 25px;
          border-bottom-left-radius: 25px;
        }
        
        .search-bar-container .input-group-text:last-child {
          border-top-right-radius: 25px;
          border-bottom-right-radius: 25px;
        }
        
        .search-bar-container .form-control {
          border: none;
        }
        
        .search-bar-container .form-control:focus {
          box-shadow: none;
          border-color: transparent;
        }
        
        .search-bar-container .btn:focus {
          box-shadow: none;
        }
        
        .search-bar-container .btn-link {
          text-decoration: none;
        }
      `}</style>
    </>
  )
}
