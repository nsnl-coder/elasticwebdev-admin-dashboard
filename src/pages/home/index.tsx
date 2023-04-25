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
import homeSchema, { Home } from '@src/yup/homeSchema';
import Select from '@src/components/inputs/Select';
import Input from '@src/components/inputs/Input';
import queryConfig from '@src/react-query/queryConfig';
import UpdatePageHeading from '@src/components/updatePage/UpdatePageHeading';
import UpdatePageWrapper from '@src/components/updatePage/UpdatePageWrapper';
import MultipleSelect from '@src/components/form/multipleSelect/MultipleSelect';
import CarouselsInput from '@src/_pages/homes/CarouselsInput';
import { Product } from '@src/yup/productSchema';

function Create(): JSX.Element {
  const id = useRouter().query.id;
  const requestConfig = queryConfig.homes;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<Home>({
    resolver: yupResolver(homeSchema),
  });

  const { createOne: createHome } = useCreateOne<Home>(requestConfig);

  const { updateOne: updateHome, isUpdating } =
    useUpdateOne<Home>(requestConfig);

  const { data: home } = useGetOne<Home>(requestConfig, reset);

  const onSubmit = (data: Home) => {
    // already check if should create or update
    // updateHome(data, id);
    // createHome(data, id);

    console.log(data);
  };
  // get products, collections and posts
  const { data: products } = useGetOnes<Product>(queryConfig.products, {
    fields: 'name',
  });

  const { data: collections } = useGetOnes<Product>(queryConfig.collections, {
    fields: 'name',
  });

  return (
    <UpdatePageWrapper isDirty={isDirty}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                errors={errors}
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
                errors={errors}
                fieldName="featuredProducts"
                labelTheme="light"
                options={products}
                label="Featured products"
              />
            </Block>
            <Block>
              <MultipleSelect
                control={control}
                errors={errors}
                fieldName="featuredCollections"
                labelTheme="light"
                options={collections}
                label="Featured collections:"
              />
            </Block>
            <Block>
              <MultipleSelect
                control={control}
                errors={errors}
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
                errors={errors}
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
      </form>
    </UpdatePageWrapper>
  );
}

export default Create;
