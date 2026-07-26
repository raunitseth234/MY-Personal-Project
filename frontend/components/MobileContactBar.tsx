import { Facebook, Instagram, Phone } from 'lucide-react';
import { brand } from '@/lib/data';
import WhatsAppIcon from './ui/WhatsAppIcon';

const items = [
  {
    label: 'WhatsApp',
    href: `https://wa.me/91${brand.phone.replace(/\D/g, '').slice(-10)}`,
    icon: <WhatsAppIcon className="h-5 w-5" />,
  },
  {
    label: 'Instagram',
    href: '#',
    icon: <Instagram className="h-5 w-5" />,
  },
  {
    label: 'Facebook',
    href: '#',
    icon: <Facebook className="h-5 w-5" />,
  },
  {
    label: 'Call',
    href: `tel:${brand.phone.replace(/\s/g, '')}`,
    icon: <Phone className="h-5 w-5" />,
  },
];

export default function MobileContactBar() {
  return (
    <nav
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-4 border-t border-neutral-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
    >
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="flex flex-col items-center gap-1 py-2.5 text-maroon transition duration-200 hover:bg-ivory active:scale-95"
        >
          {item.icon}
          <span className="text-[9px] font-medium uppercase tracking-wider text-neutral-500">
            {item.label}
          </span>
        </a>
      ))}
    </nav>
  );
}
