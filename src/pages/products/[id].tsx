import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
//
import productSchema, { Product } from '@src/yup/productSchema';

import { toastError } from '@src/utils/toast';
import { Collection } from '@src/yup/collectionSchema';
import VariantsInput from '@src/_pages/products/create/VariantsInput';
//
import useCreateOne from '@src/react-query/query/useCreateOne';
import useUpdateOne from '@src/react-query/query/useUpdateOne';
import useGetOne from '@src/react-query/query/useGetOne';
import queryConfig from '@src/react-query/queryConfig';
import useGetOnes from '@src/react-query/query/useGetOnes';
//
import UpdatePageHeader from '@src/components/updatePage/UpdatePageHeader';
import UpdatePageWrapper from '@src/components/updatePage/UpdatePageWrapper';
import UpdatePageHeading from '@src/components/updatePage/UpdatePageHeading';
import MultipleSelect from '@src/components/form/multipleSelect/MultipleSelect';
import BigBlocks from '@src/components/form/BigBlocks';
import Block from '@src/components/form/Block';
import SmallBlocks from '@src/components/form/SmallBlocks';
import SubmitBtn from '@src/components/form/SubmitBtn';
import Input from '@src/components/inputs/Input';
import Select from '@src/components/inputs/Select';
import RichText from '@src/components/inputs/RichText';
import Textarea from '@src/components/inputs/Textarea';
import FilesInput from '@src/components/inputs/FilesInput';

function Create(): JSX.Element {
  const id = useRouter().query.id;
  const requestConfig = queryConfig.products;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<Product>({
    resolver: yupResolver(productSchema, { stripUnknown: true }),
  });

  const { createOne: createProduct, isCreated } =
    useCreateOne<Product>(requestConfig);
  const {
    updateOne: updateProduct,
    error: updateError,
    isUpdating,
  } = useUpdateOne<Product>(requestConfig);

  const { data: product } = useGetOne<Product>(requestConfig, reset);

  const { data: collections } = useGetOnes<Collection>(
    queryConfig.collections,
    {
      limit: 999,
    },
  );

  const onSubmit = (data: Product) => {
    // already check if should create or update
    updateProduct(data, id);
    createProduct(data, id);
  };

  useEffect(() => {
    if (!updateError) return;
    if (
      updateError.response?.data.message ===
      'Can not find collections with provided ids'
    ) {
      toastError(
        'Can not find collections with provided ids! Check if you deleted the collection!',
      );
    }
  }, [updateError]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <UpdatePageWrapper isDirty={isDirty}>
        <UpdatePageHeader reset={reset} isDirty={isDirty} />
        <UpdatePageHeading
          title={product?.name || 'Add product'}
          requestConfig={requestConfig}
          id={product?._id}
          status={product?.status}
        />
        <div className="mx-auto flex gap-x-5 justify-center mt-8">
          <BigBlocks>
            <Block>
              <Input
                register={register}
                errors={errors}
                fieldName="name"
                labelTheme="light"
                placeholder="T-shirt for man....."
                label="Name:"
              />
              <Textarea
                register={register}
                errors={errors}
                fieldName="overview"
                labelTheme="light"
                placeholder="short description about your product"
                label="Overview:"
              />
              <div className="flex gap-3">
                <Input
                  register={register}
                  errors={errors}
                  fieldName="price"
                  labelTheme="light"
                  placeholder="19.99"
                  label="Price:"
                />
                <Input
                  register={register}
                  errors={errors}
                  fieldName="discountPrice"
                  labelTheme="light"
                  placeholder="9.99"
                  label="Discount price:"
                />
              </div>
            </Block>
            <Block>
              <RichText
                control={control}
                defaultValue=""
                errors={errors}
                fieldName="description"
                labelTheme="light"
                label="Description:"
              />
              <Select
                errors={errors}
                register={register}
                fieldName="isPinned"
                labelTheme="light"
                options={[
                  { name: 'pin', value: 'true' },
                  { name: 'Do not pin', value: 'false' },
                ]}
                label="Pin to top?"
              />
            </Block>
            <Block>
              <FilesInput
                fieldName="images"
                allowedTypes="*"
                control={control}
                labelTheme="bold"
                errors={errors}
                maxFilesCount={10}
                key={1}
              />
            </Block>
            <Block>
              <MultipleSelect
                errors={errors}
                control={control}
                fieldName="collections"
                labelTheme="bold"
                options={collections?.map((c) => ({ id: c._id, name: c.name }))}
              />
              <VariantsInput
                errors={errors}
                fieldName="variants"
                control={control}
                labelTheme="bold"
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
                label="status"
              />
              <div className="flex justify-end mt-4">
                <SubmitBtn isUpdating={isUpdating} />
              </div>
            </Block>
            <Block>
              <FilesInput
                fieldName="previewImages"
                allowedTypes="*"
                control={control}
                labelTheme="bold"
                errors={errors}
                maxFilesCount={2}
                key={2}
              />
            </Block>
          </SmallBlocks>
        </div>
      </UpdatePageWrapper>
    </form>
  );
}

export default Create;
