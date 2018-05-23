export const MENU_ITEMS: Array<Object> = [
  {
    title: 'Form',
    //routerLink = undefined => won't redirect URL
    //# => routerLinkActive works as expected
    //link: '',
    children: [
      {
        title: 'Form1',
        link: 'form/form1'
      },
      {
        title: 'Form2',
        link: 'form/form2'
      }
    ]
  },
  {
    title: 'Table',
    //link: '',
    children: [
      {
        title: 'Table1',
        link: 'table/table1'
      },
      {
        title: 'Table2'
      }
    ]

  },
  {
    title: 'Tabs',
    link: 'tabs'
  },
  {
    title: 'Layout',
    link: 'layout'
  }
];
