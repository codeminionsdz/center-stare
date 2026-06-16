import React from "react"

export const ScissorsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M6.5 6.5c1.5 1.5 5 5 8.5 8.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="6" cy="6" r="2" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="18" cy="18" r="2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M8 8l8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
)

export const ClipperIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="3" y="7" width="18" height="6" rx="2" stroke="currentColor" strokeWidth="1.4" />
    <path d="M7 7v-2a2 2 0 0 1 2-2h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 13v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

export const RazorIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M3 12h18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M6 12l3 6 9-12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const BrushIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M4 20s3-2 6-2 7-5 8-7c1-2 1-4-1-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 3l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const BottleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="7" y="3" width="10" height="14" rx="2" stroke="currentColor" strokeWidth="1.4" />
    <path d="M10 3v-1h4v1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

export const CombIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M3 6c2-2 6-3 10-2s8 4 8 8c0 0-2 4-6 4s-8-1-10-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 7v6M10 7v6M12 7v6M14 7v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
)

export default {
  ScissorsIcon,
  ClipperIcon,
  RazorIcon,
  BrushIcon,
  BottleIcon,
  CombIcon,
}
