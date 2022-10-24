import React from 'react';
import ChevronLeft from '@/modules/common/icons/chevronLeft';
import CheckoutFooter from '../../checkoutFooter';
import { useAppSelector } from 'store/hooks/index';
import useTranslation from 'next-translate/useTranslation';
import ButtonType1 from '@/modules/common/buttons/buttonType1';
import TextButton from '@/modules/common/buttons/textButton';
import IconButton from '@/modules/common/buttons/iconButton';

interface Props {
  setModal: Function;
}

const Shipping: React.FC<Props> = (props: Props) => {
  const shippingInfo = useAppSelector(
    (state) => state.persistedReducer.checkout.shippingInfo
  );
  const { t } = useTranslation();

  const { setModal } = props;

  return (
    <div className="w-full sm:w-full md:w-full lg:w-3/5 xl:w-3/5">
      <div className="m-0 px-3.5 md:mx-20 lg:mx-20 lg:my-12 xl:mx-20">
        <div className="mx-auto mt-5 box-border divide-y-2 rounded-md border-2 p-4 text-center">
          <div className="flex items-center justify-between p-4">
            <div className="flex flex-wrap gap-4">
              <p className="text-sm text-[#333333] dark:text-dark_text">
                {t('checkout:contact')}
              </p>
              <p className="text-sm">{shippingInfo?.phoneNumber}</p>
            </div>
            <button
              onClick={() => {
                const obj = {
                  info: true,
                  ship: false,
                  pay: false,
                };
                setModal(obj);
              }}
              className="ml-10 text-sm"
              style={{ border: 'none' }}
            >
              {t('checkout:change')}
            </button>
          </div>

          <div className="flex items-center justify-between p-4">
            <div className="flex flex-wrap gap-4">
              <p className="text-sm text-[#333333] dark:text-dark_text">
                {t('checkout:ship_to')}
              </p>
              <p className="text-sm">{shippingInfo?.addressLine1}</p>
            </div>
            <button
              onClick={() => {
                const obj = {
                  info: true,
                  ship: false,
                  pay: false,
                };
                setModal(obj);
              }}
              className="ml-10 text-sm"
              style={{ border: 'none' }}
            >
              {t('checkout:change')}
            </button>
          </div>
        </div>

        <p className="pt-7 text-lg font-normal">
          {t('checkout:shipping_method')}
        </p>

        <div className="my-3 box-border flex cursor-pointer flex-wrap justify-between rounded-md border-2 p-5 text-sm text-[#333333] hover:bg-white dark:text-dark_text dark:hover:text-black">
          <p>{t('checkout:standard')}</p>
          <p className="ml-5 font-medium">{t('checkout:free')}</p>
        </div>

        <div className="mt-5 lg:flex">
          <div>
            <ButtonType1
              type="submit"
              onClickFunction={() => {
                setModal({
                  info: false,
                  ship: false,
                  pay: true,
                });
              }}
              className="mt-4 rounded sm:w-full md:w-48"
              text={t('checkout:continue_to_payment')}
            />
          </div>
          <div className="mt-4 mb-5 flex flex-wrap justify-center lg:ml-6">
            <IconButton
              onClickFunction={() => {
                const obj = {
                  info: true,
                  ship: false,
                  pay: false,
                };
                setModal(obj);
              }}
              icon={<ChevronLeft />}
              className="md:hidden"
            />
            <TextButton
              onClickFunction={() => {
                const obj = {
                  info: true,
                  ship: false,
                  pay: false,
                };
                setModal(obj);
              }}
              text={t('checkout:return_to_information')}
              className="mt-0 md:mt-2"
            />
          </div>
        </div>
      </div>
      <div className="mx-6 sm:mx-10 lg:mx-24">
        <hr className="mt-2" />
        <CheckoutFooter />
      </div>
    </div>
  );
};

export default Shipping;
