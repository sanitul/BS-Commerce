import { NextComponentType } from 'next';
import useTranslation from 'next-translate/useTranslation';

const ShopNowIcon: NextComponentType = () => {
  const { t } = useTranslation();
  return (
    <>
      <p className="row text-extrabold text-1xl flex flex uppercase">
        {t('home:shop_now')}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 20 20"
          fill="green"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
            clipRule="evenodd"
          />
        </svg>
      </p>
    </>
  );
};

export default ShopNowIcon;
