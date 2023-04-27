import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
//
import productSchema, { IProduct } from '@src/yup/productSchema';

import { toastError } from '@src/utils/toast';
import { ICollection } from '@src/yup/collectionSchema';
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

  const { register, handleSubmit, control, reset } = useForm<IProduct>({
    resolver: yupResolver(productSchema, { stripUnknown: true }),
    defaultValues: {
      isPinned: false,
      name: '99. Men New Fashion Casual Shoes for Light Soft Breathable Vulcanize Shoes High',
    },
  });

  const { createOne: createProduct } = useCreateOne<IProduct>(requestConfig);

  const {
    updateOne: updateProduct,
    error: updateError,
    isUpdating,
  } = useUpdateOne<IProduct>(requestConfig);

  const { data: product } = useGetOne<IProduct>(requestConfig, reset);

  const { data: collections } = useGetOnes<ICollection>(
    queryConfig.collections,
    {
      itemsPerPage: 999,
    },
  );

  const onSubmit = (data: IProduct) => {
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
    <UpdatePageWrapper
      onSubmit={handleSubmit(onSubmit)}
      control={control}
      reset={reset}
    >
      <UpdatePageHeader reset={reset} control={control} />
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
              control={control}
              fieldName="name"
              labelTheme="light"
              placeholder="T-shirt for man....."
              label="Name:"
            />
            <Textarea
              register={register}
              control={control}
              fieldName="overview"
              labelTheme="light"
              placeholder="short description about your product"
              label="Overview:"
            />
            <div className="flex gap-3">
              <Input
                register={register}
                control={control}
                fieldName="price"
                labelTheme="light"
                placeholder="19.99"
                label="Price:"
              />
              <Input
                register={register}
                control={control}
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
              fieldName="description"
              labelTheme="light"
              label="Description:"
            />
            <Select
              control={control}
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
              maxFilesCount={20}
              key={1}
              label="Product media"
              tooltip="Video or images. Max 20 files"
            />
          </Block>
          <Block>
            <FilesInput
              fieldName="previewImages"
              allowedTypes="*"
              control={control}
              labelTheme="bold"
              maxFilesCount={5}
              key={2}
              label="Preview images"
              tooltip="Images that display when you hover on card. Max 5 images."
            />
          </Block>
          <Block>
            <MultipleSelect
              control={control}
              fieldName="collections"
              labelTheme="bold"
              options={collections}
              label="Collection:"
            />
          </Block>
          <Block>
            <VariantsInput
              fieldName="variants"
              control={control}
              labelTheme="bold"
              register={register}
              label="Variants:"
            />
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
    </UpdatePageWrapper>
  );
}

export default Create;
