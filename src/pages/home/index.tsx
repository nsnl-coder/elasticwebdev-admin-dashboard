import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import CarouselsInput from '@src/_pages/homes/CarouselsInput';
import homeSchema, { IHome } from '@src/yup/homeSchema';
import { IProduct } from '@src/yup/productSchema';

import useCreateOne from '@react-query/query/useCreateOne';
import useGetOne from '@react-query/query/useGetOne';
import useGetOnes from '@react-query/query/useGetOnes';
import useUpdateOne from '@react-query/query/useUpdateOne';
import queryConfig from '@react-query/queryConfig';

import BigBlocks from '@components/form/BigBlocks';
import Block from '@components/form/Block';
import MultipleSelect from '@components/form/multipleSelect/MultipleSelect';
import SmallBlocks from '@components/form/SmallBlocks';
import SubmitBtn from '@components/form/SubmitBtn';
import Input from '@components/inputs/Input';
import Select from '@components/inputs/Select';
import UpdatePageHeading from '@components/updatePage/UpdatePageHeading';
import UpdatePageWrapper from '@components/updatePage/UpdatePageWrapper';

function Create(): JSX.Element {
  const id = useRouter().query.id;
  const requestConfig = queryConfig.homes;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<IHome>({
    resolver: yupResolver(homeSchema),
  });

  const { createOne: createHome, isLoading: isCreating } =
    useCreateOne<IHome>(requestConfig);

  const { updateOne: updateHome, isUpdating } =
    useUpdateOne<IHome>(requestConfig);

  const { data: home } = useGetOne<IHome>(requestConfig, reset);

  const onSubmit = (data: IHome) => {
    // already check if should create or update
    // updateHome(data, id);
    // createHome(data, id);
  };
  // get products, collections and posts
  const { data: products } = useGetOnes<IProduct>(queryConfig.products, {
    includeUrlQuery: false,
    additionalQuery: {
      fields: 'name',
    },
  });

  const { data: collections } = useGetOnes<IProduct>(queryConfig.collections, {
    includeUrlQuery: false,
    additionalQuery: {
      fields: 'name',
    },
  });

  return (
    <UpdatePageWrapper
      onSubmit={handleSubmit(onSubmit)}
      control={control}
      reset={reset}
    >
      <UpdatePageHeading
        title={home?.versionName || 'Add home'}
        requestConfig={requestConfig}
        id={home?._id}
        status={home?.status}
      />
      <div className="mx-auto flex gap-x-5 justify-center">
        <BigBlocks>
          <Block>
            <Input
              register={register}
              control={control}
              fieldName="versionName"
              labelTheme="light"
              placeholder="summer theme"
              label="Version name:"
              required={true}
            />
          </Block>
          <Block>
            <MultipleSelect
              control={control}
              fieldName="featuredProducts"
              labelTheme="light"
              options={products}
              label="Featured products"
            />
          </Block>
          <Block>
            <MultipleSelect
              control={control}
              fieldName="featuredCollections"
              labelTheme="light"
              options={collections}
              label="Featured collections:"
            />
          </Block>
          <Block>
            <MultipleSelect
              control={control}
              fieldName="featuredPost"
              labelTheme="light"
              options={[]}
              label="Featured posts:"
            />
          </Block>
          <Block>
            <CarouselsInput
              control={control}
              errors={errors}
              fieldName="carouselItems"
              labelTheme="light"
              register={register}
            />
          </Block>
        </BigBlocks>
        <SmallBlocks>
          <Block>
            <Select
              register={register}
              control={control}
              fieldName="status"
              options={['draft', 'active']}
              labelTheme="bold"
              defaultValue={home?.status}
              tooltip="Only one version is active at a time. Others with automatically be draft ."
            />
            <div className="flex justify-end mt-4">
              <SubmitBtn isSubmitting={isUpdating || isCreating} />
            </div>
          </Block>
        </SmallBlocks>
      </div>
    </UpdatePageWrapper>
  );
}

export default Create;
