import { ProductData, ProductVariant } from '@/models/product/product-model';
import { ProductCategory } from '@/models/product/product-model';

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

const sanitizers = {
  DB: {
    color: (v: string) => v.trim().replace(/\s+/g,' ').toLowerCase(),
    size: (v: string) => v.trim().replace(/\s+/g,' ').toLowerCase(),
    name: (v: string) => v.trim().replace(/\s+/g,' ').toLowerCase(),
    category: (v: string) => v.trim().replace(/\s+/g,' ').toLowerCase(),
    typeProduct: (v: string) => v.trim().replace(/\s+/g,' ').toLowerCase(),
  },

  FRONT: {
    color: (v: string) => { 
      if (!v) return v;
      let textFormat = v
      .trim()
        .replace(/\s+/g, ' ')
        .split(' ')
        .map(word => capitalize(word))
        .join(' ');

      v = textFormat

      return v;
    },
    size: (v: string) => {
      if (!v) return v;
      if (v.length <= 3) {
        v = v.trim().toUpperCase();
      } else {
        let textFormat = capitalize(v);
        v = textFormat.trim();
      }

      return v;
    },
    name: (v: string) => {
      let textFormat = v
        .trim()
        .replace(/\s+/g,' ') 
        .split(' ')
        .map(word => {
          if (word.length > 3) {
            return capitalize(word);
          }
          return word;
        })
        .join(' ');

      v = textFormat.trim();

      return v;
    },

    category: (v: string) => {
      v.trim()
      let textFormat = capitalize(v);
      v = textFormat
      if(textFormat === 'Calcados') v = 'Calçados';
      if(textFormat === 'Acessorios') v = 'Acessórios';

      console.log(v)
      return v;
    },

    typeProduct: (v: string) => {
      let textFormat = v
        .trim()
        .replace(/\s+/g,' ')
        .split(' ')
        .map(word => {
          if (word.length > 3) {
            return capitalize(word);
          }
          return word;
        })
        .join(' ');

      v = textFormat.trim();

      return v;
    },
  },
};

export function sanitizeProduct(
  product: ProductData,
  type: 'DB' | 'FRONT',
): ProductData {
  const { variants, ...productData } = product;

  const sanitizedProduct = {
    ...productData,
    name: sanitizers[type].name(productData.name),
    category: sanitizers[type].category(
      productData.category,
    ) as ProductCategory,
    typeProduct: sanitizers[type].typeProduct(productData.typeProduct),
  };

  const sanitizedVariants = variants.map((variant: ProductVariant) => {
    return {
      ...variant,
      color: sanitizers[type].color(variant.color || ''),
      size: sanitizers[type].size(variant.size || ''),
    };
  });

  return {
    ...sanitizedProduct,
    variants: sanitizedVariants,
  };
}
