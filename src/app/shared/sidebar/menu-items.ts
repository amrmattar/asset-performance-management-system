import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    {
        path: '',
        title: 'Dashboards',
        icon: 'mdi mdi-av-timer',
        class: 'has-arrow',
        extralink: false,
        submenu: [
            {
                path: '/dashboard/dashboard1',
                title: 'Dashboard1',
                icon: 'mdi mdi-adjust',
                class: '',
                extralink: false,
                submenu: []
            },
            {
                path: '/dashboard/dashboard2',
                title: 'Dashboard2',
                icon: 'mdi mdi-adjust',
                class: '',
                extralink: false,
                submenu: []
            },
            {
                path: '/dashboard/dashboard3',
                title: 'Dashboard3',
                icon: 'mdi mdi-adjust',
                class: '',
                extralink: false,
                submenu: []
            },
            {
                path: '/dashboard/dashboard4',
                title: 'Dashboard4',
                icon: 'mdi mdi-adjust',
                class: '',
                extralink: false,
                submenu: []
            },
            {
                path: '/dashboard/dashboard5',
                title: 'Dashboard5',
                icon: 'mdi mdi-adjust',
                class: '',
                extralink: false,
                submenu: []
            },
            {
                path: '/dashboard/dashboard6',
                title: 'Dashboard6',
                icon: 'mdi mdi-adjust',
                class: '',
                extralink: false,
                submenu: []
            }
        ]
    },
    {
        path: '',
        title: '',
        icon: '',
        class: 'nav-small-cap',
        extralink: true,
        submenu: []
    },
{
        path: '/apps/email',
        title: 'Email',
        icon: 'mdi mdi-email',
        class: '',
        extralink: false,
        submenu: []
    },
    {
        path: '/apps/chat',
        title: 'Chat',
        icon: 'mdi mdi-comment-processing-outline',
        class: '',
        extralink: false,
        submenu: []
    },
    {
        path: '/apps/todo',
        title: 'Todo',
        icon: 'mdi mdi-clipboard-text',
        class: '',
        extralink: false,
        submenu: []
    },
    {
        path: '/apps/notes',
        title: 'Notes',
        icon: 'mdi mdi-arrange-bring-forward',
        class: '',
        extralink: false,
        submenu: []
    },
    {
        path: '/apps/users',
        title: 'Users',
        icon: 'mdi mdi-account-multiple',
        class: '',
        extralink: false,
        submenu: []
    },
    {
        path: '/apps/fullcalendar',
        title: 'Calendar',
        icon: 'mdi mdi-calendar',
        class: '',
        extralink: false,
        submenu: []
    },
    {
        path: '/apps/taskboard',
        title: 'Taskboard',
        icon: 'mdi mdi-bulletin-board',
        class: '',
        extralink: false,
        submenu: []
    },
    {
        path: '/apps/contact',
        title: 'Contact',
        icon: 'mdi mdi-account-box',
        class: '',
        extralink: false,
        submenu: []
    },
    {
        path: '/apps/contact-grid',
        title: 'Contact Grid',
        icon: 'mdi mdi-phone',
        class: '',
        extralink: false,
        submenu: []
    },
    {
        path: '',
        title: '',
        icon: '',
        class: 'nav-small-cap',
        extralink: true,
        submenu: []
    },
    // {
    //     path: '',
    //     title: 'UI Elements',
    //     icon: 'mdi mdi-format-color-fill',
    //     class: 'has-arrow',
    //     extralink: false,
    //     submenu: [
    //         {
    //             path: '/component/accordion',
    //             title: 'Accordion',
    //             icon: 'mdi mdi-equal',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/component/alert',
    //             title: 'Alert',
    //             icon: 'mdi mdi-message-bulleted',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/component/carousel',
    //             title: 'Carousel',
    //             icon: 'mdi mdi-view-carousel',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/component/dropdown',
    //             title: 'Dropdown',
    //             icon: 'mdi mdi-arrange-bring-to-front',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/component/modal',
    //             title: 'Modal',
    //             icon: 'mdi mdi-tablet',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/component/pagination',
    //             title: 'Pagination',
    //             icon: 'mdi mdi-backburger',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/component/poptool',
    //             title: 'Popover & Tooltip',
    //             icon: 'mdi mdi-image-filter-vintage',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/component/progressbar',
    //             title: 'Progressbar',
    //             icon: 'mdi mdi-poll',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/component/rating',
    //             title: 'Ratings',
    //             icon: 'mdi mdi-bandcamp',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/component/tabs',
    //             title: 'Tabs',
    //             icon: 'mdi mdi-sort-variant',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/component/timepicker',
    //             title: 'Timepicker',
    //             icon: 'mdi mdi-calendar-clock',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/component/buttons',
    //             title: 'Button',
    //             icon: 'mdi mdi-toggle-switch',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         { path: '/component/notifier', title: 'Notifier', icon: 'mdi mdi-bandcamp', class: '', extralink: false, submenu: [] }
    //     ]
    // },
    // {
    //     path: '',
    //     title: 'Cards',
    //     icon: 'mdi mdi-credit-card-multiple',
    //     class: 'has-arrow',
    //     extralink: false,
    //     submenu: [
    //         {
    //             path: '/cards/basiccards',
    //             title: 'Basic Cards',
    //             icon: 'mdi mdi-layers',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/cards/customcards',
    //             title: 'Custom Cards',
    //             icon: 'mdi mdi-credit-card-scan',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/cards/weathercards',
    //             title: 'Weather Cards',
    //             icon: 'mdi mdi-weather-fog',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         }
    //     ]
    // },
    // {
    //     path: '',
    //     title: 'Extra Components',
    //     icon: 'mdi mdi-credit-card-multiple',
    //     class: 'has-arrow',
    //     extralink: false,
    //     submenu: [
    //         {
    //             path: '/extra-component/toastr',
    //             title: 'Toastr',
    //             icon: 'mdi mdi-poll',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/extra-component/editor',
    //             title: 'Editor',
    //             icon: 'mdi mdi-dns',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/extra-component/dragndrop',
    //             title: 'Drag n Drop',
    //             icon: 'mdi mdi-arrow-expand-all',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         }
    //     ]
    // },
    // {
    //     path: '',
    //     title: 'Widgets',
    //     icon: 'mdi mdi-settings',
    //     class: 'has-arrow',
    //     extralink: false,
    //     submenu: [
    //         {
    //             path: '/widgets/apps',
    //             title: 'Widget Apps',
    //             icon: 'mdi mdi-comment-processing-outline',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/widgets/data',
    //             title: 'Widget Data',
    //             icon: 'mdi mdi-calendar',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         }
    //     ]
    // },
    // {
    //     path: '',
    //     title: '',
    //     icon: '',
    //     class: 'nav-small-cap',
    //     extralink: true,
    //     submenu: []
    // },
    // {
    //     path: '',
    //     title: 'Form Elements',
    //     icon: 'mdi mdi-clipboard-text',
    //     class: 'has-arrow',
    //     extralink: false,
    //     submenu: [
    //         {
    //             path: '/forms/forminputs',
    //             title: 'Form Inputs',
    //             icon: 'mdi mdi-priority-low',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/forms/inputgroups',
    //             title: 'Input Groups',
    //             icon: 'mdi mdi-rounded-corner',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/forms/inputgrid',
    //             title: 'Input Grid',
    //             icon: 'mdi mdi-select-all',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/forms/checkboxandradio',
    //             title: 'Checkbox & Radio',
    //             icon: 'mdi mdi-shape-plus',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/forms/multiselect',
    //             title: 'Multiselect',
    //             icon: 'mdi mdi-select-inverse',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         }
    //     ]
    // },
    // {
    //     path: '',
    //     title: 'Form Layouts',
    //     icon: 'mdi mdi-receipt',
    //     class: 'has-arrow',
    //     extralink: false,
    //     submenu: [
    //         {
    //             path: '/forms/formbasic',
    //             title: 'Basic Forms',
    //             icon: 'mdi mdi-vector-difference-ba',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/forms/formhorizontal',
    //             title: 'Horizontal Forms',
    //             icon: 'mdi mdi-file-document-box',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/forms/formactions',
    //             title: 'Form Actions',
    //             icon: 'mdi mdi-code-greater-than',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/forms/formrowseparator',
    //             title: 'Row Separator',
    //             icon: 'mdi mdi-code-equal',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/forms/formstripedrows',
    //             title: 'Striped Rows',
    //             icon: 'mdi mdi-content-duplicate',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/forms/formdetail',
    //             title: 'Detail Forms',
    //             icon: 'mdi mdi-cards-outline',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         }
    //     ]
    // },
    // {
    //     path: '',
    //     title: 'Form Addons',
    //     icon: 'mdi mdi-code-equal',
    //     class: 'has-arrow',
    //     extralink: false,
    //     submenu: [
    //         {
    //             path: '/forms/formvalidation',
    //             title: 'Form Validation',
    //             icon: 'mdi mdi-alert-box',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/component/typehead',
    //             title: 'Form Typehead',
    //             icon: 'mdi mdi-backburger',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/component/datepicker',
    //             title: 'Datepicker',
    //             icon: 'mdi mdi-calendar-check',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/component/language-datepicker',
    //             title: 'Language Datepicker',
    //             icon: 'mdi mdi-calendar-check',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/forms/ngx',
    //             title: 'Form Wizard / Steps',
    //             icon: 'mdi mdi-attachment',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         }
    //     ]
    // },
    // {
    //     path: '',
    //     title: '',
    //     icon: '',
    //     class: 'nav-small-cap',
    //     extralink: true,
    //     submenu: []
    // },
    // {
    //     path: '',
    //     title: 'Bootstrap Tables',
    //     icon: 'mdi mdi-table',
    //     class: 'has-arrow',
    //     extralink: false,
    //     submenu: [
    //         {
    //             path: '/tables/basictables',
    //             title: 'Basic Tables',
    //             icon: 'mdi mdi-border-all',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/tables/darktables',
    //             title: 'Dark Basic Tables',
    //             icon: 'mdi mdi-border-all',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/tables/colortables',
    //             title: 'Colored Tables',
    //             icon: 'mdi mdi-border-all',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/tables/tablesizing',
    //             title: 'Table Sizing',
    //             icon: 'mdi mdi-border-all',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         }
    //     ]
    // },
    // {
    //     path: '/tables/datatable',
    //     title: 'Data Tables',
    //     icon: 'mdi mdi-border-vertical',
    //     class: '',
    //     extralink: false,
    //     submenu: []
    // },
    // {
	// 	path: '/tables/ngtable',
	// 	title: 'Ng Tables',
	// 	icon: 'mdi mdi-table-row-height',
	// 	class: '',
	// 	extralink: false,
	// 	submenu: []
	// },
    // {
    //     path: '',
    //     title: '',
    //     icon: '',
    //     class: 'nav-small-cap',
    //     extralink: true,
    //     submenu: []
    // },
    // {
    //     path: '',
    //     title: 'Charts',
    //     icon: 'mdi mdi-chart-bar',
    //     class: 'has-arrow',
    //     extralink: false,
    //     submenu: [
    //         {
    //             path: '/charts/chartjs',
    //             title: 'Chart Js',
    //             icon: 'mdi mdi-svg',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/charts/chartistjs',
    //             title: 'Chartist Js',
    //             icon: 'mdi mdi-blur',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/charts/ngxchart',
    //             title: 'Ngx Charts',
    //             icon: 'mdi mdi-blur',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         }
    //     ]
    // },
    // {
    //     path: '',
    //     title: '',
    //     icon: '',
    //     class: 'nav-small-cap',
    //     extralink: true,
    //     submenu: []
    // },
    // {
    //     path: '/maps/google',
    //     title: 'Google Maps',
    //     icon: 'mdi mdi-google-maps',
    //     class: '',
    //     extralink: false,
    //     submenu: []
    // },
    // {
    //     path: '',
    //     title: '',
    //     icon: '',
    //     class: 'nav-small-cap',
    //     extralink: true,
    //     submenu: []
    // },
    // {
    //     path: '',
    //     title: 'Ecommerce Pages',
    //     icon: 'mdi mdi-cart-outline',
    //     class: 'has-arrow',
    //     extralink: false,
    //     submenu: [
    //         {
    //             path: '/ecom/products',
    //             title: 'Products',
    //             icon: 'mdi mdi-cards-variant',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/ecom/cart',
    //             title: 'Cart',
    //             icon: 'mdi mdi-cart',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/ecom/edit',
    //             title: 'Edit Products',
    //             icon: 'mdi mdi-cart-plus',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/ecom/details',
    //             title: 'Product Details',
    //             icon: 'mdi mdi-camera-burst',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/ecom/orders',
    //             title: 'Orders',
    //             icon: 'mdi mdi-chart-pie',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/ecom/checkout',
    //             title: 'Checkout',
    //             icon: 'mdi mdi-clipboard-check',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         }
    //     ]
    // },
    // {
    //     path: '',
    //     title: 'Authentication',
    //     icon: 'mdi mdi-account-circle',
    //     class: 'has-arrow',
    //     extralink: false,
    //     submenu: [
    //         {
    //             path: '/authentication/login',
    //             title: 'Login',
    //             icon: 'mdi mdi-account-key',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/authentication/login2',
    //             title: 'Login 2',
    //             icon: 'mdi mdi-account-key',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/authentication/signup',
    //             title: 'Register',
    //             icon: 'mdi mdi-account-plus',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/authentication/signup2',
    //             title: 'Register 2',
    //             icon: 'mdi mdi-account-plus',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/authentication/404',
    //             title: '404',
    //             icon: 'mdi mdi-alert-outline',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/authentication/lock',
    //             title: 'Lockscreen',
    //             icon: 'mdi mdi-account-off',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         }
    //     ]
    // },
    // {
    //     path: '',
    //     title: 'Sample Pages',
    //     icon: 'mdi mdi-content-copy',
    //     class: 'has-arrow',
    //     extralink: false,
    //     submenu: [
    //         {
    //             path: '/sample-pages/profile',
    //             title: 'Profile',
    //             icon: 'mdi mdi-account-network',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/sample-pages/pricing',
    //             title: 'Pricing',
    //             icon: 'mdi mdi-file-export',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/sample-pages/invoice',
    //             title: 'Invoice',
    //             icon: 'mdi mdi-ungroup',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/sample-pages/helperclasses',
    //             title: 'Helper Classes',
    //             icon: 'mdi mdi-tune',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/starter',
    //             title: 'Starter Page',
    //             icon: 'mdi mdi-crop-free',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         }
    //     ]
    // },
    // {
    //     path: '',
    //     title: 'Timeline',
    //     icon: 'mdi mdi-apple-safari',
    //     class: 'has-arrow',
    //     extralink: false,
    //     submenu: [
    //         {
    //             path: '/timeline/left',
    //             title: 'Left Timeline',
    //             icon: 'mdi mdi-clock-fast',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/timeline/right',
    //             title: 'Right Timeline',
    //             icon: 'mdi mdi-clock-end',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/timeline/center',
    //             title: 'Center Timeline',
    //             icon: 'mdi mdi-clock-in',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         }
    //     ]
    // },
    // {
    //     path: '',
    //     title: 'Icons',
    //     icon: 'mdi mdi-face',
    //     class: 'has-arrow',
    //     extralink: false,
    //     submenu: [
    //         {
    //             path: '/icons/fontawesome',
    //             title: 'Fontawesome',
    //             icon: 'mdi mdi-emoticon-cool',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/icons/simpleline',
    //             title: 'Simple Line Icons',
    //             icon: 'mdi mdi mdi-image-broken-variant',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/icons/material',
    //             title: 'Material Icons',
    //             icon: 'mdi mdi-emoticon',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         }
    //     ]
    // },
    // {
    //     path: '',
    //     title: 'Menu Levels',
    //     icon: 'mdi mdi-notification-clear-all',
    //     class: 'has-arrow',
    //     extralink: false,
    //     submenu: [
    //         {
    //             path: '',
    //             title: 'Second Level',
    //             icon: 'mdi mdi-octagram',
    //             class: '',
    //             extralink: true,
    //             submenu: []
    //         },
    //         {
    //             path: '',
    //             title: 'Second Child',
    //             icon: 'mdi mdi-octagram',
    //             class: 'has-arrow',
    //             extralink: false,
    //             submenu: [
    //                 {
    //                     path: '',
    //                     title: 'Third 1.1',
    //                     icon: 'mdi mdi-playlist-plus',
    //                     class: '',
    //                     extralink: false,
    //                     submenu: []
    //                 },
    //                 {
    //                     path: '',
    //                     title: 'Third 1.2',
    //                     icon: 'mdi mdi-playlist-plus',
    //                     class: '',
    //                     extralink: false,
    //                     submenu: []
    //                 }
    //             ]
    //         }
    //     ]
    // }
];
