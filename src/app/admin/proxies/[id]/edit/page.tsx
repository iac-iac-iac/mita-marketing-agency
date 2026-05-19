import { notFound } from 'next/navigation';
import { getProxyById } from '@/lib/cms/db-proxies';
import ProxyForm from '../../ProxyForm';
import { updateProxyAction } from '../../actions';

export default function AdminProxyEditPage({
  params,
}: {
  params: { id: string };
}) {
  const id = parseInt(params.id, 10);
  if (Number.isNaN(id)) notFound();

  const proxy = getProxyById(id);
  if (!proxy) notFound();

  const boundUpdate = updateProxyAction.bind(null, id);

  return (
    <ProxyForm
      action={boundUpdate}
      proxy={proxy}
      title="Редактирование прокси"
      subtitle={proxy.name}
    />
  );
}
