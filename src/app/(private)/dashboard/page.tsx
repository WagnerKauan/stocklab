import { TitleSection } from '@/components/ui/titleSection';
import { CardDashboard } from './_components/cardDashboard';
import { FiAlertCircle, FiBox } from 'react-icons/fi';
import { CardMain } from '@/components/layout/cardMain';
import { StockIcon } from '@/components/icons/stockIcon';
import { productRepository } from '@/repository/product';
import { MINIMUM_STOCK_VARIANTS } from '@/settings/variablesGlobal';
import { ListProductLowStock } from './_components/listProductLowStock';

export default async function Dashboard() {

  const totalProducts = await productRepository.findAll();
  const productsWithLowStock = totalProducts.filter(product => {
    return product.variants.some(variant => variant.stock <= MINIMUM_STOCK_VARIANTS);
  });

  const totalInStock = totalProducts.reduce((total, product) => {
    const stock = product.variants.reduce(
      (variantTotal, variant) => variantTotal + variant.stock,
      0,
    );
    return total + stock;
  }, 0);

  const variationsInLowStock = productsWithLowStock.reduce((total, product) => {
    const lowStockVariants = product.variants.filter(variant => variant.stock <= MINIMUM_STOCK_VARIANTS);
    return total + lowStockVariants.length;
  }, 0);


  return (
    <>
      <div className=" grid grid-cols-3 gap-6">
        <CardDashboard
          title="Produtos"
          value={totalProducts.length.toString()}
          icon={<FiBox size={24} color="#FFF" />}
          bgColor="bg-primary-normal"
        />
        <CardDashboard
          title="Em estoque"
          value={totalInStock.toString()}
          icon={<StockIcon color="#FFF" />}
          bgColor="bg-secondary-dark"
        />
        <CardDashboard
          title="Variações em alerta"
          value={variationsInLowStock.toString()}
          icon={<FiAlertCircle size={24} color="#FFF" />}
          bgColor="bg-warning"
        />
      </div>

      <CardMain>
        <div className="flex flex-col gap-8 h-full">
          <div>
            <TitleSection
              typeTitle="warning"
              title="Alerta de estoque baixo"
              paragrafo="Variações de produtos que precisam de reposição urgente"
              icon={<FiBox size={32} color="#FFF" />}
            />
          </div>

          
            
          

              <ListProductLowStock products={productsWithLowStock} />
        </div>
      </CardMain>
    </>
  );
}
