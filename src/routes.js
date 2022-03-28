import React from 'react'
import { roles } from './core/enums/roles'
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const UserMangementList = React.lazy(() => import('./views/app_user_mangement/userMangementList'))
const EvaluationList = React.lazy(() => import('./views/app_evaluation/evaluationList'))
const DepartmentList = React.lazy(() => import('./views/app_department/departmentList'))
const SubDepartmentList = React.lazy(() => import('./views/app_sub-department/subDepartmentList'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))

const routes = [
  {
    path: '/',
    exact: true,
    name: 'Home',
    component: Dashboard,
    roles: [roles.Admin, roles.Employee, roles.User],
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    roles: [roles.Admin, roles.Employee, roles.User],
  },
  {
    path: '/use-mangement',
    name: 'UserMangement',
    component: UserMangementList,
    roles: [roles.Admin],
  },
  {
    path: '/evaluation',
    name: 'Evaluation',
    component: EvaluationList,
    roles: [roles.Admin, roles.Employee],
  },
  { path: '/department', name: 'Department', component: DepartmentList, roles: [roles.Admin] },
  {
    path: '/sub-department',
    name: 'SubDepartment',
    component: SubDepartmentList,
    roles: [roles.Admin],
  },
  { path: '*', name: 'Page404', component: Page404, roles: [] },
]

export default routes
