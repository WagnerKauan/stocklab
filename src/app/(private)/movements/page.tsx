'use server';

import { redirect } from 'next/navigation';
import { CardDashboard } from '../dashboard/_components/cardDashboard';
import { getCurrentUser } from '@/lib/auth/get-current-user';
import { findAllMovements } from '@/lib/queries/movements';
import { IconEntriesStock } from '@/components/icons/iconEntriesStock';
import { IconExitStock } from '@/components/icons/iconExitStock';
import { CardMain } from '@/components/layout/cardMain';
import { TitleSection } from '@/components/ui/titleSection';
import { ListMovements } from './_components/listMoviments';
import { sanitizeProduct } from '@/utils/sanitazeProduct';
import { MovementModel } from '@/models/movements/movements-model';
import { HiArrowsRightLeft } from "react-icons/hi2";
import { FiPlus } from 'react-icons/fi';
import { ModalNewMovement } from './_components/modalNewMovement';


export default async function Movements() {
  const user = await getCurrentUser();

  if (!user) return redirect('/login');

  const movements = await findAllMovements({ userId: user.id });

  const totalMovements = movements.length;

  const totalEntries = movements.filter(
    movement => movement.type === 'IN',
  ).length;
  const totalExits = movements.filter(
    movement => movement.type === 'OUT',
  ).length;

  const sanitizedMovements = movements.length > 0 ? movements.map(movement => {
    const data = {
      ...movement.product,
      variants: [movement.variant],
    };

    const { variants, ...product } = sanitizeProduct(data, 'FRONT');

    return {
      ...movement,
      product: product,
      variant: variants[0],
    };
  }) as MovementModel[] : [];

  return (
    <div className="flex flex-col gap-6 flex-1">
      <div className=" grid grid-cols-3 gap-6">
        <CardDashboard
          title="Movimentações"
          value={totalMovements.toString()}
          icon={<HiArrowsRightLeft size={24} color="#FFF" />}
          bgColor="bg-primary-normal"
        />
        <CardDashboard
          title="Entradas"
          value={totalEntries.toString()}
          icon={<IconEntriesStock size={24} color="#FFF" />}
          bgColor="bg-secondary-dark"
        />
        <CardDashboard
          title="Saídas"
          value={totalExits.toString()}
          icon={<IconExitStock size={24} color="#FFF" />}
          bgColor="bg-error"
        />
      </div>

      <CardMain>
        <div className="flex flex-col gap-8 h-full">
          <div className='flex items-center justify-between '>
            <TitleSection
              title="Movimentações Recentes"
              paragrafo="Veja as movimentações mais recentes do seu estoque."
              typeTitle="info"
              icon={<HiArrowsRightLeft size={32} color="#FFF" />}
            />

            <ModalNewMovement />
          </div>

          <ListMovements movements={sanitizedMovements} />
        </div>
      </CardMain>
    </div>
  );
}
