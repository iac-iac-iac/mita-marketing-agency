import ProxyForm from '../ProxyForm';
import { createProxyAction } from '../actions';

export default function AdminProxyNewPage() {
  return (
    <ProxyForm
      action={createProxyAction}
      title="Новый прокси"
      subtitle="HTTP-прокси для доступа к Telegram API"
    />
  );
}
