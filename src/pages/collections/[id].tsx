import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
//
import BigBlocks from '@src/components/form/BigBlocks';
import Block from '@src/components/form/Block';
import SmallBlocks from '@src/components/form/SmallBlocks';
import SubmitBtn from '@src/components/form/SubmitBtn';
import collectionSchema, { ICollection } from '@src/yup/collectionSchema';
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

  const { register, handleSubmit, control, reset } = useForm<ICollection>({
    resolver: yupResolver(collectionSchema),
  });

  const { createOne: createCollection } =
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
    <UpdatePageWrapper control={control}>
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
                control={control}
                label="Name:"
                labelTheme="light"
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
                <SubmitBtn isUpdating={isUpdating} />
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
      </form>
    </UpdatePageWrapper>
  );
}

export default Create;
