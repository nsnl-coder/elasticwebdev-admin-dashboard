import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
//
import BigBlocks from '@src/components/form/BigBlocks';
import Block from '@src/components/form/Block';
import SmallBlocks from '@src/components/form/SmallBlocks';
import SubmitBtn from '@src/components/form/SubmitBtn';
import collectionSchema, { Collection } from '@src/yup/collectionSchema';
import RichText from '@src/components/inputs/RichText';
import Select from '@src/components/inputs/Select';
import FilesInput from '@src/components/inputs/FilesInput';
import Input from '@src/components/inputs/Input';
import { useRouter } from 'next/router';
import queryConfig from '@src/react-query/queryConfig';
import useGetOne from '@src/react-query/query/useGetOne';
import useUpdateOne from '@src/react-query/query/useUpdateOne';
import useCreateOne from '@src/react-query/query/useCreateOne';
import UpdatePageHeading from '@src/components/updatePage/UpdatePageHeading';
import UpdatePageWrapper from '@src/components/updatePage/UpdatePageWrapper';

function Create(): JSX.Element {
  const id = useRouter().query.id;
  const requestConfig = queryConfig.collections;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<Collection>({
    resolver: yupResolver(collectionSchema),
  });

  const { createOne: createCollection } =
    useCreateOne<Collection>(requestConfig);

  const { updateOne: updateCollection, isUpdating } =
    useUpdateOne<Collection>(requestConfig);

  const { data: collection } = useGetOne<Collection>(requestConfig, reset);

  const onSubmit = (data: Collection) => {
    // already check if should create or update
    updateCollection(data, id);
    createCollection(data, id);
  };

  return (
    <UpdatePageWrapper isDirty={isDirty}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <UpdatePageHeading
          title={collection?.name || 'Add collection'}
          requestConfig={requestConfig}
          id={collection?._id}
          status={collection?.status}
        />
        <div className="mx-auto flex gap-x-5 justify-center">
          <BigBlocks>
            <Block>
              <Input
                register={register}
                fieldName="name"
                errors={errors}
                label="Name:"
                labelTheme="light"
                defaultValue={collection?.name}
              />
              <RichText
                control={control}
                fieldName="description"
                defaultValue={collection?.description}
                errors={errors}
                labelTheme="light"
                label="Description:"
              />
            </Block>
            <Block>
              <Select
                register={register}
                errors={errors}
                fieldName="isPinned"
                label="Pin?"
                labelTheme="bold"
                defaultValue={collection?.isPinned + ''}
                options={[
                  { name: 'Do not pin', value: 'false' },
                  { name: 'Pin to top', value: 'true' },
                ]}
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
                defaultValue={collection?.status}
              />
              <div className="flex justify-end mt-4">
                <SubmitBtn isUpdating={isUpdating} />
              </div>
            </Block>
            <Block>
              <FilesInput
                allowedTypes="image"
                control={control}
                fieldName="photo"
                maxFilesCount={1}
                errors={errors}
                labelTheme="bold"
                label="Collection photo"
              />
            </Block>
          </SmallBlocks>
        </div>
      </form>
    </UpdatePageWrapper>
  );
}

export default Create;
