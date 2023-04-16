import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
//
import couponSchema, { Coupon } from '@src/yup/couponSchema';
import BigBlocks from '@src/shared/form/BigBlocks';
import Block from '@src/shared/form/Block';
import SmallBlocks from '@src/shared/form/SmallBlocks';
import SubmitBtn from '@src/shared/form/SubmitBtn';
import Input from '@src/shared/inputs/Input';
import Select from '@src/shared/inputs/Select';
import Checkbox from '@src/shared/inputs/Checkbox';
import generateCouponCode from '@src/utils/generateCouponCode';
import DateRangeInput from '@src/shared/inputs/DateRangeInput';
import CouponSummary from '@src/components/coupons/CouponSummary';

function Create(): JSX.Element {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<Coupon>({
    resolver: yupResolver(couponSchema),
  });

  const onSubmit = (data: Coupon) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex gap-x-5 gap-y-5 justify-center my-8 px-6 flex-wrap"
    >
      <BigBlocks>
        <Block>
          <Input
            register={register}
            errors={errors}
            fieldName="couponCode"
            labelTheme="light"
            placeholder="OFF10"
            label="Coupon code:"
            required={true}
          >
            <button
              type="button"
              className="bg-zinc-600 text-white px-4 rounded-md"
              onClick={() => {
                setValue('couponCode', generateCouponCode(10));
                clearErrors('couponCode');
              }}
            >
              Generate
            </button>
          </Input>
          <div className="flex gap-x-4 py-2">
            <Input
              register={register}
              errors={errors}
              fieldName="discountAmount"
              labelTheme="light"
              placeholder="99"
              label="Discount amount:"
              type="number"
              required={true}
              defaultValue="0"
            />
            <Select
              errors={errors}
              register={register}
              fieldName="discountUnit"
              labelTheme="light"
              options={[
                { name: 'By percentage (%)', value: '%' },
                { name: 'Discount amount ($)', value: '$' },
              ]}
              label="Discount unit:"
              required={true}
            />
          </div>

          <Input
            register={register}
            errors={errors}
            fieldName="couponQuantity"
            labelTheme="light"
            placeholder="999"
            label="Coupon quantity:"
            required={true}
            defaultValue="999"
          />
        </Block>
        <Block>
          <div className="flex gap-x-4">
            <Input
              register={register}
              errors={errors}
              fieldName="minimumOrder"
              labelTheme="light"
              placeholder="100"
              label="Minimum order:"
            />
            <Input
              register={register}
              errors={errors}
              fieldName="maximumOrder"
              labelTheme="light"
              placeholder="999"
              label="Maximum order:"
            />
          </div>
          <Checkbox
            fieldName="isFreeshipping"
            register={register}
            value="true"
            label="Free shipping"
            errors={errors}
          />
          <Select
            errors={errors}
            register={register}
            fieldName="isFreeshipping"
            labelTheme="light"
            options={[
              { name: 'Freeship', value: 'true' },
              { name: 'Do not freeship', value: 'false' },
            ]}
            label="Free shipping?"
            defaultValue="false"
          />
        </Block>
        <Block>
          <DateRangeInput
            control={control}
            errors={errors}
            fieldName="discountTime"
            labelTheme="light"
            label="Discount duration:"
          />
        </Block>
      </BigBlocks>
      <SmallBlocks>
        <Block>
          <Select
            errors={errors}
            register={register}
            fieldName="status"
            labelTheme="bold"
            options={['draft', 'active']}
            label="Status"
          />
          <div className="flex justify-end mt-6">
            <SubmitBtn />
          </div>
        </Block>
        <Block>
          <CouponSummary getValues={getValues} />
        </Block>
      </SmallBlocks>
    </form>
  );
}

export default Create;
