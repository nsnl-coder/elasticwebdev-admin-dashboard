import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
//
import BigBlocks from '@src/shared/form/BigBlocks';
import Block from '@src/shared/form/Block';
import SmallBlocks from '@src/shared/form/SmallBlocks';
import SubmitBtn from '@src/shared/form/SubmitBtn';
import menuSchema, { Menu } from '@src/yup/menuSchema';
import RichText from '@src/shared/inputs/RichText';
import Select from '@src/shared/inputs/Select';
import FilesInput from '@src/shared/inputs/FilesInput';
import Input from '@src/shared/inputs/Input';
import { useRouter } from 'next/router';
import queryConfig from '@src/react-query/queryConfig';
import useGetOne from '@src/react-query/query/useGetOne';
import useUpdateOne from '@src/react-query/query/useUpdateOne';
import useCreateOne from '@src/react-query/query/useCreateOne';
import UpdatePageHeading from '@src/shared/updatePage/UpdatePageHeading';
import UpdatePageWrapper from '@src/shared/updatePage/UpdatePageWrapper';
import MultipleSelectItem from '@src/shared/form/multipleSelect/MultipleSelectItem';
import MultipleSelect from '@src/shared/form/multipleSelect/MultipleSelect';
import useGetOnes from '@src/react-query/query/useGetOnes';
import UpdatePageHeader from '@src/shared/updatePage/UpdatePageHeader';

function Create(): JSX.Element {
  const id = useRouter().query.id;
  const requestConfig = queryConfig.menus;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<Menu>({
    resolver: yupResolver(menuSchema),
  });

  const { createOne: createMenu } = useCreateOne<Menu>(requestConfig);
  const { updateOne: updateMenu } = useUpdateOne<Menu>(requestConfig);
  const { data: menu } = useGetOne<Menu>(requestConfig, reset);
  const { data: menus } = useGetOnes<Menu>(requestConfig, {});

  const onSubmit = (data: Menu) => {
    // already check if should create or update
    updateMenu(data, id);
    createMenu(data, id);
  };

  return (
    <UpdatePageWrapper isDirty={isDirty}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <UpdatePageHeader reset={reset} isDirty={isDirty} />
        <UpdatePageHeading
          title={menu?.name || 'Add menu'}
          requestConfig={requestConfig}
          id={menu?._id}
          status={menu?.status}
        />
        <div className="mx-auto flex gap-x-5 justify-center">
          <BigBlocks>
            <Block>
              <Input
                register={register}
                errors={errors}
                fieldName="name"
                labelTheme="light"
                placeholder="menu display name"
                label="Name:"
                required={true}
              />
              <Input
                register={register}
                errors={errors}
                fieldName="link"
                labelTheme="light"
                placeholder="https://..."
                label="Link:"
                tooltip="where user redirect when click menu"
              />
              <MultipleSelect
                control={control}
                fieldName="childMenus"
                errors={errors}
                labelTheme="light"
                options={menus?.map((menu) => ({
                  id: menu._id,
                  name: menu.name,
                }))}
                label="Child menus:"
                excludes={menu?._id ? [menu._id] : []}
              />
              <Input
                register={register}
                errors={errors}
                fieldName="ordering"
                labelTheme="light"
                placeholder="0"
                label="Ordering:"
                required={true}
                defaultValue="10"
                tooltip="low ordering menu will appear first"
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
                defaultValue={menu?.status}
              />
              <div className="flex justify-end mt-4">
                <SubmitBtn />
              </div>
            </Block>
            <Block>
              <FilesInput
                allowedTypes="*"
                control={control}
                errors={errors}
                fieldName="photo"
                maxFilesCount={1}
                labelTheme="bold"
              />
            </Block>
          </SmallBlocks>
        </div>
      </form>
    </UpdatePageWrapper>
  );
}

export default Create;
