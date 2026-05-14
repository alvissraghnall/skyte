import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/showcase')({
  component: Showcase,
})

function Showcase() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">Showcase</h1>
      <p className="mt-4 text-lg text-on-surface-variant">
        Explore community-generated mockups.
      </p>
    </div>
  )
}
