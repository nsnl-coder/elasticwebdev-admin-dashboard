import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
//
import useGetOne from '@src/react-query/query/useGetOne';
import useUpdateOne from '@src/react-query/query/useUpdateOne';
import useCreateOne from '@src/react-query/query/useCreateOne';
import useGetOnes from '@src/react-query/query/useGetOnes';
//
import BigBlocks from '@src/components/form/BigBlocks';
import Block from '@src/components/form/Block';
import SmallBlocks from '@src/components/form/SmallBlocks';
import SubmitBtn from '@src/components/form/SubmitBtn';
import homeSchema, { IHome } from '@src/yup/homeSchema';
import Select from '@src/components/inputs/Select';
import Input from '@src/components/inputs/Input';
import queryConfig from '@src/react-query/queryConfig';
import UpdatePageHeading from '@src/components/updatePage/UpdatePageHeading';
import UpdatePageWrapper from '@src/components/updatePage/UpdatePageWrapper';
import MultipleSelect from '@src/components/form/multipleSelect/MultipleSelect';
import CarouselsInput from '@src/_pages/homes/CarouselsInput';
import { IProduct } from '@src/yup/productSchema';

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

  const { createOne: createHome } = useCreateOne<IHome>(requestConfig);

  const { updateOne: updateHome, isUpdating } =
    useUpdateOne<IHome>(requestConfig);

  const { data: home } = useGetOne<IHome>(requestConfig, reset);

  const onSubmit = (data: IHome) => {
    // already check if should create or update
    // updateHome(data, id);
    // createHome(data, id);

    console.log(data);
  };
  // get products, collections and posts
  const { data: products } = useGetOnes<IProduct>(queryConfig.products, {
    fields: 'name',
    includeUrlQuery: false,
  });

  const { data: collections } = useGetOnes<IProduct>(queryConfig.collections, {
    fields: 'name',
    includeUrlQuery: false,
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
              <SubmitBtn isUpdating={isUpdating} />
            </div>
          </Block>
        </SmallBlocks>
      </div>
    </UpdatePageWrapper>
  );
}

export default Create;
