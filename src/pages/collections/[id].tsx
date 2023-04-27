import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import collectionSchema, { ICollection } from '@src/yup/collectionSchema';

import useCreateOne from '@react-query/query/useCreateOne';
import useGetOne from '@react-query/query/useGetOne';
import useUpdateOne from '@react-query/query/useUpdateOne';
import queryConfig from '@react-query/queryConfig';

//
import BigBlocks from '@components/form/BigBlocks';
import Block from '@components/form/Block';
import SmallBlocks from '@components/form/SmallBlocks';
import SubmitBtn from '@components/form/SubmitBtn';
import FilesInput from '@components/inputs/FilesInput';
import Input from '@components/inputs/Input';
import RichText from '@components/inputs/RichText';
import Select from '@components/inputs/Select';
import UpdatePageHeading from '@components/updatePage/UpdatePageHeading';
import UpdatePageWrapper from '@components/updatePage/UpdatePageWrapper';

function Create(): JSX.Element {
  const id = useRouter().query.id;
  const requestConfig = queryConfig.collections;

  const { register, handleSubmit, control, reset } = useForm<ICollection>({
    resolver: yupResolver(collectionSchema),
  });

  const { createOne: createCollection, isLoading: isCreating } =
    useCreateOne<ICollection>(requestConfig);

  const { updateOne: updateCollection, isUpdating } =
    useUpdateOne<ICollection>(requestConfig);

  const { data: collection } = useGetOne<ICollection>(requestConfig, reset);

  const onSubmit = (data: ICollection) => {
    // already check if should create or update
    updateCollection(data, id);
    createCollection(data, id);
  };

  return (
    <UpdatePageWrapper
      onSubmit={handleSubmit(onSubmit)}
      control={control}
      reset={reset}
    >
      <UpdatePageHeading
        title={collection?.display_name || 'Add collection'}
        requestConfig={requestConfig}
        id={collection?._id}
        status={collection?.status}
      />
      <div className="mx-auto flex gap-x-5 justify-center">
        <BigBlocks>
          <Block>
            <Input
              register={register}
              fieldName="display_name"
              control={control}
              label="Display name:"
              labelTheme="light"
              tooltip="This will be displayed to user."
            />
            <Input
              register={register}
              fieldName="hidden_name"
              control={control}
              label="Hidden name:"
              labelTheme="light"
              tooltip="This name does not display to user"
            />
            <RichText
              control={control}
              fieldName="description"
              labelTheme="light"
              label="Description:"
            />
          </Block>
          <Block>
            <Select
              register={register}
              control={control}
              fieldName="isPinned"
              label="Pin?"
              labelTheme="bold"
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
              control={control}
              fieldName="status"
              options={['draft', 'active']}
              labelTheme="bold"
            />
            <div className="flex justify-end mt-4">
              <SubmitBtn isSubmitting={isUpdating || isCreating} />
            </div>
          </Block>
          <Block>
            <FilesInput
              allowedTypes="image"
              control={control}
              fieldName="photo"
              maxFilesCount={1}
              labelTheme="bold"
              label="Collection photo"
            />
          </Block>
        </SmallBlocks>
      </div>
    </UpdatePageWrapper>
  );
}

export default Create;
