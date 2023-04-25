import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
//
import couponSchema, { ICoupon } from '@src/yup/couponSchema';
import BigBlocks from '@src/components/form/BigBlocks';
import Block from '@src/components/form/Block';
import SmallBlocks from '@src/components/form/SmallBlocks';
import SubmitBtn from '@src/components/form/SubmitBtn';
import Input from '@src/components/inputs/Input';
import Select from '@src/components/inputs/Select';
import getRandomString from '@src/utils/getRandomString';
import DateRangeInput from '@src/components/inputs/date/DateRangeInput';
import CouponSummary from '@src/_pages/coupons/CouponSummary';
import UpdatePageWrapper from '@src/components/updatePage/UpdatePageWrapper';
import UpdatePageHeader from '@src/components/updatePage/UpdatePageHeader';
import UpdatePageHeading from '@src/components/updatePage/UpdatePageHeading';
import useCreateOne from '@src/react-query/query/useCreateOne';
import useUpdateOne from '@src/react-query/query/useUpdateOne';
import useGetOne from '@src/react-query/query/useGetOne';
import queryConfig from '@src/react-query/queryConfig';
import { useRouter } from 'next/router';

function Create(): JSX.Element {
  const id = useRouter().query.id;
  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    clearErrors,
    reset,
    formState: { errors, isDirty },
  } = useForm<ICoupon>({
    resolver: yupResolver(couponSchema),
  });
  const requestConfig = queryConfig.coupons;

  const { createOne: createCoupon } = useCreateOne<ICoupon>(requestConfig);
  const { updateOne: updateCoupon, isUpdating } =
    useUpdateOne<ICoupon>(requestConfig);
  const { data: coupon } = useGetOne<ICoupon>(requestConfig, reset);

  const onSubmit = (data: ICoupon) => {
    // already check if should create or update
    createCoupon(data, id);
    updateCoupon(data, id);
  };

  return (
    <UpdatePageWrapper isDirty={isDirty}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <UpdatePageHeader isDirty={isDirty} reset={reset} />
        <UpdatePageHeading
          id={coupon?._id}
          requestConfig={requestConfig}
          status={coupon?.status}
          title={coupon?.couponCode || 'Add coupon'}
        />
        <div className="mx-auto flex gap-x-5 justify-center mt-8">
          <BigBlocks>
            <Block>
              <Input
                register={register}
                errors={errors}
                fieldName="name"
                labelTheme="light"
                placeholder="flash sale..."
                label="Name:"
                required={true}
              />
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
                    setValue('couponCode', getRandomString(10));
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
                  required={true}
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
                startDateFieldName="startDate"
                endDateFieldName="endDate"
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
                <SubmitBtn isUpdating={isUpdating} />
              </div>
            </Block>
            <Block>
              <CouponSummary getValues={getValues} />
            </Block>
          </SmallBlocks>
        </div>
      </form>
    </UpdatePageWrapper>
  );
}

export default Create;
