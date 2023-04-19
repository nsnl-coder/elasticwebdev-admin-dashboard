import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
//
import productSchema, { Product } from '@src/yup/productSchema';
import BigBlocks from '@src/shared/form/BigBlocks';
import Block from '@src/shared/form/Block';
import SmallBlocks from '@src/shared/form/SmallBlocks';
import SubmitBtn from '@src/shared/form/SubmitBtn';
import Input from '@src/shared/inputs/Input';
import Select from '@src/shared/inputs/Select';
import RichText from '@src/shared/inputs/RichText';
import Textarea from '@src/shared/inputs/Textarea';
import FilesInput from '@src/shared/inputs/FilesInput';
import VariantsInput from '@src/components/products/create/VariantsInput';
import useCreateOne from '@src/react-query/query/useCreateOne';
import useUpdateOne from '@src/react-query/query/useUpdateOne';
import useGetOne from '@src/react-query/query/useGetOne';
import queryConfig from '@src/react-query/queryConfig';
import { useRouter } from 'next/router';
import CreatePageWrapper from '@src/shared/createPage/CreatePageWrapper';
import Heading from '@src/shared/createPage/Heading';
import MultipleSelect from '@src/shared/form/multipleSelect/MultipleSelect';
import useGetOnes from '@src/react-query/query/useGetOnes';
import { Collection } from '@src/yup/collectionSchema';
import PageHeader from '@src/shared/createPage/PageHeader';

function Create(): JSX.Element {
  const id = useRouter().query.id;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<Product>({
    resolver: yupResolver(productSchema),
  });

  const { createOne: createProduct } = useCreateOne<Product>(
    queryConfig.products,
  );
  const { updateOne: updateProduct } = useUpdateOne<Product>(
    queryConfig.products,
    reset,
  );
  const { data: product } = useGetOne<Product>(queryConfig.products, reset);

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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CreatePageWrapper isDirty={isDirty}>
        <PageHeader reset={reset} isDirty={isDirty} />
        <Heading
          title={product?.name || 'Add product'}
          requestConfig={queryConfig.products}
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
                  type="number"
                />
                <Input
                  register={register}
                  errors={errors}
                  fieldName="discountPrice"
                  labelTheme="light"
                  placeholder="9.99"
                  label="Discount price:"
                  type="number"
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
                defaultValue={product?.images}
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
                defaultSelections={product?.collections}
              />
              <VariantsInput
                errors={errors}
                fieldName="variants"
                control={control}
                defaultValue={[]}
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
                <SubmitBtn />
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
                defaultValue={product?.previewImages}
                key={2}
              />
            </Block>
          </SmallBlocks>
        </div>
      </CreatePageWrapper>
    </form>
  );
}

export default Create;
