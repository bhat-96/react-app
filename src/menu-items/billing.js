// assets
import { IconCurrencyDollar } from '@tabler/icons';

// constant
const icons = { IconCurrencyDollar };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const billing = {
  id: 'dashboard',
  title: 'Billing',
  type: 'group',
  children: [
    {
      id: 'billing',
      title: 'Billing',
      type: 'item',
      url: '/billing',
      icon: icons.IconCurrencyDollar,
      breadcrumbs: false
    }
  ]
};

export default billing;
