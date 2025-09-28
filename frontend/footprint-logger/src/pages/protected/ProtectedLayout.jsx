import { Outlet } from 'react-router'

function ProtectedLayout() {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default ProtectedLayout
