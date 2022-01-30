import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const UserMangementList = React.lazy(() => import('./views/app_user_mangement/userMangementList'))
const EvaluationList = React.lazy(() => import('./views/app_evaluation/evaluationList'))
const DepartmentList = React.lazy(() => import('./views/app_department/departmentList'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))

const routes = [
  { path: '/', exact: true, name: 'Home', component: Dashboard },
  { path: '/dashboard', name: 'dashboard', component: Dashboard },
  { path: '/use-mangement', name: 'UserMangement', component: UserMangementList },
  { path: '/evaluation', name: 'Evaluation', component: EvaluationList },
  { path: '/department', name: 'Department', component: DepartmentList },
  { path: '*', name: 'Page404', component: Page404 },
]

export default routes
