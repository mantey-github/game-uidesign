import { SerializeFrom } from '@remix-run/node'
import { useMatches } from '@remix-run/react'
import { loader } from './root'

export const useEnv = () => {
  const matches = useMatches()
  const {ENV} = (matches.find((route) => {
    return route.id === 'root'
  })?.data || {}) as SerializeFrom<typeof loader>

  
  return ENV || {}
}