import categories from 'assets/categories'
import LayoutShowcase from 'layouts/default'

const routes = [
  {
    path: '/login',
    component: () => import('pages/login')
  }
]

function lazyLoad (path, meta) {
  return {
    path,
    meta,
    component: () => import('pages/holic/' + path)
  }
}

const holic = {
  path: '/holic',
  component: LayoutShowcase,
  meta: { auth: true },
  children: [
    {
      path: '',
      meta: {
        title: 'Mimzy',
        hash: '/holic',
        icon: 'layers',
        backRoute: '/'
      },
      component: () => import('pages/holic/index')
    }
  ]
}

categories.forEach(category => {
  if (category.extract) {
    return
  }
  category.features.forEach(feature => {
    let path = category.hash + '/' + feature.hash

    if (!feature.order) {
      holic.children.push(lazyLoad(path, feature))
      return
    }

    feature.order.forEach(tab => {
      let subpath = path + '/' + tab.hash
      holic.children.push(lazyLoad(subpath, {
        title: tab.title,
        hash: '/' + path,
        iframeTabs: feature.iframeTabs,
        icon: feature.icon,
        order: feature.order
      }))
    })

    routes.push({
      path: '/holic/' + path,
      redirect: '/holic/' + path + '/' + feature.order[0].hash
    })
  })
})

routes.push(holic)
routes.push({
  path: '/',
  component: LayoutShowcase,
  meta: { auth: true },
  children: [
    {path: '', component: () => import('pages/holic/index')},
    {path: 'dashboard', component: () => import('pages/holic/index')},
    {path: 'account', component: () => import('pages/holic/account')}
  ]
})
routes.push({ path: '*', component: () => import('pages/404.vue') })

export default routes
