import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
//
import BigBlocks from '@src/components/form/BigBlocks';
import Block from '@src/components/form/Block';
import SmallBlocks from '@src/components/form/SmallBlocks';
import SubmitBtn from '@src/components/form/SubmitBtn';
import homeSchema, { Home } from '@src/yup/homeSchema';
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
    updateHome(data, id);
    createHome(data, id);
  };

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
          <BigBlocks>{/* <Block></Block> */}</BigBlocks>
          <SmallBlocks>
            <Block>
              <Select
                register={register}
                errors={errors}
                fieldName="status"
                options={['draft', 'active']}
                labelTheme="bold"
                defaultValue={home?.status}
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
