export const AsideMenuAdminGeneral = {
    items: [
      {
        title: 'Dashboard',
        root: true,
        name: "dashboard",
        icon: 'flaticon2-architecture-and-city',
        svg: './assets/media/svg/icons/Design/Layers.svg',
        page: '/dashboard',
        translate: 'MENU.DASHBOARD',
        bullet: 'dot',
      },
      { section: 'Usuario' },
      {
        title: 'Usuarios',
        root: true,
        name: "users",
        bullet: 'dot',
        icon: 'flaticon2-user-outline-symbol',
        svg: './assets/media/svg/icons/General/User.svg',
        page: '/users',
        submenu: [
          {
            title: 'Gestión Usuarios',
            page: '/users/list'
          }
        ]
      },
      { section: 'Productos' },
      {
        title: 'Categorias',
        root: true,
        name: "categorias",
        bullet: 'dot',
        icon: 'flaticon2-user-outline-symbol',
        svg: './assets/media/svg/icons/Shopping/Box3.svg',
        page: '/categories',
        submenu: [
          {
            title: 'Gestión Categorias',
            page: '/categories/list'
          }
        ]
      },
      {
        title: 'Productos',
        root: true,
        name: "Productos",
        bullet: 'dot',
        icon: 'flaticon2-user-outline-symbol',
        svg: './assets/media/svg/icons/Shopping/Bag2.svg',
        page: '/products',
        submenu: [
          {
            title: 'Gestión Productos',
            page: '/products/add-product'
          }
        ]
      },
    ]
}