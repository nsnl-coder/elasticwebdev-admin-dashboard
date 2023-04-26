import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
//
import shippingSchema, { IShipping } from '@src/yup/shippingSchema';
import BigBlocks from '@src/components/form/BigBlocks';
import Block from '@src/components/form/Block';
import SmallBlocks from '@src/components/form/SmallBlocks';
import SubmitBtn from '@src/components/form/SubmitBtn';
import Input from '@src/components/inputs/Input';
import Select from '@src/components/inputs/Select';
import UpdatePageWrapper from '@src/components/updatePage/UpdatePageWrapper';
import { useRouter } from 'next/router';
import queryConfig from '@src/react-query/queryConfig';
import useCreateOne from '@src/react-query/query/useCreateOne';
import useUpdateOne from '@src/react-query/query/useUpdateOne';
import useGetOne from '@src/react-query/query/useGetOne';
import UpdatePageHeader from '@src/components/updatePage/UpdatePageHeader';
import UpdatePageHeading from '@src/components/updatePage/UpdatePageHeading';

function Create(): JSX.Element {
  const id = useRouter().query.id;

  const { register, handleSubmit, control, reset } = useForm<IShipping>({
    resolver: yupResolver(shippingSchema),
  });

  const requestConfig = queryConfig.shippings;

  const { createOne: createShipping } = useCreateOne<IShipping>(requestConfig);
  const { updateOne: updateShipping, isUpdating } =
    useUpdateOne<IShipping>(requestConfig);
  const { data: shipping } = useGetOne<IShipping>(requestConfig, reset);

  const onSubmit = (data: IShipping) => {
    // already check if should create or update
    createShipping(data, id);
    updateShipping(data, id);
  };

  return (
    <UpdatePageWrapper control={control}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <UpdatePageHeader control={control} reset={reset} />
        <UpdatePageHeading
          id={shipping?._id}
          requestConfig={requestConfig}
          status={shipping?.status}
          title={shipping?.display_name || 'Add shipping method'}
        />
        <div className="mx-auto flex gap-x-5 justify-center mt-8">
          <BigBlocks>
            <Block>
              <Input
                register={register}
                control={control}
                fieldName="display_name"
                labelTheme="light"
                placeholder="Express shipping"
                label="Display name:"
                tooltip="this name will be displayed to user"
              />
              <Input
                register={register}
                control={control}
                fieldName="fees"
                labelTheme="light"
                placeholder="9.99"
                label="Fees:"
              />
              <Input
                register={register}
                control={control}
                fieldName="freeshipOrderOver"
                labelTheme="light"
                label="Freeship order over:"
                placeholder="199"
                tooltip="Leave empty if you not want freeship for all orders!"
              />
            </Block>
            <Block>
              <div className="flex gap-x-3">
                <Input
                  register={register}
                  control={control}
                  fieldName="delivery_min"
                  labelTheme="light"
                  placeholder="2"
                  label="Delivery Min:"
                />
                <Select
                  control={control}
                  register={register}
                  fieldName="delivery_min_unit"
                  labelTheme="light"
                  options={['hour', 'day', 'business_day', 'week', 'month']}
                  label="unit"
                />
              </div>
              <div className="flex gap-x-3">
                <Input
                  register={register}
                  control={control}
                  fieldName="delivery_max"
                  labelTheme="light"
                  placeholder="6"
                  label="Delivery max:"
                />
                <Select
                  control={control}
                  register={register}
                  fieldName="delivery_max_unit"
                  labelTheme="light"
                  options={['hour', 'day', 'business_day', 'week', 'month']}
                  label="unit"
                />
              </div>
            </Block>
          </BigBlocks>
          <SmallBlocks>
            <Block>
              <Select
                control={control}
                register={register}
                fieldName="status"
                labelTheme="bold"
                options={['draft', 'active']}
                label="status"
              />
              <div className="flex justify-end mt-4">
                <SubmitBtn isUpdating={isUpdating} />
              </div>
            </Block>
          </SmallBlocks>
        </div>
      </form>
    </UpdatePageWrapper>
  );
}

export default Create;
